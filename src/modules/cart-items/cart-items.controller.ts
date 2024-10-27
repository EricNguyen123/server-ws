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
import { CartItemsService } from './cart-items.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { CartItemsResDto } from 'src/dto/cart-items-res.dto';
import { CartItemsDto } from 'src/dto/cart-items.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@ApiBearerAuth()
@ApiTags('cartItems')
@Controller('cart_items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @ApiResponse({
    status: 201,
    description: 'Post cart item successfully',
    type: CartItemsResDto,
  })
  @ApiResponse({
    status: 404,
    description: 'One or both of the provided IDs do not exist',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  postCartItem(@Body() cartItemsDto: CartItemsDto): Promise<CartItemsResDto> {
    return this.cartItemsService.createItem(cartItemsDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update cart item successfully',
    type: CartItemsResDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Delete cart item successfully',
    type: DeleteItemResDto,
  })
  @ApiResponse({
    status: 404,
    description: 'One or both of the provided IDs do not exist',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/item')
  updateCartItem(
    @Query() { id }: GetAccountDto,
    @Body() cartItemsDto: CartItemsDto,
  ): Promise<CartItemsResDto | DeleteItemResDto> {
    return this.cartItemsService.handleItem(id, cartItemsDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete cart item successfully',
    type: DeleteItemResDto,
  })
  @ApiResponse({
    status: 404,
    description: 'One or both of the provided IDs do not exist',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/item')
  deleteCartItem(@Query() { id }: GetAccountDto): Promise<DeleteItemResDto> {
    return this.cartItemsService.deleteItem(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Get cart items successfully',
    type: CartItemsResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'One or both of the provided IDs do not exist',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getCartItems(): Promise<CartItemsResDto[]> {
    return this.cartItemsService.findAll();
  }
}
