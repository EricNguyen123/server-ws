import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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

@ApiBearerAuth()
@ApiTags('banners')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

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

  @ApiResponse({
    status: 201,
    description: 'Post banner successfully',
    type: BannersResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postBanner(@Body() bannersPostDto: BannersPostDto): Promise<BannersResDto> {
    return this.bannersService.create(bannersPostDto);
  }

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
}
