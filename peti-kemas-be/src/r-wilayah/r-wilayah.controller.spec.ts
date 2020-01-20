import { Test, TestingModule } from '@nestjs/testing';
import { RWilayahController } from './r-wilayah.controller';

describe('RWilayah Controller', () => {
  let controller: RWilayahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RWilayahController],
    }).compile();

    controller = module.get<RWilayahController>(RWilayahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
