import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTiniesService } from './category-tinies.service';

describe('CategoryTiniesService', () => {
  let service: CategoryTiniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryTiniesService],
    }).compile();

    service = module.get<CategoryTiniesService>(CategoryTiniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
