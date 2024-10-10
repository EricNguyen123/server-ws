import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { ProductsPostDto } from 'src/dto/products-post.dto';
import { ProductsResDto } from 'src/dto/products-res.dto';
import { ProductsEntity } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  async create(productsPostDto: ProductsPostDto): Promise<ProductsResDto> {
    const product = await this.productsRepository.save(productsPostDto);
    return product;
  }

  async updateProduct(
    id: string,
    data: ProductsPostDto,
  ): Promise<ProductsResDto> {
    const product = await this.findOneByProduct(id);
    if (!product) throw new NotFoundException('Product not found');

    product.name = data.name ? data.name : product.name;
    product.code = data.code ? data.code : product.code;
    product.price = data.price ? data.price : product.price;
    product.quantity = data.quantity ? data.quantity : product.quantity;
    product.quantity_alert = data.quantity_alert
      ? data.quantity_alert
      : product.quantity_alert;
    product.order_unit = data.order_unit ? data.order_unit : product.order_unit;
    product.description = data.description
      ? data.description
      : product.description;
    product.status = data.status ? data.status : product.status;
    product.multiplication_rate = data.multiplication_rate
      ? data.multiplication_rate
      : product.multiplication_rate;
    product.discount = data.discount ? data.discount : product.discount;

    const productUpdate = await this.productsRepository.save(product);
    return productUpdate;
  }

  async deleteProduct(id: string): Promise<DeleteUserResDto> {
    const result = await this.productsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return {
      id: id,
      status: 200,
      message: 'Product deleted successfully',
    };
  }

  async deleteProducts(data: GetAccountDto[]): Promise<DeleteUsersResDto> {
    const ids = data.map((item) => item.id);
    const result = await this.productsRepository.delete(ids);

    if (result.affected === 0) {
      throw new NotFoundException(`No Products found for the given IDs`);
    }

    return {
      ids: ids,
      status: 200,
      message: 'Products deleted successfully',
    };
  }

  async findOneByProduct(id: string): Promise<ProductsEntity> {
    try {
      const item = await this.productsRepository.findOneOrFail({
        where: { id },
      });

      return item;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  async findAllWithPagination(
    paginationDto: PaginationDto,
  ): Promise<ProductsEntity[]> {
    const { offset, limit } = paginationDto;

    return await this.productsRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findAll(): Promise<ProductsEntity[]> {
    return await this.productsRepository.find({});
  }

  async findProductWithFiles(productId: string) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
      relations: [
        'mediaItems',
        'mediaItems.activeStorageAttachments',
        'mediaItems.activeStorageAttachments.activeStorageBlob',
      ],
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const files = product.mediaItems.flatMap((mediaItem) =>
      mediaItem.activeStorageAttachments.map((attachment) => ({
        id: attachment.activeStorageBlob.id,
        url: `/uploads/${attachment.activeStorageBlob.key}`,
        filename: attachment.activeStorageBlob.filename,
        contentType: attachment.activeStorageBlob.content_type,
      })),
    );

    return {
      product,
      files,
    };
  }

  async findByIds(ids: string[]): Promise<ProductsEntity[]> {
    if (!ids || ids.length === 0) {
      return [];
    }

    const entities = await this.productsRepository.find({
      where: ids.map((id) => ({ id })),
    });

    return entities;
  }
}
