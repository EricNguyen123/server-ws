import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteStoresResDto } from 'src/dto/delete-stores-res.dto';
import { StoresDto } from 'src/dto/stores.dto';
import { StoreEntity } from 'src/entities/stores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storesRepository: Repository<StoreEntity>,
  ) {}

  async createStore(storeDto: StoresDto): Promise<StoreEntity> {
    const store = await this.storesRepository.save(storeDto);
    return store;
  }

  async updateStore(id: string, storeDto: StoresDto): Promise<StoreEntity> {
    const store = await this.findOneById(id);
    if (!store) throw new NotFoundException('Store not found');

    store.email = storeDto.email;
    store.name = storeDto.name;
    store.postcode = storeDto.postcode;
    store.prefecture = storeDto.prefecture;
    store.city = storeDto.city;
    store.street = storeDto.street;
    store.building = storeDto.building;
    store.status = storeDto.status;

    const updatedStore = await this.storesRepository.save(store);
    return updatedStore;
  }

  async deleteStore(id: string): Promise<DeleteStoresResDto> {
    const result = await this.storesRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Store with ID "${id}" not found`);
    }
    return {
      status: 200,
      message: 'Store deleted successfully',
    };
  }

  async findAll(): Promise<StoreEntity[]> {
    return await this.storesRepository.find();
  }

  async findOneById(id: string): Promise<StoreEntity> {
    try {
      return await this.storesRepository.findOneOrFail({ where: { id } });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
