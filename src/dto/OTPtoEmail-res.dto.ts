import { ApiProperty } from '@nestjs/swagger';

export class OTPtoEmailResDto {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  timeOut: number | undefined;

  @ApiProperty()
  timeLine: number | undefined;
}
