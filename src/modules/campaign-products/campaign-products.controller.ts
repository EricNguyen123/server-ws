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
import { CampaignProductsService } from './campaign-products.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { CampaignProductsResDto } from 'src/dto/campaign-products-res.dto';
import { CampaignProductsDto } from 'src/dto/campaign-products.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('campaignProducts')
@Controller('campaign_products')
export class CampaignProductsController {
  constructor(
    private readonly campaignProductsService: CampaignProductsService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Post campaign product successfully',
    type: CampaignProductsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postCampaignProduct(
    @Body() campaignProductsDto: CampaignProductsDto,
  ): Promise<CampaignProductsResDto> {
    return this.campaignProductsService.createItem(campaignProductsDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update campaign product successfully',
    type: CampaignProductsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/item')
  updateCampaignProduct(
    @Query() { id }: GetAccountDto,
    @Body() campaignProductsDto: CampaignProductsDto,
  ): Promise<CampaignProductsResDto> {
    return this.campaignProductsService.updateItem(id, campaignProductsDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete campaign product successfully',
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
  deleteCampaignProduct(
    @Query() { id }: GetAccountDto,
  ): Promise<DeleteItemResDto> {
    return this.campaignProductsService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get campaign product successfully',
    type: CampaignProductsResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('item')
  getCampaignProduct(
    @Query() { id }: GetAccountDto,
  ): Promise<CampaignProductsResDto> {
    return this.campaignProductsService.findOneById(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get campaign product by productId successfully',
    type: CampaignProductsResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('items_by_product')
  getCampaignProductByProductId(
    @Query() { id }: GetAccountDto,
  ): Promise<CampaignProductsResDto[]> {
    return this.campaignProductsService.findByProductId(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get campaign product by campaignId successfully',
    type: CampaignProductsResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('items_by_campaign')
  getCampaignProductByCampaignId(
    @Query() { id }: GetAccountDto,
  ): Promise<CampaignProductsResDto[]> {
    return this.campaignProductsService.findByCampaignId(id);
  }
}
