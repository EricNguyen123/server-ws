import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty({ type: String })
  token: string;
}
