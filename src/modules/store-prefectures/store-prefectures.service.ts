import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorePrefecturesDto } from 'src/dto/store-prefectures.dto';
import { StorePrefecturesEntity } from 'src/entities/store-prefectures.entity';
import { Repository } from 'typeorm';
import { PrefecturesService } from '../prefectures/prefectures.service';
import { StoresService } from '../stores/stores.service';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@Injectable()
export class StorePrefecturesService {
  constructor(
    private readonly storesService: StoresService,
    private readonly prefecturesService: PrefecturesService,
    @InjectRepository(StorePrefecturesEntity)
    private readonly storePrefecturesRepository: Repository<StorePrefecturesEntity>,
  ) {}

  async createItem(
    storePrefecturesDto: StorePrefecturesDto,
  ): Promise<StorePrefecturesEntity> {
    const prefecture = await this.prefecturesService.findOneById(
      storePrefecturesDto.prefecture_id,
    );

    const store = await this.storesService.findOneById(
      storePrefecturesDto.store_id,
    );

    if (!prefecture || !store) {
      throw new NotFoundException('Prefecture or store not found');
    }

    const storePrefecture = new StorePrefecturesEntity();
    storePrefecture.prefecture = prefecture;
    storePrefecture.store = store;
    storePrefecture.shipping_fee = storePrefecturesDto.shipping_fee;
    return await this.storePrefecturesRepository.save(storePrefecture);
  }

  async updateItem(
    id: string,
    storePrefecturesDto: StorePrefecturesDto,
  ): Promise<StorePrefecturesEntity> {
    const storePrefecture = await this.findOneById(id);

    if (!storePrefecture) {
      throw new NotFoundException('Store Prefecture not found');
    }

    storePrefecture.shipping_fee = storePrefecturesDto.shipping_fee;

    return await this.storePrefecturesRepository.save(storePrefecture);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.storePrefecturesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Store Prefecture not found');
    }

    return {
      status: 200,
      message: 'Store Prefecture deleted successfully',
    };
  }

  async findByStoreId(storeId: string): Promise<StorePrefecturesEntity[]> {
    const store = await this.storesService.findOneById(storeId);
    if (!store) {
      throw new NotFoundException(`Store with ID "${storeId}" not found.`);
    }

    const storePrefecture = await this.storePrefecturesRepository.find({
      where: { store: { id: storeId } },
      relations: ['store', 'prefecture'],
    });

    if (!storePrefecture) {
      throw new NotFoundException('Store Prefecture not found');
    }

    return storePrefecture;
  }

  async findByPrefecturesId(
    prefectureId: string,
  ): Promise<StorePrefecturesEntity[]> {
    const prefecture = await this.prefecturesService.findOneById(prefectureId);
    if (!prefecture) {
      throw new NotFoundException(
        `Prefecture with ID "${prefectureId}" not found.`,
      );
    }

    const storePrefecture = await this.storePrefecturesRepository.find({
      where: { prefecture: { id: prefectureId } },
      relations: ['store', 'prefecture'],
    });

    if (!storePrefecture) {
      throw new NotFoundException('Store Prefecture not found');
    }

    return storePrefecture;
  }

  async findByPrefecturesAndStore(
    prefectureId: string,
    storeId: string,
  ): Promise<StorePrefecturesEntity> {
    const storePrefecture = await this.storePrefecturesRepository.findOneOrFail(
      {
        where: { prefecture: { id: prefectureId }, store: { id: storeId } },
        relations: ['store', 'prefecture'],
      },
    );

    if (!storePrefecture) {
      throw new NotFoundException('Store Prefecture not found');
    }

    return storePrefecture;
  }

  async findOneById(id: string): Promise<StorePrefecturesEntity> {
    const storePrefecture = await this.storePrefecturesRepository.findOneOrFail(
      {
        where: { id },
      },
    );

    if (!storePrefecture) {
      throw new NotFoundException('Store Prefecture not found');
    }

    return storePrefecture;
  }
}
