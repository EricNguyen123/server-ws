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
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/user.entity';
import { UserDto } from 'src/dto/user.dto';
import { RegisterDto } from 'src/dto/register.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResDto } from 'src/dto/user-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { PostNameDto } from 'src/dto/post-name.dto';
import { PostEmailDto } from 'src/dto/post-email.dto';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { UsersPaginationResDto } from 'src/dto/users-pagination-res.dto';
import { SearchDto } from 'src/dto/search.dto';
import { StatisticalUsersResDto } from 'src/dto/statistical-users-res.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiResponse({
    status: 201,
    description: 'Get all users successfully',
    type: UserResDto,
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
  getUsers(): Promise<UserResDto[]> {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Get users successfully',
    type: UsersPaginationResDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('search')
  searchUsers(@Query() searchDto: SearchDto): Promise<UsersPaginationResDto> {
    return this.usersService.searchUsers(searchDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Get account successfully',
    type: UserResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('account')
  getUser(@Query() { id }: GetAccountDto): Promise<UserResDto> {
    return this.usersService.findOneByUser(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Update name successfully',
    type: UserResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/username')
  updateUsername(
    @Query() { id }: GetAccountDto,
    @Body() dataDto: PostNameDto,
  ): Promise<UserResDto> {
    return this.usersService.updateName(id, dataDto.name);
  }

  @ApiResponse({
    status: 201,
    description: 'Update email successfully',
    type: UserResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/email')
  updateEmail(
    @Query() { id }: GetAccountDto,
    @Body() dataDto: PostEmailDto,
  ): Promise<UserEntity> {
    return this.usersService.updateEmail(id, dataDto.email);
  }

  @ApiResponse({
    status: 201,
    description: 'Update user successfully',
    type: UserResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor, ValidRoles.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/account')
  updateUser(
    @Query() { id }: GetAccountDto,
    @Body() data: UserDto,
  ): Promise<UserResDto> {
    return this.usersService.updateUser(id, data);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete user successfully',
    type: DeleteUserResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/item')
  deleteUser(@Query() { id }: GetAccountDto): Promise<DeleteUserResDto> {
    return this.usersService.deleteUser(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete user successfully',
    type: DeleteUsersResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/items')
  deleteUsers(@Body() dataDto: GetAccountDto[]): Promise<DeleteUsersResDto> {
    return this.usersService.deleteUsers(dataDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Register user successfully',
    type: UserResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('register/user')
  async registerUser(@Body() registerDto: RegisterDto): Promise<UserResDto> {
    return await this.usersService.registerUser(registerDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Get Statistical user successfully',
    type: StatisticalUsersResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('statistical_users')
  async getStatisticalUsers(): Promise<StatisticalUsersResDto> {
    return await this.usersService.statisticalUsers();
  }
}
