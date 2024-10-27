import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTypesEntity } from 'src/entities/product-types.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { SizeTypesService } from '../size-types/size-types.service';
import { ColorTypesService } from '../color-types/color-types.service';
import { ProductTypesDto } from 'src/dto/product-types.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@Injectable()
export class ProductTypesService {
  constructor(
    private readonly colorTypesService: ColorTypesService,
    private readonly sizeTypesService: SizeTypesService,
    private readonly productsService: ProductsService,
    @InjectRepository(ProductTypesEntity)
    private readonly productTypesRepository: Repository<ProductTypesEntity>,
  ) {}

  async createItem(
    productTypesDto: ProductTypesDto,
  ): Promise<ProductTypesEntity> {
    const product = await this.productsService.findOneByProduct(
      productTypesDto.productId,
    );
    const colorType = await this.colorTypesService.findOneById(
      productTypesDto.colorTypeId,
    );
    const sizeType = await this.sizeTypesService.findOneById(
      productTypesDto.sizeTypeId,
    );

    if (!product || !colorType || !sizeType) {
      throw new NotFoundException('One or more resources not found');
    }

    const productTypes = new ProductTypesEntity();
    productTypes.quantity = productTypesDto.quantity;
    productTypes.product = product;
    productTypes.colorType = colorType;
    productTypes.sizeType = sizeType;

    return await this.productTypesRepository.save(productTypes);
  }

  async updateItem(
    id: string,
    productTypesDto: ProductTypesDto,
  ): Promise<ProductTypesEntity> {
    const productTypes = await this.findOneById(id);

    if (!productTypes) {
      throw new NotFoundException('Product Types not found');
    }

    const product = await this.productsService.findOneByProduct(
      productTypesDto.productId,
    );
    const colorType = await this.colorTypesService.findOneById(
      productTypesDto.colorTypeId,
    );
    const sizeType = await this.sizeTypesService.findOneById(
      productTypesDto.sizeTypeId,
    );

    if (!product || !colorType || !sizeType) {
      throw new NotFoundException('One or more resources not found');
    }

    productTypes.quantity = productTypesDto.quantity;
    productTypes.product = product;
    productTypes.colorType = colorType;
    productTypes.sizeType = sizeType;

    return await this.productTypesRepository.save(productTypes);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.productTypesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Product Types not found');
    }

    return {
      status: 200,
      message: 'Product Types deleted successfully',
    };
  }

  async findAll(): Promise<ProductTypesEntity[]> {
    return await this.productTypesRepository.find({
      relations: [
        'product',
        'product.mediaItems',
        'product.mediaItems.activeStorageAttachments',
        'product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'product.discountSettings',
        'colorType',
        'sizeType',
      ],
    });
  }

  async findOneById(id: string): Promise<ProductTypesEntity> {
    const productTypes = await this.productTypesRepository.findOneOrFail({
      where: { id: id },
      relations: [
        'product',
        'product.mediaItems',
        'product.mediaItems.activeStorageAttachments',
        'product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'product.discountSettings',
        'colorType',
        'sizeType',
      ],
    });

    if (!productTypes) {
      throw new NotFoundException('Product Types not found');
    }

    return productTypes;
  }
}
