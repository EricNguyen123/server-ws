import { ApiProperty } from '@nestjs/swagger';
import { UserResDto } from './user-res.dto';

export class VerifyMailResDto {
  @ApiProperty({ type: UserResDto })
  user?: UserResDto;

  @ApiProperty()
  status?: number;

  @ApiProperty({ type: String })
  message?: string;

  @ApiProperty()
  success?: boolean;
}
