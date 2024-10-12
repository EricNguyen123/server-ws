import { Test, TestingModule } from '@nestjs/testing';
import { ProductResourcesController } from './product-resources.controller';
import { ProductResourcesService } from './product-resources.service';

describe('ProductResourcesController', () => {
  let controller: ProductResourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductResourcesController],
      providers: [ProductResourcesService],
    }).compile();

    controller = module.get<ProductResourcesController>(ProductResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
