import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShippingMakerManagersService } from './shipping-maker-managers.service';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { ShippingMakerManagersResDto } from 'src/dto/shipping-maker-managers-res.dto';
import { ShippingMakerManagersDto } from 'src/dto/shipping-maker-managers.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';

@ApiBearerAuth()
@ApiTags('shipping_maker_managers')
@Controller('shipping_maker_managers')
export class ShippingMakerManagersController {
  constructor(
    private readonly shippingMakerManagersService: ShippingMakerManagersService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Post Shipping Maker Managers successfully',
    type: ShippingMakerManagersResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postShippingMakerManagers(
    @Body() shippingMakerManagersDto: ShippingMakerManagersDto,
  ): Promise<ShippingMakerManagersResDto> {
    return this.shippingMakerManagersService.createItem(
      shippingMakerManagersDto,
    );
  }

  @ApiResponse({
    status: 201,
    description: 'Delete Shipping Maker Managers successfully',
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
  deleteShippingMakerManagers(
    @Query() { id }: GetAccountDto,
  ): Promise<DeleteItemResDto> {
    return this.shippingMakerManagersService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get Shipping Maker Managers successfully',
    schema: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: { $ref: getSchemaPath(ShippingMakerManagersResDto) },
      },
      example: {
        userId1: [{}, {}],
        userId2: [{}],
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getShippingMakerManagers(): Promise<{
    [userId: string]: ShippingMakerManagersResDto[];
  }> {
    return this.shippingMakerManagersService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Get Shipping Maker Managers successfully',
    type: ShippingMakerManagersResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('by_user')
  getAllByUserId(
    @Query() { id }: GetAccountDto,
  ): Promise<ShippingMakerManagersResDto[]> {
    return this.shippingMakerManagersService.findAllByUserId(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get Shipping Maker Managers successfully',
    type: ShippingMakerManagersResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('by_shipping_instructions')
  getAllByShippingInstructionsId(
    @Query() { id }: GetAccountDto,
  ): Promise<ShippingMakerManagersResDto[]> {
    return this.shippingMakerManagersService.findAllByShippingInstructionsId(
      id,
    );
  }
}
