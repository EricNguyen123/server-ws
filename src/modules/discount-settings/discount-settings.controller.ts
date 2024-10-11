import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DiscountSettingsService } from './discount-settings.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { DiscountSettingsDto } from 'src/dto/discount-settings.dto';
import { DiscountSettingsResDto } from 'src/dto/discount-settings-res.dto';
import { DiscountSettingsUpdateDto } from 'src/dto/discount-settings-update.dto';
import { DiscountSettingsDeleteDto } from 'src/dto/discount-settings-delete.dto';
import { DeleteDiscountSettingsResDto } from 'src/dto/delete-discount-settings-res.dto';

@ApiBearerAuth()
@ApiTags('discountSettings')
@Controller('discountsettings')
export class DiscountSettingsController {
  constructor(
    private readonly discountSettingsService: DiscountSettingsService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Post product successfully',
    type: DiscountSettingsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postDiscountSettings(
    @Body() discountSettingsDto: DiscountSettingsDto,
  ): Promise<DiscountSettingsResDto> {
    return this.discountSettingsService.createDiscountSettings(
      discountSettingsDto,
    );
  }

  @ApiResponse({
    status: 201,
    description: 'Post product successfully',
    type: DiscountSettingsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateDiscountSettings(
    @Body() discountSettingsUpdateDto: DiscountSettingsUpdateDto,
  ): Promise<DiscountSettingsResDto> {
    return this.discountSettingsService.updateDiscountSettings(
      discountSettingsUpdateDto,
    );
  }

  @ApiResponse({
    status: 201,
    description: 'Delete category for product successfully',
    type: DeleteDiscountSettingsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deleteDiscountSettings(
    @Param() discountSettingsDeleteDto: DiscountSettingsDeleteDto,
  ): Promise<DeleteDiscountSettingsResDto> {
    return this.discountSettingsService.deleteDiscountSettings(
      discountSettingsDeleteDto,
    );
  }
}
