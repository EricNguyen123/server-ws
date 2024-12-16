// dto/search-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class SearchDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset: number = 0;

  @ApiProperty()
  status?: Status;
}
