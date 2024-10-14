import { Test, TestingModule } from '@nestjs/testing';
import { StorePrefecturesService } from './store-prefectures.service';

describe('StorePrefecturesService', () => {
  let service: StorePrefecturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorePrefecturesService],
    }).compile();

    service = module.get<StorePrefecturesService>(StorePrefecturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
