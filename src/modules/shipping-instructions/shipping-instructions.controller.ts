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
import { ShippingInstructionsService } from './shipping-instructions.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { ShippingInstructionsResDto } from 'src/dto/shipping-instructions-res.dto';
import { ShippingInstructionsDto } from 'src/dto/shipping-instructions.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('shipping_instructions')
@Controller('shipping_instructions')
export class ShippingInstructionsController {
  constructor(
    private readonly shippingInstructionsService: ShippingInstructionsService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Post shipping instructions successfully',
    type: ShippingInstructionsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postShippingInstructions(
    @Body() shippingInstructionsDto: ShippingInstructionsDto,
  ): Promise<ShippingInstructionsResDto> {
    return this.shippingInstructionsService.createItem(shippingInstructionsDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update shipping instructions successfully',
    type: ShippingInstructionsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/item')
  updateShippingInstructions(
    @Query() { id }: GetAccountDto,
    @Body() shippingInstructionsDto: ShippingInstructionsDto,
  ): Promise<ShippingInstructionsResDto> {
    return this.shippingInstructionsService.updateItem(
      id,
      shippingInstructionsDto,
    );
  }

  @ApiResponse({
    status: 201,
    description: 'Delete shipping instructions successfully',
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
  deleteShippingInstructions(
    @Query() { id }: GetAccountDto,
  ): Promise<DeleteItemResDto> {
    return this.shippingInstructionsService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get shipping instructions successfully',
    type: ShippingInstructionsResDto,
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
  getSizes(): Promise<ShippingInstructionsResDto[]> {
    return this.shippingInstructionsService.findAll();
  }
}
