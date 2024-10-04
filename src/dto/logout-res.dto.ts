import { ApiProperty } from '@nestjs/swagger';

export class LogoutResDto {
  @ApiProperty()
  status: number;

  @ApiProperty({ type: String })
  message: string;
}
