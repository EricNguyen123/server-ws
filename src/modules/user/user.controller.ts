import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
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
  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers(): Promise<UserResDto[]> {
    return this.usersService.findAll();
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
  @Get('account')
  @UseGuards(JwtAuthGuard)
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
  @Post('update/username')
  @UseGuards(JwtAuthGuard)
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
  @Post('update/email')
  @UseGuards(JwtAuthGuard)
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
  @Post('update/user')
  @UseGuards(JwtAuthGuard)
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
  @Delete('delete/user')
  @UseGuards(JwtAuthGuard)
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
  @Delete('delete/users')
  @UseGuards(JwtAuthGuard)
  deleteUsers(@Body() dataDto: GetAccountDto[]): Promise<DeleteUsersResDto> {
    return this.usersService.deleteUsers(dataDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete user successfully',
    type: UserResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @Post('register/user')
  @UseGuards(JwtAuthGuard)
  async registerUser(@Body() registerDto: RegisterDto): Promise<UserResDto> {
    return await this.usersService.registerUser(registerDto);
  }
}
