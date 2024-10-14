import { Test, TestingModule } from '@nestjs/testing';
import { ShippingSettingsService } from './shipping-settings.service';

describe('ShippingSettingsService', () => {
  let service: ShippingSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingSettingsService],
    }).compile();

    service = module.get<ShippingSettingsService>(ShippingSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
