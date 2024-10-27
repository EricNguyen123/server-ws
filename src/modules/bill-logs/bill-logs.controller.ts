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
import { BillLogsService } from './bill-logs.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { BillLogsDto } from 'src/dto/bill-logs.dto';
import { BillLogsResDto } from 'src/dto/bill-logs-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('bill_logs')
@Controller('bill_logs')
export class BillLogsController {
  constructor(private readonly billLogsService: BillLogsService) {}

  @ApiResponse({
    status: 201,
    description: 'Post bill log successfully',
    type: BillLogsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postLog(@Body() billLogsDto: BillLogsDto): Promise<BillLogsResDto> {
    return this.billLogsService.createItem(billLogsDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update bill log successfully',
    type: BillLogsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/item')
  updateLog(
    @Query() { id }: GetAccountDto,
    @Body() billLogsDto: BillLogsDto,
  ): Promise<BillLogsResDto> {
    return this.billLogsService.updateItem(id, billLogsDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete bill log successfully',
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
  deleteLog(@Query() { id }: GetAccountDto): Promise<DeleteItemResDto> {
    return this.billLogsService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get bill log successfully',
    type: BillLogsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getLog(@Query() { id }: GetAccountDto): Promise<BillLogsResDto[]> {
    return this.billLogsService.findByBillId(id);
  }
}
