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
import { StoresService } from './stores.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { StoresResDto } from 'src/dto/stores-res.dto';
import { StoresDto } from 'src/dto/stores.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiResponse({
    status: 201,
    description: 'Get all stores successfully',
    type: StoresResDto,
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
  getStores(): Promise<StoresResDto[]> {
    return this.storesService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Post store successfully',
    type: StoresResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postStore(@Body() storeDto: StoresDto): Promise<StoresResDto> {
    return this.storesService.createStore(storeDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete store successfully',
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
  deleteStore(@Query() { id }: GetAccountDto): Promise<DeleteItemResDto> {
    return this.storesService.deleteStore(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Post store successfully',
    type: StoresResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update')
  putStore(
    @Query() { id }: GetAccountDto,
    @Body() storeDto: StoresDto,
  ): Promise<StoresResDto> {
    return this.storesService.updateStore(id, storeDto);
  }
}
