import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Between, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/dto/register.dto';
import { UserResDto } from 'src/dto/user-res.dto';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { SearchDto } from 'src/dto/search.dto';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { Status } from 'src/common/enums/status.enum';
import { getRangeFromYesterdayToNow } from 'src/utils/date.util';
import { StatisticalUsersResDto } from 'src/dto/statistical-users-res.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: UserDto) {
    const user = await this.usersRepository.save(createUserDto);
    const resUser = await this.fillterAttributesUser(user);
    return resUser;
  }

  async registerUser(registerDto: RegisterDto): Promise<UserEntity> {
    const { password, name, email } = registerDto;
    const user = await this.usersRepository.save({
      name: name,
      email: email,
      encrypted_password: bcrypt.hashSync(password, 10),
    });
    if (!user) throw new NotFoundException('User created fail');
    const resUser = await this.fillterAttributesUser(user);
    return resUser;
  }

  async deleteUser(id: string): Promise<DeleteUserResDto> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return {
      id: id,
      status: 200,
      message: 'User deleted successfully',
    };
  }

  async deleteUsers(data: GetAccountDto[]): Promise<DeleteUsersResDto> {
    const ids = data.map((item) => item.id);
    const result = await this.usersRepository.delete(ids);

    if (result.affected === 0) {
      throw new NotFoundException(`No users found for the given IDs`);
    }

    return {
      ids: ids,
      status: 200,
      message: 'Users deleted successfully',
    };
  }

  async updateUser(id: string, data: UserDto): Promise<UserEntity> {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User not found');

    user.name = data.name ? data.name : user.name;
    user.email = data.email ? data.email : user.email;
    user.role = data.role ? data.role : user.role;
    user.status = data.status ? data.status : user.status;
    user.zipcode = data.zipcode ? data.zipcode : user.zipcode;
    user.phone = data.phone ? data.phone : user.phone;
    user.prefecture = data.prefecture ? data.prefecture : user.prefecture;
    user.city = data.city ? data.city : user.city;
    user.street = data.street ? data.street : user.street;
    user.building = data.building ? data.building : user.building;
    user.current_sign_in_at = data.current_sign_in_at
      ? data.current_sign_in_at
      : user.current_sign_in_at;
    user.last_sign_in_at = data.last_sign_in_at
      ? data.last_sign_in_at
      : user.last_sign_in_at;
    user.tokens = data.tokens;

    const userUpdate = await this.usersRepository.save(user);
    const resUser = await this.fillterAttributesUser(userUpdate);
    return resUser;
  }

  async updateName(id: string, newName: string): Promise<UserEntity> {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User not found');

    user.name = newName;
    const userUpdate = await this.usersRepository.save(user);
    const resUser = await this.fillterAttributesUser(userUpdate);
    return resUser;
  }

  async updateEmail(id: string, newEmail: string): Promise<UserEntity> {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User not found');

    user.email = newEmail;
    const userUpdate = await this.usersRepository.save(user);
    const resUser = await this.fillterAttributesUser(userUpdate);
    return resUser;
  }

  async updatePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<UserDto | { status: number; message: string }> {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.encrypted_password,
    );
    if (!isPasswordValid) {
      return { status: 404, message: 'Match failed' };
    }

    const salt = await bcrypt.genSalt();
    user.encrypted_password = await bcrypt.hash(newPassword, salt);

    const userUpdate = await this.usersRepository.save(user);
    const resUser = await this.fillterAttributesUser(userUpdate);
    return resUser;
  }

  async statisticalUsers(): Promise<StatisticalUsersResDto> {
    const totalAllUsers = await this.usersRepository.count();

    const totalUsers = await this.usersRepository.count({
      where: { role: ValidRoles.User },
    });

    const totalEmployees = totalAllUsers - totalUsers;

    const totalUsersNotActive = await this.usersRepository.count({
      where: { status: Status.NotActive },
    });

    const { endOfYesterday, now } = getRangeFromYesterdayToNow();

    const usersVisited = await this.usersRepository.count({
      where: {
        role: ValidRoles.User,
        current_sign_in_at: Between(endOfYesterday, now),
      },
    });

    const usersNewSubscribers = await this.usersRepository.count({
      where: {
        role: ValidRoles.User,
        createdDate: Between(endOfYesterday, now),
      },
    });

    return {
      totalAllUsers,
      totalUsers,
      totalEmployees,
      totalUsersNotActive,
      usersVisited,
      usersNewSubscribers,
    };
  }

  async updateForgotPassword(
    id: string,
    newPassword: string,
  ): Promise<UserDto | { status: number; message: string }> {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User not found');

    const salt = await bcrypt.genSalt();
    user.encrypted_password = await bcrypt.hash(newPassword, salt);

    const userUpdate = await this.usersRepository.save(user);
    const resUser = await this.fillterAttributesUser(userUpdate);
    return resUser;
  }

  async searchUsers(
    searchDto: SearchDto,
  ): Promise<{ users: UserEntity[]; totalUsers: number; currentPage: number }> {
    const { keyword, offset, limit, status } = searchDto;

    const query = this.usersRepository.createQueryBuilder('user');

    if (keyword && keyword.trim() !== '') {
      const likeKeyword = `%${keyword}%`;
      query
        .where('user.name LIKE :keyword COLLATE utf8mb4_general_ci', {
          keyword: likeKeyword,
        })
        .orWhere('user.email LIKE :keyword COLLATE utf8mb4_general_ci', {
          keyword: likeKeyword,
        })
        .orWhere('user.phone LIKE :keyword COLLATE utf8mb4_general_ci', {
          keyword: likeKeyword,
        })
        .orWhere('user.city LIKE :keyword COLLATE utf8mb4_general_ci', {
          keyword: likeKeyword,
        })
        .orWhere('user.prefecture LIKE :keyword COLLATE utf8mb4_general_ci', {
          keyword: likeKeyword,
        })
        .orWhere('user.street LIKE :keyword COLLATE utf8mb4_general_ci', {
          keyword: likeKeyword,
        })
        .orWhere('user.building LIKE :keyword COLLATE utf8mb4_general_ci', {
          keyword: likeKeyword,
        })
        .orWhere('user.zipcode LIKE :keyword COLLATE utf8mb4_general_ci', {
          keyword: likeKeyword,
        });
    }

    if (Object.values(Status).includes(Number(status))) {
      query.where('user.status = :status', { status });
    }

    query.skip(offset).take(limit);

    query.select([
      'user.id',
      'user.name',
      'user.email',
      'user.role',
      'user.status',
      'user.zipcode',
      'user.phone',
      'user.prefecture',
      'user.city',
      'user.street',
      'user.building',
      'user.current_sign_in_at',
      'user.last_sign_in_at',
      'user.createdDate',
      'user.updatedDate',
    ]);

    const totalUsers = await query.getCount();
    const users = await query.getMany();
    const currentPage = Math.ceil(offset / limit) + 1;

    return { users, totalUsers, currentPage };
  }

  async findAll(): Promise<UserResDto[]> {
    return await this.usersRepository.find({
      select: [
        'id',
        'name',
        'email',
        'role',
        'status',
        'zipcode',
        'phone',
        'prefecture',
        'city',
        'street',
        'building',
        'current_sign_in_at',
        'last_sign_in_at',
        'createdDate',
        'updatedDate',
      ],
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });

      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return undefined;
    }
  }

  async findOneByUser(id: string): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.findOneOrFail({ where: { id } });
      const resUser = await this.fillterAttributesUser(user);
      return resUser;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findOneById(id: string): Promise<UserEntity> {
    try {
      return await this.usersRepository.findOneOrFail({ where: { id } });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findOneByTokens(tokens: string): Promise<UserEntity | undefined> {
    try {
      return await this.usersRepository.findOneOrFail({ where: { tokens } });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return undefined;
    }
  }

  async fillterAttributesUser(user: UserEntity) {
    delete user.encrypted_password;
    delete user.provider;
    delete user.uid;
    delete user.tokens;
    return user;
  }
}
