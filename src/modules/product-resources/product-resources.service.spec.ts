import { Test, TestingModule } from '@nestjs/testing';
import { ProductResourcesService } from './product-resources.service';

describe('ProductResourcesService', () => {
  let service: ProductResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductResourcesService],
    }).compile();

    service = module.get<ProductResourcesService>(ProductResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
