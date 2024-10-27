import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemsEntity } from 'src/entities/cart-items.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { CampaignsService } from '../campaigns/campaigns.service';
import { StoresService } from '../stores/stores.service';
import { ProductTypesService } from '../product-types/product-types.service';
import { CartItemsDto } from 'src/dto/cart-items.dto';
import { CartStatus } from 'src/common/enums/cart-status.enum';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/entities/user.entity';
import { ProductsEntity } from 'src/entities/products.entity';
import { CampaignsEntity } from 'src/entities/campaigns.entity';
import { StoreEntity } from 'src/entities/stores.entity';
import { ProductTypesEntity } from 'src/entities/product-types.entity';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@Injectable()
export class CartItemsService {
  constructor(
    private readonly usersService: UserService,
    private readonly productTypesService: ProductTypesService,
    private readonly productsService: ProductsService,
    private readonly campaignsService: CampaignsService,
    private readonly storesService: StoresService,
    @InjectRepository(CartItemsEntity)
    private readonly cartItemsRepository: Repository<CartItemsEntity>,
  ) {}

  async createItem(dataDto: CartItemsDto): Promise<CartItemsEntity> {
    const product = await this.productsService.findOneByProduct(
      dataDto.product_id,
    );
    const campaign = await this.campaignsService.findOneById(
      dataDto.campaign_id,
    );
    const store = await this.storesService.findOneById(dataDto.store_id);
    const productType = await this.productTypesService.findOneById(
      dataDto.product_type_id,
    );

    if (!product || !campaign || !store || !productType) {
      throw new NotFoundException('One or more entities not found.');
    }

    if (
      productType.quantity <= 0 ||
      productType.quantity < dataDto.quantity ||
      dataDto.quantity <= 0
    ) {
      throw new ConflictException('Product quantity is not enough.');
    }

    const user = await this.usersService.findOneById(dataDto.user_id);

    return await this.updateItem(
      dataDto,
      user,
      product,
      campaign,
      store,
      productType,
    );
  }

  async updateItem(
    item: CartItemsDto,
    user: UserEntity,
    product: ProductsEntity,
    campaign: CampaignsEntity,
    store: StoreEntity,
    productType: ProductTypesEntity,
  ): Promise<CartItemsEntity> {
    let existingCartItem = await this.cartItemsRepository.findOne({
      where: {
        user: { id: user.id },
        product: { id: item.product_id },
        campaign: { id: item.campaign_id },
        store: { id: item.store_id },
        productType: { id: item.product_type_id },
      },
      relations: [
        'product',
        'product.mediaItems',
        'product.mediaItems.activeStorageAttachments',
        'product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'product.discountSettings',
        'campaign',
        'store',
        'productType',
        'productType.colorType',
        'productType.sizeType',
      ],
    });

    if (existingCartItem) {
      existingCartItem.quantity += item.quantity;
      if (productType.quantity < existingCartItem.quantity) {
        throw new ConflictException('Product quantity is not enough.');
      }
    } else {
      const newCart = new CartItemsEntity();
      newCart.quantity = item.quantity;
      newCart.product = product;
      newCart.campaign = campaign;
      newCart.store = store;
      newCart.productType = productType;
      newCart.user = user;
      newCart.status = CartStatus.AddCart;
      existingCartItem = await this.cartItemsRepository.save(newCart);
    }
    return existingCartItem;
  }

  async handleItem(
    id: string,
    dataDto: CartItemsDto,
  ): Promise<CartItemsEntity | DeleteItemResDto> {
    const cartItem = await this.findOneById(id);
    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID "${id}" not found.`);
    }
    if (!dataDto.quantity) {
      return await this.deleteItem(id);
    }
    if (cartItem.productType.quantity < dataDto.quantity) {
      throw new ConflictException('Product quantity is not enough.');
    }
    cartItem.quantity = dataDto.quantity;
    return await this.cartItemsRepository.save(cartItem);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.cartItemsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Cart item with ID "${id}" not found.`);
    }

    return {
      status: 201,
      message: 'Cart item deleted successfully.',
    };
  }

  async findAll(): Promise<CartItemsEntity[]> {
    return await this.cartItemsRepository.find({
      relations: [
        'product',
        'product.mediaItems',
        'product.mediaItems.activeStorageAttachments',
        'product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'product.discountSettings',
        'campaign',
        'store',
        'productType',
        'productType.colorType',
        'productType.sizeType',
      ],
    });
  }

  async findOneById(id: string): Promise<CartItemsEntity> {
    const cart = await this.cartItemsRepository.findOneOrFail({
      where: { id },
      relations: [
        'product',
        'product.mediaItems',
        'product.mediaItems.activeStorageAttachments',
        'product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'product.discountSettings',
        'campaign',
        'store',
        'productType',
        'productType.colorType',
        'productType.sizeType',
      ],
    });

    if (!cart) {
      throw new NotFoundException(`Cart with ID "${id}" not found.`);
    }
    return cart;
  }
}
