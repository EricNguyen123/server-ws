import { UserResDto } from './user-res.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiProperty({ type: UserResDto })
  user: UserResDto;

  @ApiProperty({ type: String, description: 'JWT authentication token' })
  token: string;
}
