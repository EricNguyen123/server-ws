import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StorePrefecturesService } from './store-prefectures.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { StorePrefecturesResDto } from 'src/dto/store-prefectures-res.dto';
import { StorePrefecturesDto } from 'src/dto/store-prefectures.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('storePrefectures')
@Controller('store_prefectures')
export class StorePrefecturesController {
  constructor(
    private readonly storePrefecturesService: StorePrefecturesService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Post Store Prefectures successfully',
    type: StorePrefecturesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postStorePrefecture(
    @Body() storePrefecturesDto: StorePrefecturesDto,
  ): Promise<StorePrefecturesResDto> {
    return this.storePrefecturesService.createItem(storePrefecturesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update Store Prefectures successfully',
    type: StorePrefecturesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateStorePrefecture(
    @Query() { id }: GetAccountDto,
    @Body() storePrefecturesDto: StorePrefecturesDto,
  ): Promise<StorePrefecturesResDto> {
    return this.storePrefecturesService.updateItem(id, storePrefecturesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete Store Prefecture successfully',
    type: DeleteItemResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/item')
  deleteStorePrefecture(
    @Query() { id }: GetAccountDto,
  ): Promise<DeleteItemResDto> {
    return this.storePrefecturesService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get Store Prefectures successfully',
    type: StorePrefecturesResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('by_store')
  getStorePrefectureByStoreId(
    @Query() { id }: GetAccountDto,
  ): Promise<StorePrefecturesResDto[]> {
    return this.storePrefecturesService.findByStoreId(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get Store Prefectures successfully',
    type: StorePrefecturesResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('by_prefecture')
  getStorePrefectureByPrefecturesId(
    @Query() { id }: GetAccountDto,
  ): Promise<StorePrefecturesResDto[]> {
    return this.storePrefecturesService.findByPrefecturesId(id);
  }
}
