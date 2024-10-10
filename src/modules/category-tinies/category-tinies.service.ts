import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryTinyEntity } from 'src/entities/category-tinies.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class CategoryTiniesService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    @InjectRepository(CategoryTinyEntity)
    private readonly categorytiniesRepository: Repository<CategoryTinyEntity>,
  ) {}

  async createCategoryTinies(
    categoryIds: string[],
    productIds: string[],
  ): Promise<CategoryTinyEntity[]> {
    const categoryCount = categoryIds.length;
    const productCount = productIds.length;

    if (categoryCount === 0 || productCount === 0) {
      throw new BadRequestException('categoryIds and productIds not emty');
    }

    if (categoryCount > 1 && productCount > 1) {
      throw new BadRequestException(
        'categoryIds and productIds arguments are not good',
      );
    }

    const categories = await this.categoriesService.findByIds(categoryIds);
    const products = await this.productsService.findByIds(productIds);

    if (categories.length !== categoryIds.length) {
      throw new BadRequestException('One or more Categories do not exist.');
    }
    if (products.length !== productIds.length) {
      throw new BadRequestException('One or more Products do not exist.');
    }

    if (categoryCount === 1 && productCount > 1) {
      categoryIds = Array(productCount).fill(categoryIds[0]);
    }

    if (productCount === 1 && categoryCount > 1) {
      productIds = Array(categoryCount).fill(productIds[0]);
    }

    if (categoryIds.length !== productIds.length) {
      throw new BadRequestException(
        'The categoryIds and productIds arrays must have the same number of elements.',
      );
    }

    const existingCategoryTinies = await this.categorytiniesRepository.find({
      where: categoryIds.map((categoryId, index) => ({
        category: { id: categoryId },
        product: { id: productIds[index] },
      })),
      relations: ['category', 'product'],
    });

    const newCategoryTinies = categoryIds
      .map((categoryId, index) => {
        const productId = productIds[index];

        const exists = existingCategoryTinies.some(
          (existing) =>
            existing.category.id === categoryId &&
            existing.product.id === productId,
        );

        if (!exists) {
          const category = categories.find((cat) => cat.id === categoryId);
          const product = products.find((prod) => prod.id === productId);

          return this.categorytiniesRepository.create({ category, product });
        }

        return null;
      })
      .filter((entity) => entity !== null);

    if (newCategoryTinies.length > 0) {
      return this.categorytiniesRepository.save(newCategoryTinies);
    }

    return [];
  }

  async deleteCategoryTinies(categoryIds: string[], productIds: string[]) {
    const categoryCount = categoryIds.length;
    const productCount = productIds.length;

    if (categoryCount === 0 || productCount === 0) {
      throw new BadRequestException('categoryIds and productIds not empty');
    }

    if (categoryCount > 1 && productCount > 1) {
      throw new BadRequestException(
        'categoryIds and productIds arguments are not good',
      );
    }

    const categories = await this.categoriesService.findByIds(categoryIds);
    const products = await this.productsService.findByIds(productIds);

    if (categories.length !== categoryIds.length) {
      throw new BadRequestException('One or more Categories do not exist.');
    }
    if (products.length !== productIds.length) {
      throw new BadRequestException('One or more Products do not exist.');
    }

    if (categoryCount === 1 && productCount > 1) {
      categoryIds = Array(productCount).fill(categoryIds[0]);
    }

    if (productCount === 1 && categoryCount > 1) {
      productIds = Array(categoryCount).fill(productIds[0]);
    }

    if (categoryIds.length !== productIds.length) {
      throw new BadRequestException(
        'The categoryIds and productIds arrays must have the same number of elements.',
      );
    }

    const categoryTiniesToDelete = await this.categorytiniesRepository.find({
      where: categoryIds.map((categoryId, index) => ({
        category: { id: categoryId },
        product: { id: productIds[index] },
      })),
      relations: ['category', 'product'],
    });

    if (categoryTiniesToDelete.length === 0) {
      throw new BadRequestException(
        'No CategoryTiny entities found to delete.',
      );
    }

    const result = await this.categorytiniesRepository.remove(
      categoryTiniesToDelete,
    );
    if (result.length === 0) {
      throw new NotFoundException(`No CategoryTinies found for the given IDs`);
    }

    return {
      status: 200,
      message: 'CategoryTinies deleted successfully',
    };
  }
}
