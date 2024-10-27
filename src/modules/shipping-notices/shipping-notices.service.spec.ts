import { Test, TestingModule } from '@nestjs/testing';
import { ShippingNoticesService } from './shipping-notices.service';

describe('ShippingNoticesService', () => {
  let service: ShippingNoticesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingNoticesService],
    }).compile();

    service = module.get<ShippingNoticesService>(ShippingNoticesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
