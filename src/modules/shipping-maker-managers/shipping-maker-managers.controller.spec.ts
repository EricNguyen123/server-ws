import { Test, TestingModule } from '@nestjs/testing';
import { ShippingMakerManagersController } from './shipping-maker-managers.controller';
import { ShippingMakerManagersService } from './shipping-maker-managers.service';

describe('ShippingMakerManagersController', () => {
  let controller: ShippingMakerManagersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingMakerManagersController],
      providers: [ShippingMakerManagersService],
    }).compile();

    controller = module.get<ShippingMakerManagersController>(ShippingMakerManagersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
