import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { FavoritesResDto } from 'src/dto/favorites-res.dto';
import { FavoritesDto } from 'src/dto/favorites.dto';

@ApiBearerAuth()
@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiResponse({
    status: 201,
    description: 'Post Favorites successfully',
    type: FavoritesResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postFavorites(@Body() favoritesDto: FavoritesDto): Promise<FavoritesResDto> {
    return this.favoritesService.createItem(favoritesDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete Favorites successfully',
    type: DeleteItemResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/item')
  deleteFavorites(@Query() { id }: GetAccountDto): Promise<DeleteItemResDto> {
    return this.favoritesService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get Favorites successfully',
    schema: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: { $ref: getSchemaPath(FavoritesResDto) },
      },
      example: {
        productId1: [{}, {}],
        productId2: [{}],
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getFavorites(): Promise<{
    [productId: string]: FavoritesResDto[];
  }> {
    return this.favoritesService.findAll();
  }
}
