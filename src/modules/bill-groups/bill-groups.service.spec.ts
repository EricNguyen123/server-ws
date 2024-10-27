import { Test, TestingModule } from '@nestjs/testing';
import { BillGroupsService } from './bill-groups.service';

describe('BillGroupsService', () => {
  let service: BillGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillGroupsService],
    }).compile();

    service = module.get<BillGroupsService>(BillGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
