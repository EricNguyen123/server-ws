import { Test, TestingModule } from '@nestjs/testing';
import { ProductTypeResourcesController } from './product-type-resources.controller';
import { ProductTypeResourcesService } from './product-type-resources.service';

describe('ProductTypeResourcesController', () => {
  let controller: ProductTypeResourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTypeResourcesController],
      providers: [ProductTypeResourcesService],
    }).compile();

    controller = module.get<ProductTypeResourcesController>(ProductTypeResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
