import { Test, TestingModule } from '@nestjs/testing';
import { BillItemsController } from './bill-items.controller';
import { BillItemsService } from './bill-items.service';

describe('BillItemsController', () => {
  let controller: BillItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillItemsController],
      providers: [BillItemsService],
    }).compile();

    controller = module.get<BillItemsController>(BillItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
