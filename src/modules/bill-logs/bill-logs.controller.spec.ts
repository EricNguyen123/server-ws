import { Test, TestingModule } from '@nestjs/testing';
import { BillLogsController } from './bill-logs.controller';
import { BillLogsService } from './bill-logs.service';

describe('BillLogsController', () => {
  let controller: BillLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillLogsController],
      providers: [BillLogsService],
    }).compile();

    controller = module.get<BillLogsController>(BillLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
