import { Test, TestingModule } from '@nestjs/testing';
import { DiscountSettingsController } from './discount-settings.controller';
import { DiscountSettingsService } from './discount-settings.service';

describe('DiscountSettingsController', () => {
  let controller: DiscountSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountSettingsController],
      providers: [DiscountSettingsService],
    }).compile();

    controller = module.get<DiscountSettingsController>(DiscountSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
