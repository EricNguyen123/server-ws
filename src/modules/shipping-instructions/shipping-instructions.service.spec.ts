import { Test, TestingModule } from '@nestjs/testing';
import { ShippingInstructionsService } from './shipping-instructions.service';

describe('ShippingInstructionsService', () => {
  let service: ShippingInstructionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingInstructionsService],
    }).compile();

    service = module.get<ShippingInstructionsService>(ShippingInstructionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
