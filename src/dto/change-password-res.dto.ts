import { ApiProperty } from '@nestjs/swagger';
import { UserResDto } from './user-res.dto';

export class ChangePasswordResDto {
  @ApiProperty({ type: UserResDto })
  user?: UserResDto;

  @ApiProperty()
  status?: number;

  @ApiProperty()
  message?: string;
}
