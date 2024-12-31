import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesPaginationResDto } from 'src/dto/categories-pagination-res.dto';
import { CategoriesResDto } from 'src/dto/categories-res.dto';
import { CategoriesDto } from 'src/dto/categories.dto';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { SearchDto } from 'src/dto/search.dto';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async create(createCategoryDto: CategoriesDto): Promise<CategoriesResDto> {
    const { name, parentCategoryId, subCategoryIds } = createCategoryDto;

    const category = new CategoriesEntity();
    category.name = name;

    if (parentCategoryId) {
      try {
        const parentCategory = await this.categoriesRepository.findOneOrFail({
          where: { id: parentCategoryId },
        });
        category.parentCategory = parentCategory;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new Error(
          `Parent category with ID ${parentCategoryId} not found.`,
        );
      }
    }

    if (subCategoryIds && subCategoryIds.length > 0) {
      category.subCategories = await this.updateSubCategoryIds(subCategoryIds);
    }

    try {
      const res = await this.categoriesRepository.save(category);
      return await this.resSub(res);
    } catch (error) {
      throw new Error('Failed to create category: ' + error.message);
    }
  }

  async resSub(category: CategoriesEntity) {
    const categories = await this.categoriesRepository.find({
      relations: ['parentCategory', 'subCategories'],
    });

    return this.mapCategoryToResponse(category, categories);
  }

  async updateCategory(
    id: string,
    data: CategoriesDto,
  ): Promise<CategoriesEntity> {
    const category = await this.findOneByCategory(id);
    if (!category) throw new NotFoundException('Category not found');

    category.name = data.name.trim() !== '' ? data.name : category.name;
    if (data.parentCategoryId && data.parentCategoryId.trim() !== '') {
      try {
        const parentCategory = await this.categoriesRepository.findOneOrFail({
          where: { id: data.parentCategoryId },
        });
        category.parentCategory = parentCategory;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new Error(
          `Parent category with ID ${data.parentCategoryId} not found.`,
        );
      }
    } else {
      category.parentCategory = null;
    }

    const subCategoryIds = data.subCategoryIds;
    if (subCategoryIds && subCategoryIds.length > 0) {
      const subs = await this.updateSubCategoryIds(subCategoryIds);
      const newSubs = [...category.subCategories];
      category.subCategories = [...newSubs, ...subs];
    }

    const categoryUpdate = await this.categoriesRepository.save(category);
    return categoryUpdate;
  }

  async updateSubCategoryIds(
    subCategoryIds: string[],
  ): Promise<CategoriesEntity[]> {
    try {
      const subCategories = await this.findByIds(subCategoryIds);

      if (subCategories.length !== subCategoryIds.length) {
        throw new Error(
          'One or more sub-categories not found. Please check the provided IDs.',
        );
      }

      return subCategories;
    } catch (error) {
      throw new Error(`Error processing sub-categories: ${error.message}`);
    }
  }

  async deleteCategory(id: string): Promise<DeleteUserResDto> {
    const result = await this.categoriesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    return {
      id: id,
      status: 200,
      message: 'Category deleted successfully',
    };
  }

  async deleteCategories(data: GetAccountDto[]): Promise<DeleteUsersResDto> {
    const ids = data.map((item) => item.id);
    const result = await this.categoriesRepository.delete(ids);

    if (result.affected === 0) {
      throw new NotFoundException(`No categories found for the given IDs`);
    }

    return {
      ids: ids,
      status: 200,
      message: 'Categories deleted successfully',
    };
  }

  private hasMatchingSubCategories(
    category: CategoriesResDto,
    search: (key: string) => boolean,
  ): boolean {
    if (!category.subCategories || category.subCategories.length === 0) {
      return false;
    }

    return category.subCategories.some(
      (subCategory) =>
        search(subCategory.name) ||
        this.hasMatchingSubCategories(subCategory, search),
    );
  }

  async findAllWithPagination(
    searchDto: SearchDto,
  ): Promise<CategoriesPaginationResDto> {
    const { keyword, offset, limit } = searchDto;

    const categories = await this.categoriesRepository.find({
      relations: ['parentCategory', 'subCategories'],
    });
    const checkKey = keyword && keyword.trim() !== '';
    const search = (key: string) => {
      if (checkKey) {
        const resKeyword = `${keyword}`?.toLowerCase();
        const isMatch = key.toLowerCase().includes(resKeyword);
        return isMatch;
      }
      return true;
    };

    const resCategories = categories
      .filter((category) => category.parentCategory === null)
      .map((category) => this.mapCategoryToResponse(category, categories))
      .filter((category) =>
        checkKey
          ? search(category.name) ||
            this.hasMatchingSubCategories(category, search)
          : true,
      );
    const end = Number(offset) + Number(limit);
    const paginatedCategories = resCategories.slice(offset, end);
    const totalCategories = await this.categoriesRepository.count();
    return {
      categories: paginatedCategories,
      totalCategories: totalCategories,
      currentPage: Math.ceil(offset / limit) + 1,
    };
  }

  async findAll(): Promise<CategoriesResDto[]> {
    const categories = await this.categoriesRepository.find({
      relations: ['parentCategory', 'subCategories'],
    });

    return categories
      .filter((category) => category.parentCategory === null)
      .map((category) => this.mapCategoryToResponse(category, categories));
  }

  private mapCategoryToResponse = (
    category: CategoriesEntity,
    categories: CategoriesEntity[],
  ): CategoriesResDto => {
    const sub = category.subCategories?.map((i) => {
      const subs = categories.filter((e) => e.id === i.id);
      return subs[0];
    });
    return {
      id: category.id,
      name: category.name,
      parentCategory: category.parentCategory,
      createdDate: category.createdDate,
      updatedDate: category.updatedDate,
      subCategories: (sub || []).map((i) =>
        this.mapCategoryToResponse(i, categories),
      ),
    };
  };

  async findOneByCategory(id: string): Promise<CategoriesEntity> {
    try {
      const item = await this.categoriesRepository.findOneOrFail({
        where: { id },
        relations: ['parentCategory', 'subCategories'],
      });

      return item;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Category not found');
    }
  }

  async findByIds(ids: string[]): Promise<CategoriesEntity[]> {
    if (!ids || ids.length === 0) {
      return [];
    }

    const entities = await this.categoriesRepository.find({
      where: ids.map((id) => ({ id })),
    });

    return entities;
  }
}
