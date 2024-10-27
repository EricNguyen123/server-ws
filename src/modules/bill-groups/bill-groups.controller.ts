import { Controller } from '@nestjs/common';
import { BillGroupsService } from './bill-groups.service';

@Controller('bill-groups')
export class BillGroupsController {
  constructor(private readonly billGroupsService: BillGroupsService) {}
}
