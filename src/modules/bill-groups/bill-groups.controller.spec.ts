import { Test, TestingModule } from '@nestjs/testing';
import { BillGroupsController } from './bill-groups.controller';
import { BillGroupsService } from './bill-groups.service';

describe('BillGroupsController', () => {
  let controller: BillGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillGroupsController],
      providers: [BillGroupsService],
    }).compile();

    controller = module.get<BillGroupsController>(BillGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
