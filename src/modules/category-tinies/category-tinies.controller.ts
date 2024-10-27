import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryTiniesService } from './category-tinies.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PostCategoryProductDto } from 'src/dto/post-category-product.dto';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { ProductCategoryResDto } from 'src/dto/product-category-res.dto';
import { GetCategoryIdDto } from 'src/dto/get-categoryId.dto';
import { ProductsResDto } from 'src/dto/products-res.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('categoryTinies')
@Controller('category_tinies')
export class CategoryTiniesController {
  constructor(private readonly categoryTiniesService: CategoryTiniesService) {}

  @ApiResponse({
    status: 201,
    description: 'Post category for product successfully',
    type: ProductCategoryResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postCategoryProduct(@Body() postCategoryProductDto: PostCategoryProductDto) {
    return this.categoryTiniesService.createCategoryTinies(
      postCategoryProductDto.categoryIds,
      postCategoryProductDto.productIds,
    );
  }

  @ApiResponse({
    status: 201,
    description: 'Delete category for product successfully',
    type: DeleteItemResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteCategoryProduct(
    @Body() postCategoryProductDto: PostCategoryProductDto,
  ) {
    return this.categoryTiniesService.deleteCategoryTinies(
      postCategoryProductDto.categoryIds,
      postCategoryProductDto.productIds,
    );
  }

  @ApiResponse({
    status: 201,
    description: 'Get products successfully',
    type: ProductsResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Public()
  @Get(':categotyId')
  getProducts(@Param() { categotyId }: GetCategoryIdDto) {
    return this.categoryTiniesService.findProductByCategoryId(categotyId);
  }
}
