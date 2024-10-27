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
import { SizeTypesService } from './size-types.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { SizeTypesDto } from 'src/dto/size-types.dto';
import { SizeTypesResDto } from 'src/dto/size-types-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('sizeTypes')
@Controller('size_types')
export class SizeTypesController {
  constructor(private readonly sizeTypesService: SizeTypesService) {}

  @ApiResponse({
    status: 201,
    description: 'Post size successfully',
    type: SizeTypesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postSize(@Body() sizeTypesDto: SizeTypesDto): Promise<SizeTypesResDto> {
    return this.sizeTypesService.createItem(sizeTypesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update size successfully',
    type: SizeTypesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/item')
  updateSize(
    @Query() { id }: GetAccountDto,
    @Body() sizeTypesDto: SizeTypesDto,
  ): Promise<SizeTypesResDto> {
    return this.sizeTypesService.updateItem(id, sizeTypesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete size successfully',
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
  deleteSize(@Query() { id }: GetAccountDto): Promise<DeleteItemResDto> {
    return this.sizeTypesService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get sizes successfully',
    type: SizeTypesResDto,
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
  getSizes(): Promise<SizeTypesResDto[]> {
    return this.sizeTypesService.findAll();
  }
}
