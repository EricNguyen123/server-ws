import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { ProductsResDto } from 'src/dto/products-res.dto';
import { ProductsPostDto } from 'src/dto/products-post.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { ProductsGetFilesResResDto } from 'src/dto/products-get-files-res.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ProductsPaginationResDto } from 'src/dto/products-pagination-res.dto';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 201,
    description: 'Post product successfully',
    type: ProductsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postProduct(
    @Body() productsPostDto: ProductsPostDto,
  ): Promise<ProductsResDto> {
    return this.productsService.create(productsPostDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update product successfully',
    type: ProductsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateProduct(
    @Query() { id }: GetAccountDto,
    @Body() data: ProductsPostDto,
  ): Promise<ProductsResDto> {
    return this.productsService.updateProduct(id, data);
  }

  @ApiResponse({
    status: 201,
    description: 'Get products successfully',
    type: ProductsPaginationResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Public()
  @Get('page')
  getProductsPage(
    @Query() paginationDto: PaginationDto,
  ): Promise<ProductsPaginationResDto> {
    return this.productsService.findAllWithPagination(paginationDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Get all products successfully',
    type: ProductsResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Public()
  @Get()
  getProducts(): Promise<ProductsResDto[]> {
    return this.productsService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Get product successfully',
    type: ProductsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Public()
  @Get('item')
  getProduct(@Query() { id }: GetAccountDto): Promise<ProductsResDto> {
    return this.productsService.findOneByProduct(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete product successfully',
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
  deleteUser(@Query() { id }: GetAccountDto): Promise<DeleteUserResDto> {
    return this.productsService.deleteProduct(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete products successfully',
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
  deleteUsers(@Body() dataDto: GetAccountDto[]): Promise<DeleteUsersResDto> {
    return this.productsService.deleteProducts(dataDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Get files product successfully',
    type: ProductsGetFilesResResDto,
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
    const result = await this.productsService.findProductWithFiles(id);
    return {
      product: result.product,
      files: result.files,
    };
  }
}
