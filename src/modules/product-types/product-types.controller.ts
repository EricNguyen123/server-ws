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
import { ProductTypesService } from './product-types.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { ProductTypesDto } from 'src/dto/product-types.dto';
import { ProductTypesResDto } from 'src/dto/product-types-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('productTypes')
@Controller('product_types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @ApiResponse({
    status: 201,
    description: 'Post types successfully',
    type: ProductTypesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postProductType(
    @Body() productTypesDto: ProductTypesDto,
  ): Promise<ProductTypesResDto> {
    return this.productTypesService.createItem(productTypesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update types successfully',
    type: ProductTypesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/item')
  updateProductType(
    @Query() { id }: GetAccountDto,
    @Body() productTypesDto: ProductTypesDto,
  ): Promise<ProductTypesResDto> {
    return this.productTypesService.updateItem(id, productTypesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete types successfully',
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
  deleteProductType(@Query() { id }: GetAccountDto): Promise<DeleteItemResDto> {
    return this.productTypesService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get types successfully',
    type: ProductTypesResDto,
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
  getAll(): Promise<ProductTypesResDto[]> {
    return this.productTypesService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Get type successfully',
    type: ProductTypesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('item')
  getType(@Query() { id }: GetAccountDto): Promise<ProductTypesResDto> {
    return this.productTypesService.findOneById(id);
  }
}
