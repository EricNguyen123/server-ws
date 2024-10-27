import { Controller } from '@nestjs/common';
import { BillItemsService } from './bill-items.service';

@Controller('bill-items')
export class BillItemsController {
  constructor(private readonly billItemsService: BillItemsService) {}
}
