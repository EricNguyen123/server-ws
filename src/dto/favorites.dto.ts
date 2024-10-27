import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class FavoritesDto {
  @ApiProperty({ description: 'product id' })
  @IsString()
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'user id' })
  @IsString()
  @IsUUID()
  userId: string;
}
