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
import { ShippingCompaniesService } from './shipping-companies.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { ShippingCompaniesResDto } from 'src/dto/shipping-companies-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { ShippingCompanyDto } from 'src/dto/shipping-company.dto';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

@ApiBearerAuth()
@ApiTags('shippingCompanies')
@Controller('shipping_companies')
export class ShippingCompaniesController {
  constructor(
    private readonly shippingCompaniesService: ShippingCompaniesService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Get all shipping companies successfully',
    type: ShippingCompaniesResDto,
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
  getShippingCompanies(): Promise<ShippingCompaniesResDto[]> {
    return this.shippingCompaniesService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Get companies successfully',
    type: ShippingCompaniesResDto,
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
  getUsersPage(
    @Query() paginationDto: PaginationDto,
  ): Promise<ShippingCompaniesResDto[]> {
    return this.shippingCompaniesService.findAllWithPagination(paginationDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Get a shipping company successfully',
    type: ShippingCompaniesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('account')
  getShippingCompany(
    @Query() { id }: GetAccountDto,
  ): Promise<ShippingCompaniesResDto> {
    return this.shippingCompaniesService.findOneByShippingCompany(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get a shipping company successfully',
    type: ShippingCompaniesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postShippingCompany(
    @Body() companyDto: ShippingCompanyDto,
  ): Promise<ShippingCompaniesResDto> {
    return this.shippingCompaniesService.create(companyDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update company successfully',
    type: ShippingCompaniesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateUser(
    @Query() { id }: GetAccountDto,
    @Body() data: ShippingCompanyDto,
  ): Promise<ShippingCompaniesResDto> {
    return this.shippingCompaniesService.updateShippingCompany(id, data);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete company successfully',
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
    return this.shippingCompaniesService.deleteCompany(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete companies successfully',
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
    return this.shippingCompaniesService.deleteCompanies(dataDto);
  }
}
