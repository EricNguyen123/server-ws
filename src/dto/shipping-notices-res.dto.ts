import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ShippingCompaniesResDto } from './shipping-companies-res.dto';

export class ShippingNoticesResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: 'varchar', maxLength: 255 })
  document_number: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  memo: string;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;

  @ApiProperty({ type: () => ShippingCompaniesResDto })
  @Type(() => ShippingCompaniesResDto)
  shippingCompanies?: ShippingCompaniesResDto;
}
