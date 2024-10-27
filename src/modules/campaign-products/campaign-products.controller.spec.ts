import { Test, TestingModule } from '@nestjs/testing';
import { CampaignProductsController } from './campaign-products.controller';
import { CampaignProductsService } from './campaign-products.service';

describe('CampaignProductsController', () => {
  let controller: CampaignProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignProductsController],
      providers: [CampaignProductsService],
    }).compile();

    controller = module.get<CampaignProductsController>(CampaignProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
