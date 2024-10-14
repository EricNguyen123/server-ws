import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductResourceDto } from 'src/dto/product-resource.dto';
import { ProductResourceEntity } from 'src/entities/product-resources.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { StoresService } from '../stores/stores.service';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@Injectable()
export class ProductResourcesService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly storesService: StoresService,
    @InjectRepository(ProductResourceEntity)
    private readonly productResourcesRepository: Repository<ProductResourceEntity>,
  ) {}

  async create(productResourceDto: ProductResourceDto) {
    const product = await this.productsService.findOneByProduct(
      productResourceDto.productId,
    );
    const store = await this.storesService.findOneById(
      productResourceDto.resourceId,
    );

    if (!product || !store) {
      throw new NotFoundException('Product or store not found');
    }

    const productResource = this.productResourcesRepository.create({
      product,
      store,
      quantity: productResourceDto.quantity,
      resource_type: productResourceDto.resource_type,
    });
    return await this.productResourcesRepository.save(productResource);
  }

  async findAll(): Promise<ProductResourceEntity[]> {
    return await this.productResourcesRepository.find({
      relations: ['product', 'store'],
    });
  }

  async findOneById(id: string): Promise<ProductResourceEntity> {
    try {
      return await this.productResourcesRepository.findOneOrFail({
        where: { id },
        relations: ['product', 'store'],
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Product resource not found');
    }
  }

  async update(
    id: string,
    productResourceDto: ProductResourceDto,
  ): Promise<ProductResourceEntity> {
    const productResource = await this.findOneById(id);
    if (!productResource) {
      throw new NotFoundException('Product resource not found');
    }

    const quantityCheck = await this.checkQuantity(
      productResource.product.id,
      productResource.store.id,
    );

    if (productResourceDto.quantity >= quantityCheck) {
      throw new BadRequestException('Insufficient product quantity remaining');
    }

    Object.assign(productResource, {
      quantity: productResourceDto.quantity,
      resource_type: productResourceDto.resource_type,
    });
    return await this.productResourcesRepository.save(productResource);
  }

  async delete(id: string): Promise<DeleteItemResDto> {
    const result = await this.productResourcesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product resource not found');
    }
    return {
      status: 200,
      message: 'Product resource deleted successfully',
    };
  }

  async checkQuantity(productId: string, resourceId: string) {
    const product = await this.productsService.findOneByProduct(productId);
    const totalQuantity = product.quantity;

    const productOfResources = await this.findAll();

    const totalQuantityOfResources = productOfResources.reduce((acc, item) => {
      return item.store.id !== resourceId ? acc + item.quantity : acc;
    }, 0);

    return totalQuantity - totalQuantityOfResources;
  }
}
