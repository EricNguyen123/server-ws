import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { BannersResDto } from 'src/dto/banners-res.dto';
import { BannersDto } from 'src/dto/banners.dto';
import { BannersPostDto } from 'src/dto/banners-post.dto';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { BannersGetFilesResResDto } from 'src/dto/banners-get-files-res.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer/multer.config';
import { ActiveStorageService } from '../active-storage/active-storage.service';
import { KeyTypes } from 'src/common/enums/key-types.enum';
import { BannerUploadFileResDto } from 'src/dto/banner-upload-file-res.dto';

@ApiBearerAuth()
@ApiTags('banners')
@Controller('banners')
export class BannersController {
  constructor(
    private readonly bannersService: BannersService,
    private readonly activeStorageService: ActiveStorageService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Get banners successfully',
    type: BannersResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getBanners(@Body() bannersDto: BannersDto): Promise<BannersResDto[]> {
    return this.bannersService.findOrderBanners(bannersDto);
  }

  // @ApiResponse({
  //   status: 201,
  //   description: 'Post banner successfully',
  //   type: BannersResDto,
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Not found',
  // })
  // @Roles(ValidRoles.Admin, ValidRoles.Editor)
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  // @Post()
  // postBanner(@Body() bannersPostDto: BannersPostDto): Promise<BannersResDto> {
  //   return this.bannersService.create(bannersPostDto);
  // }

  @ApiResponse({
    status: 201,
    description: 'Delete item successfully',
    type: DeleteUserResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/item')
  deleteBanner(@Query() { id }: GetAccountDto): Promise<DeleteUserResDto> {
    return this.bannersService.deleteBanner(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete items successfully',
    type: DeleteUsersResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/items')
  deleteBanners(@Body() dataDto: GetAccountDto[]): Promise<DeleteUsersResDto> {
    return this.bannersService.deleteBanners(dataDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Get files banner successfully',
    type: BannersGetFilesResResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id/files')
  async getProductWithFiles(@Param() { id }: GetAccountDto) {
    const result = await this.bannersService.findBannerWithFiles(id);
    return {
      banner: result.banner,
      files: result.files,
    };
  }

  @ApiResponse({
    status: 201,
    description: 'Post product successfully',
    type: BannerUploadFileResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to be uploaded',
        },
        descriptions: {
          type: 'string',
          description: 'Descriptions of the file',
        },
        start_date: {
          type: 'date',
          format: 'date',
          description: 'Start date of the banner',
        },
        end_date: {
          type: 'date',
          format: 'date',
          description: 'End date of the banner',
        },
        number_order: {
          type: 'integer',
          description: 'Number order of the banner',
        },
        url: {
          type: 'string',
          description: 'URL of the banner',
        },
      },
    },
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadItemFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() bannersPostDto: BannersPostDto,
  ) {
    const banner = await this.bannersService.create(bannersPostDto);
    const uploadedFile = await this.activeStorageService.uploadFile(
      file,
      banner.id,
      KeyTypes.Banner,
    );
    const updateBanner = await this.bannersService.update(banner.id, {
      ...bannersPostDto,
      url: this.activeStorageService.getUploadedFileUrl(uploadedFile.blob.key),
    });

    return {
      banner: updateBanner,
      message: 'File uploaded successfully',
    };
  }
}
