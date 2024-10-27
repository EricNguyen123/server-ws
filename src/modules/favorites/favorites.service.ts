import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesEntity } from 'src/entities/favorites.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { UserService } from '../user/user.service';
import { FavoritesDto } from 'src/dto/favorites.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly usersService: UserService,
    private readonly productsService: ProductsService,
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
  ) {}

  async createItem(dataDto: FavoritesDto): Promise<FavoritesEntity> {
    const user = await this.usersService.findOneById(dataDto.userId);
    const product = await this.productsService.findOneByProduct(
      dataDto.productId,
    );
    if (!user || !product) {
      throw new NotFoundException('User or product not found');
    }

    return await this.favoritesRepository.save({ user, product });
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.favoritesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Favorite not found');
    }
    return {
      status: 200,
      message: 'Favorite deleted successfully',
    };
  }

  async findAll(): Promise<{
    [productId: string]: FavoritesEntity[];
  }> {
    const records = await this.favoritesRepository.find({
      relations: ['product', 'user'],
    });

    const groupedByProduct = records.reduce(
      (acc, record) => {
        const productId = record.product.id;

        if (!acc[productId]) {
          acc[productId] = [];
        }
        acc[productId].push(record);

        return acc;
      },
      {} as { [productId: string]: FavoritesEntity[] },
    );

    return groupedByProduct;
  }

  async findOneById(id: string): Promise<FavoritesEntity> {
    return await this.favoritesRepository.findOneOrFail({ where: { id: id } });
  }
}
