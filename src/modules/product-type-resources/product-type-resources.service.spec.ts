import { Test, TestingModule } from '@nestjs/testing';
import { ProductTypeResourcesService } from './product-type-resources.service';

describe('ProductTypeResourcesService', () => {
  let service: ProductTypeResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductTypeResourcesService],
    }).compile();

    service = module.get<ProductTypeResourcesService>(ProductTypeResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
