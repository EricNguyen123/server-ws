import { Test, TestingModule } from '@nestjs/testing';
import { DiscountSettingsService } from './discount-settings.service';

describe('DiscountSettingsService', () => {
  let service: DiscountSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountSettingsService],
    }).compile();

    service = module.get<DiscountSettingsService>(DiscountSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
