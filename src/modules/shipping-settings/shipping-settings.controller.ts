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
import { ShippingSettingsService } from './shipping-settings.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { ShippingSettingsResDto } from 'src/dto/shipping-settings-res.dto';
import { ShippingSettingsDto } from 'src/dto/shipping-settings.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';

@ApiBearerAuth()
@ApiTags('shippingSettings')
@Controller('shipping_settings')
export class ShippingSettingsController {
  constructor(
    private readonly shippingSettingsService: ShippingSettingsService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Get all shipping setting successfully',
    type: ShippingSettingsResDto,
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
  getShippingSettings(): Promise<ShippingSettingsResDto[]> {
    return this.shippingSettingsService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Post shipping setting successfully',
    type: ShippingSettingsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postShippingSetting(
    @Body() shippingSettingsDto: ShippingSettingsDto,
  ): Promise<ShippingSettingsResDto> {
    return this.shippingSettingsService.createItem(shippingSettingsDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update shipping setting successfully',
    type: ShippingSettingsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateShippingSetting(
    @Query() { id }: GetAccountDto,
    @Body() shippingSettingsDto: ShippingSettingsDto,
  ): Promise<ShippingSettingsResDto> {
    return this.shippingSettingsService.updateItem(id, shippingSettingsDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete shipping setting successfully',
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
  deleteShippingSetting(
    @Query() { id }: GetAccountDto,
  ): Promise<DeleteItemResDto> {
    return this.shippingSettingsService.deleteItem(id);
  }
}
