import { Controller } from '@nestjs/common';
import { ShippingNoticesService } from './shipping-notices.service';

@Controller('shipping-notices')
export class ShippingNoticesController {
  constructor(
    private readonly shippingNoticesService: ShippingNoticesService,
  ) {}
}
