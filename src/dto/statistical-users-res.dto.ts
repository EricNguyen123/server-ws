import { ApiProperty } from '@nestjs/swagger';

export class StatisticalUsersResDto {
  @ApiProperty()
  totalAllUsers: number;

  @ApiProperty()
  totalUsers: number;

  @ApiProperty()
  totalEmployees: number;

  @ApiProperty()
  totalUsersNotActive: number;

  @ApiProperty()
  usersVisited: number;

  @ApiProperty()
  usersNewSubscribers: number;
}
