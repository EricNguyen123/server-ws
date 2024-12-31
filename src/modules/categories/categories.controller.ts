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
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { CategoriesResDto } from 'src/dto/categories-res.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { CategoriesDto } from 'src/dto/categories.dto';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CategoriesPaginationResDto } from 'src/dto/categories-pagination-res.dto';

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @ApiResponse({
    status: 201,
    description: 'Get all categories successfully',
    type: CategoriesResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Public()
  @Get()
  getCategories(): Promise<CategoriesResDto[]> {
    return this.categoriesService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Get categories successfully',
    type: CategoriesPaginationResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('page')
  getCategoriesPage(
    @Query() paginationDto: PaginationDto,
  ): Promise<CategoriesPaginationResDto> {
    return this.categoriesService.findAllWithPagination(paginationDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Post item successfully',
    type: CategoriesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postCategory(
    @Body() categoriesDto: CategoriesDto,
  ): Promise<CategoriesResDto> {
    return this.categoriesService.create(categoriesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update category successfully',
    type: CategoriesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateCategory(
    @Query() { id }: GetAccountDto,
    @Body() data: CategoriesDto,
  ): Promise<CategoriesResDto> {
    return this.categoriesService.updateCategory(id, data);
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
  deleteCategory(@Query() { id }: GetAccountDto): Promise<DeleteUserResDto> {
    return this.categoriesService.deleteCategory(id);
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
  deleteCategories(
    @Body() dataDto: GetAccountDto[],
  ): Promise<DeleteUsersResDto> {
    return this.categoriesService.deleteCategories(dataDto);
  }
}
