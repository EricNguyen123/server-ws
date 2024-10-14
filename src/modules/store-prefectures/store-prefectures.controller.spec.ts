import { Test, TestingModule } from '@nestjs/testing';
import { StorePrefecturesController } from './store-prefectures.controller';
import { StorePrefecturesService } from './store-prefectures.service';

describe('StorePrefecturesController', () => {
  let controller: StorePrefecturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorePrefecturesController],
      providers: [StorePrefecturesService],
    }).compile();

    controller = module.get<StorePrefecturesController>(StorePrefecturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
