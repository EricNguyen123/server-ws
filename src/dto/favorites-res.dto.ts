import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProductsResDto } from './products-res.dto';
import { Type } from 'class-transformer';
import { UserResDto } from './user-res.dto';

export class FavoritesResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: ProductsResDto })
  @Type(() => ProductsResDto)
  product: ProductsResDto;

  @ApiProperty({ type: UserResDto })
  @Type(() => UserResDto)
  user: UserResDto;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;
}
