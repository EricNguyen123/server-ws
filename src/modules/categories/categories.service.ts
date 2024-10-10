import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesResDto } from 'src/dto/categories-res.dto';
import { CategoriesDto } from 'src/dto/categories.dto';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async create(createCategoryDto: CategoriesDto): Promise<CategoriesEntity> {
    const { name, parentCategoryId } = createCategoryDto;
    const category = new CategoriesEntity();
    category.name = name;

    if (parentCategoryId) {
      const parentCategory = await this.categoriesRepository.findOneOrFail({
        where: { id: parentCategoryId },
      });
      if (parentCategory) {
        category.parentCategory = parentCategory;
      }
    }

    return this.categoriesRepository.save(category);
  }

  async updateCategory(
    id: string,
    data: CategoriesDto,
  ): Promise<CategoriesEntity> {
    const category = await this.findOneByCategory(id);
    if (!category) throw new NotFoundException('Category not found');

    category.name = data.name;

    const categoryUpdate = await this.categoriesRepository.save(category);
    return categoryUpdate;
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

  async findAllWithPagination(
    paginationDto: PaginationDto,
  ): Promise<CategoriesResDto[]> {
    const { offset, limit } = paginationDto;

    const categories = await this.categoriesRepository.find({
      skip: offset,
      take: limit,
      select: ['id', 'name', 'createdDate', 'updatedDate'],
      relations: ['parentCategory'],
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      parentCategoryId: category.parentCategory
        ? category.parentCategory.id
        : null,
      createdDate: category.createdDate,
      updatedDate: category.updatedDate,
    }));
  }

  async findAll(): Promise<CategoriesResDto[]> {
    const categories = await this.categoriesRepository.find({
      select: ['id', 'name', 'createdDate', 'updatedDate'],
      relations: ['parentCategory'],
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      parentCategoryId: category.parentCategory
        ? category.parentCategory.id
        : null,
      createdDate: category.createdDate,
      updatedDate: category.updatedDate,
    }));
  }

  async findOneByCategory(id: string): Promise<CategoriesEntity> {
    try {
      const item = await this.categoriesRepository.findOneOrFail({
        where: { id },
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
