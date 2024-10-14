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
import { PrefecturesService } from './prefectures.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { PrefecturesResDto } from 'src/dto/prefectures-res.dto';
import { PrefecturesDto } from 'src/dto/prefectures.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('prefectures')
@Controller('prefectures')
export class PrefecturesController {
  constructor(private readonly prefecturesService: PrefecturesService) {}

  @ApiResponse({
    status: 201,
    description: 'Get all prefectures successfully',
    type: PrefecturesResDto,
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
  getPrefectures(): Promise<PrefecturesResDto[]> {
    return this.prefecturesService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Post prefectures successfully',
    type: PrefecturesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postPrefecture(
    @Body() prefecturesDto: PrefecturesDto,
  ): Promise<PrefecturesResDto> {
    return this.prefecturesService.createItem(prefecturesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update prefectures successfully',
    type: PrefecturesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update')
  updatePrefecture(
    @Query() { id }: GetAccountDto,
    @Body() prefecturesDto: PrefecturesDto,
  ): Promise<PrefecturesResDto> {
    return this.prefecturesService.updateItem(id, prefecturesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete prefectures successfully',
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
  deletePrefecture(@Query() { id }: GetAccountDto): Promise<DeleteItemResDto> {
    return this.prefecturesService.deleteItem(id);
  }
}
