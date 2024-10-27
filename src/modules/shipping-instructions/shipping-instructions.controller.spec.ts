import { Test, TestingModule } from '@nestjs/testing';
import { ShippingInstructionsController } from './shipping-instructions.controller';
import { ShippingInstructionsService } from './shipping-instructions.service';

describe('ShippingInstructionsController', () => {
  let controller: ShippingInstructionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingInstructionsController],
      providers: [ShippingInstructionsService],
    }).compile();

    controller = module.get<ShippingInstructionsController>(ShippingInstructionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
