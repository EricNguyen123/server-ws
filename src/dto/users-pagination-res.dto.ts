import { ApiProperty } from '@nestjs/swagger';
import { UserResDto } from './user-res.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UsersPaginationResDto {
  @ApiProperty({ type: [UserResDto] })
  @ValidateNested({ each: true })
  @Type(() => UserResDto)
  users: UserResDto[];

  @ApiProperty()
  totalUsers: number;

  @ApiProperty()
  currentPage: number;
}
