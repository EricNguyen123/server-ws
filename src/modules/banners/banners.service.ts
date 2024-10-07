import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BannersPostDto } from 'src/dto/banners-post.dto';
import { BannersResDto } from 'src/dto/banners-res.dto';
import { BannersDto } from 'src/dto/banners.dto';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { BannersEntity } from 'src/entities/banners.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(BannersEntity)
    private readonly bannersRepository: Repository<BannersEntity>,
  ) {}

  async create(bannersPostDto: BannersPostDto): Promise<BannersResDto> {
    const banner = await this.bannersRepository.save(bannersPostDto);
    return banner;
  }

  async deleteBanner(id: string): Promise<DeleteUserResDto> {
    const result = await this.bannersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Banner with ID "${id}" not found`);
    }
    return {
      id: id,
      status: 200,
      message: 'Banner deleted successfully',
    };
  }

  async deleteBanners(data: GetAccountDto[]): Promise<DeleteUsersResDto> {
    const ids = data.map((item) => item.id);
    const result = await this.bannersRepository.delete(ids);

    if (result.affected === 0) {
      throw new NotFoundException(`No banners found for the given IDs`);
    }

    return {
      ids: ids,
      status: 200,
      message: 'Banners deleted successfully',
    };
  }

  async findOrderBanners(bannersDto: BannersDto): Promise<BannersResDto[]> {
    const banners = await this.bannersRepository.find({
      where: { number_order: bannersDto.number_order },
    });
    return banners;
  }
}
