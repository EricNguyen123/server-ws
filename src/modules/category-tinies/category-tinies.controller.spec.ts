import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTiniesController } from './category-tinies.controller';
import { CategoryTiniesService } from './category-tinies.service';

describe('CategoryTiniesController', () => {
  let controller: CategoryTiniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryTiniesController],
      providers: [CategoryTiniesService],
    }).compile();

    controller = module.get<CategoryTiniesController>(CategoryTiniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
