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
import { CampaignsService } from './campaigns.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CampaignResDto } from 'src/dto/campaigns-res.dto';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { CampaignDto } from 'src/dto/campaigns.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @ApiResponse({
    status: 201,
    description: 'Post campaign successfully',
    type: CampaignResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postCampaign(@Body() campaignDto: CampaignDto): Promise<CampaignResDto> {
    return this.campaignsService.createItem(campaignDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update campaign successfully',
    type: CampaignResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/item')
  updateCampaign(
    @Query() { id }: GetAccountDto,
    @Body() campaignDto: CampaignDto,
  ): Promise<CampaignResDto> {
    return this.campaignsService.updateItem(id, campaignDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete campaign successfully',
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
  deleteCampaign(@Query() { id }: GetAccountDto): Promise<DeleteItemResDto> {
    return this.campaignsService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get campaigns successfully',
    type: CampaignResDto,
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
  getCampaigns(): Promise<CampaignResDto[]> {
    return this.campaignsService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Get campaign successfully',
    type: CampaignResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('item')
  getCampaign(@Query() { id }: GetAccountDto): Promise<CampaignResDto> {
    return this.campaignsService.findOneById(id);
  }
}
