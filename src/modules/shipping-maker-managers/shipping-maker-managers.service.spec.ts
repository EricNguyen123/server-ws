import { Test, TestingModule } from '@nestjs/testing';
import { ShippingMakerManagersService } from './shipping-maker-managers.service';

describe('ShippingMakerManagersService', () => {
  let service: ShippingMakerManagersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingMakerManagersService],
    }).compile();

    service = module.get<ShippingMakerManagersService>(ShippingMakerManagersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
