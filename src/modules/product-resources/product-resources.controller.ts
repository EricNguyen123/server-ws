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
import { ProductResourcesService } from './product-resources.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { ProductResourceResDto } from 'src/dto/product-resource-res.dto';
import { ProductResourceDto } from 'src/dto/product-resource.dto';
import { DeleteProductResourceResDto } from 'src/dto/delete-product-resource-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';

@ApiBearerAuth()
@ApiTags('productResources')
@Controller('product_resources')
export class ProductResourcesController {
  constructor(
    private readonly productResourcesService: ProductResourcesService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Get all product resources successfully',
    type: ProductResourceResDto,
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
  getProductResources(): Promise<ProductResourceResDto[]> {
    return this.productResourcesService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Post product resource successfully',
    type: ProductResourceResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postProductResource(
    @Body() dataDto: ProductResourceDto,
  ): Promise<ProductResourceResDto> {
    return this.productResourcesService.create(dataDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete product resource successfully',
    type: DeleteProductResourceResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/item')
  deleteProductResource(
    @Query() { id }: GetAccountDto,
  ): Promise<DeleteProductResourceResDto> {
    return this.productResourcesService.delete(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Post product resource successfully',
    type: ProductResourceResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/item')
  putProductResource(
    @Query() { id }: GetAccountDto,
    @Body() dataDto: ProductResourceDto,
  ): Promise<ProductResourceResDto> {
    return this.productResourcesService.update(id, dataDto);
  }
}
