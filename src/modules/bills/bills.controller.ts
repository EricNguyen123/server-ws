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
import { BillsService } from './bills.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { BillsDto } from 'src/dto/bills.dto';
import { BillsResDto } from 'src/dto/bills-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { PaginationDto } from 'src/dto/pagination.dto';

@ApiBearerAuth()
@ApiTags('bills')
@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @ApiResponse({
    status: 201,
    description: 'Post bill successfully',
    type: BillsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postBill(@Body() dataDto: BillsDto): Promise<BillsResDto> {
    return this.billsService.createItem(dataDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Put bill successfully',
    type: BillsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put()
  putBill(
    @Query() { id }: GetAccountDto,
    @Body() dataDto: BillsDto,
  ): Promise<BillsResDto> {
    return this.billsService.updateItem(id, dataDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete bill successfully',
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
  deleteBill(@Query() { id }: GetAccountDto): Promise<DeleteItemResDto> {
    return this.billsService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get bills successfully',
    type: BillsResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getBill(): Promise<BillsResDto[]> {
    return this.billsService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Get bills successfully',
    type: BillsResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('page')
  getBillsPage(@Query() paginationDto: PaginationDto): Promise<BillsResDto[]> {
    return this.billsService.findAllWithPagination(paginationDto);
  }
}
