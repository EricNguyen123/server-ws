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
import { ColorTypesService } from './color-types.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { ColorTypesResDto } from 'src/dto/color-types-res.dto';
import { ColorTypesDto } from 'src/dto/color-types.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('colorTypes')
@Controller('color_types')
export class ColorTypesController {
  constructor(private readonly colorTypesService: ColorTypesService) {}

  @ApiResponse({
    status: 201,
    description: 'Post color successfully',
    type: ColorTypesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postColor(@Body() colorTypesDto: ColorTypesDto): Promise<ColorTypesResDto> {
    return this.colorTypesService.createItem(colorTypesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Update color successfully',
    type: ColorTypesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/item')
  updateColor(
    @Query() { id }: GetAccountDto,
    @Body() colorTypesDto: ColorTypesDto,
  ): Promise<ColorTypesResDto> {
    return this.colorTypesService.updateItem(id, colorTypesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete color successfully',
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
  deleteColor(@Query() { id }: GetAccountDto): Promise<DeleteItemResDto> {
    return this.colorTypesService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get colors successfully',
    type: ColorTypesResDto,
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
  getColors(): Promise<ColorTypesResDto[]> {
    return this.colorTypesService.findAll();
  }
}
