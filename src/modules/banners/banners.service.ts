import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BannersGetFilesResResDto } from 'src/dto/banners-get-files-res.dto';
import { BannersPaginationResDto } from 'src/dto/banners-paginations-res.dto';
import { BannersPostDto } from 'src/dto/banners-post.dto';
import { BannersResDto } from 'src/dto/banners-res.dto';
import { BannersDto } from 'src/dto/banners.dto';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { SearchDto } from 'src/dto/search.dto';
import { BannersEntity } from 'src/entities/banners.entity';
import { Repository } from 'typeorm';
import { ActiveStorageService } from '../active-storage/active-storage.service';

@Injectable()
export class BannersService {
  constructor(
    private readonly activeStorageService: ActiveStorageService,
    @InjectRepository(BannersEntity)
    private readonly bannersRepository: Repository<BannersEntity>,
  ) {}

  async create(bannersPostDto: BannersPostDto): Promise<BannersResDto> {
    bannersPostDto.url = bannersPostDto.url || 'https://example.com';
    const banner = await this.bannersRepository.save(bannersPostDto);
    return banner;
  }

  async deleteBanner(id: string): Promise<DeleteUserResDto> {
    const banner = await this.bannersRepository.findOne({
      where: { id },
      relations: [
        'mediaItems',
        'mediaItems.activeStorageAttachments',
        'mediaItems.activeStorageAttachments.activeStorageBlob',
      ],
    });
    if (banner.mediaItems.length > 0) {
      const file = this.getFiles(banner);
      const resDeleteFile = await this.activeStorageService.deleteFile(
        file[0].id,
      );
      if (resDeleteFile.status !== 200) {
        throw new NotFoundException(
          `Error deleting file with ID "${file[0].id}"`,
        );
      }
    }

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

  async findOrderBanners(
    bannersDto: BannersDto,
  ): Promise<BannersGetFilesResResDto[]> {
    const banners = await this.bannersRepository.find({
      where: { number_order: bannersDto.number_order },
      relations: [
        'mediaItems',
        'mediaItems.activeStorageAttachments',
        'mediaItems.activeStorageAttachments.activeStorageBlob',
      ],
    });
    const res = banners.map((banner) => {
      return {
        banner: banner,
        files: this.getFiles(banner),
      };
    });
    return res;
  }

  async update(id: string, bannersDto: BannersPostDto) {
    const banner = await this.bannersRepository.findOne({
      where: { id },
    });

    if (!banner) {
      throw new NotFoundException(`Banner with ID "${id}" not found`);
    }

    Object.assign(banner, bannersDto);
    const updateBanner = await this.bannersRepository.save(banner);
    if (!updateBanner) {
      throw new NotFoundException(`Banner with ID "${id}" not found`);
    }
    const resBaneer = await this.bannersRepository.findOne({
      where: { id },
      relations: [
        'mediaItems',
        'mediaItems.activeStorageAttachments',
        'mediaItems.activeStorageAttachments.activeStorageBlob',
      ],
    });
    const files = this.getFiles(resBaneer);
    return {
      banner: resBaneer,
      files: files,
    };
  }

  async findPaginations(
    searchDto: SearchDto,
  ): Promise<BannersPaginationResDto> {
    const { keyword, offset, limit } = searchDto;

    const banners = await this.bannersRepository.find({
      relations: [
        'mediaItems',
        'mediaItems.activeStorageAttachments',
        'mediaItems.activeStorageAttachments.activeStorageBlob',
      ],
    });

    const checkKey = keyword && keyword.trim() !== '';
    const search = (key: string) => {
      if (checkKey) {
        const resKeyword = keyword.toLowerCase();
        return key.toLowerCase().includes(resKeyword);
      }
      return true;
    };

    const filteredBanners = banners.filter((banner) =>
      checkKey
        ? search(banner.descriptions) ||
          search(`${banner.start_date}`) ||
          search(`${banner.end_date}`) ||
          search(`${banner.number_order}`)
        : true,
    );

    const start = Number(offset);
    const end = start + Number(limit);
    const paginatedBanners = filteredBanners.slice(start, end);

    const totalBanners = filteredBanners.length;
    const res = paginatedBanners.map((banner) => {
      return {
        banner: banner,
        files: this.getFiles(banner),
      };
    });
    return {
      banners: res,
      totalBanners,
      currentPage: Math.ceil(start / limit) + 1,
    };
  }

  async findAll(): Promise<BannersGetFilesResResDto[]> {
    const banners = await this.bannersRepository.find({
      relations: [
        'mediaItems',
        'mediaItems.activeStorageAttachments',
        'mediaItems.activeStorageAttachments.activeStorageBlob',
      ],
    });
    const res = banners.map((banner) => {
      return {
        banner: banner,
        files: this.getFiles(banner),
      };
    });
    return res;
  }

  private getFiles(banner: BannersEntity) {
    return banner.mediaItems.flatMap((mediaItem) =>
      mediaItem.activeStorageAttachments.map((attachment) => ({
        id: attachment.activeStorageBlob.id,
        url: `/uploads/${attachment.activeStorageBlob.key}`,
        filename: attachment.activeStorageBlob.filename,
        contentType: attachment.activeStorageBlob.content_type,
      })),
    );
  }
}
