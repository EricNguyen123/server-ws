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
import { ProductTypeResourcesService } from './product-type-resources.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { ProductTypeResourcesResDto } from 'src/dto/product-type-resources-res.dto';
import { ProductTypeResourcesDto } from 'src/dto/product-type-resources.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('productTypeResources')
@Controller('product_type_resources')
export class ProductTypeResourcesController {
  constructor(
    private readonly productTypeResourcesService: ProductTypeResourcesService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Post resource successfully',
    type: ProductTypeResourcesResDto,
  })
  @ApiResponse({
    status: 404,
    description: 'One or both of the provided IDs do not exist',
  })
  @ApiResponse({
    status: 409,
    description: 'The resource already exists for this product type',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postProductTypeResources(
    @Body() productTypeResourcesDto: ProductTypeResourcesDto,
  ): Promise<ProductTypeResourcesResDto> {
    return this.productTypeResourcesService.createItem(productTypeResourcesDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update resource successfully',
    type: ProductTypeResourcesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/item')
  updateProductTypeResources(
    @Query() { id }: GetAccountDto,
    @Body() productTypeResourcesDto: ProductTypeResourcesDto,
  ): Promise<ProductTypeResourcesResDto> {
    return this.productTypeResourcesService.updateItem(
      id,
      productTypeResourcesDto,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Delete resource successfully',
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
  deleteProductTypeResources(
    @Query() { id }: GetAccountDto,
  ): Promise<DeleteItemResDto> {
    return this.productTypeResourcesService.deleteItem(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all resource successfully',
    type: ProductTypeResourcesResDto,
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
  getProductTypeResources(): Promise<ProductTypeResourcesResDto[]> {
    return this.productTypeResourcesService.findAll();
  }
}
