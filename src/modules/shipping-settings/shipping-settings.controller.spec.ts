import { Test, TestingModule } from '@nestjs/testing';
import { ShippingSettingsController } from './shipping-settings.controller';
import { ShippingSettingsService } from './shipping-settings.service';

describe('ShippingSettingsController', () => {
  let controller: ShippingSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingSettingsController],
      providers: [ShippingSettingsService],
    }).compile();

    controller = module.get<ShippingSettingsController>(ShippingSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
