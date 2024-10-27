import { Test, TestingModule } from '@nestjs/testing';
import { ShippingNoticesController } from './shipping-notices.controller';
import { ShippingNoticesService } from './shipping-notices.service';

describe('ShippingNoticesController', () => {
  let controller: ShippingNoticesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingNoticesController],
      providers: [ShippingNoticesService],
    }).compile();

    controller = module.get<ShippingNoticesController>(ShippingNoticesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
