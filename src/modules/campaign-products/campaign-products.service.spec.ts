import { Test, TestingModule } from '@nestjs/testing';
import { CampaignProductsService } from './campaign-products.service';

describe('CampaignProductsService', () => {
  let service: CampaignProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignProductsService],
    }).compile();

    service = module.get<CampaignProductsService>(CampaignProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
