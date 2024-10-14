import { Test, TestingModule } from '@nestjs/testing';
import { PrefecturesController } from './prefectures.controller';
import { PrefecturesService } from './prefectures.service';

describe('PrefecturesController', () => {
  let controller: PrefecturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrefecturesController],
      providers: [PrefecturesService],
    }).compile();

    controller = module.get<PrefecturesController>(PrefecturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
