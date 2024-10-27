import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTypeResourcesEntity } from 'src/entities/product-type-resources.entity';
import { Repository } from 'typeorm';
import { ProductTypesService } from '../product-types/product-types.service';
import { ProductResourcesService } from '../product-resources/product-resources.service';
import { ProductTypeResourcesDto } from 'src/dto/product-type-resources.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@Injectable()
export class ProductTypeResourcesService {
  constructor(
    private readonly productResourcesService: ProductResourcesService,
    private readonly productTypesService: ProductTypesService,
    @InjectRepository(ProductTypeResourcesEntity)
    private readonly productTypeResourcesRepository: Repository<ProductTypeResourcesEntity>,
  ) {}

  async createItem(
    productTypeResourcesDto: ProductTypeResourcesDto,
  ): Promise<ProductTypeResourcesEntity> {
    const productType = await this.productTypesService.findOneById(
      productTypeResourcesDto.productTypeId,
    );
    const productResource = await this.productResourcesService.findOneById(
      productTypeResourcesDto.productResourceId,
    );

    if (!productType || !productResource) {
      throw new NotFoundException(
        'One or both of the provided IDs do not exist',
      );
    }

    const checkItem = await this.productTypeResourcesRepository.findOne({
      where: {
        productType: { id: productType.id },
        productResource: { id: productResource.id },
      },
    });

    if (checkItem) {
      throw new ConflictException(
        'The resource already exists for this product type',
      );
    }

    const item = new ProductTypeResourcesEntity();
    item.quantity = productTypeResourcesDto.quantity;
    item.productType = productType;
    item.productResource = productResource;

    return await this.productTypeResourcesRepository.save(item);
  }

  async updateItem(
    id: string,
    productTypeResourcesDto: ProductTypeResourcesDto,
  ): Promise<ProductTypeResourcesEntity> {
    const item = await this.findOneById(id);

    if (!item) {
      throw new NotFoundException(
        `Product type resource with ID "${id}" not found`,
      );
    }

    item.quantity = productTypeResourcesDto.quantity;
    return await this.productTypeResourcesRepository.save(item);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.productTypeResourcesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Product type resource with ID "${id}" not found`,
      );
    }

    return { status: 200, message: 'Product type resource deleted' };
  }

  async findOneById(id: string): Promise<ProductTypeResourcesEntity> {
    const item = await this.productTypeResourcesRepository.findOneOrFail({
      where: { id },
      relations: [
        'productType',
        'productType.product',
        'productType.product.mediaItems',
        'productType.product.mediaItems.activeStorageAttachments',
        'productType.product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'productType.product.discountSettings',
        'productType.colorType',
        'productType.sizeType',
        'productResource',
        'productResource.store',
      ],
    });

    if (!item) {
      throw new NotFoundException(
        `Product type resource with ID "${id}" not found`,
      );
    }
    return item;
  }

  async findAll(): Promise<ProductTypeResourcesEntity[]> {
    return await this.productTypeResourcesRepository.find({
      relations: [
        'productType',
        'productType.product',
        'productType.product.mediaItems',
        'productType.product.mediaItems.activeStorageAttachments',
        'productType.product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'productType.product.discountSettings',
        'productType.colorType',
        'productType.sizeType',
        'productResource',
        'productResource.store',
      ],
    });
  }
}
