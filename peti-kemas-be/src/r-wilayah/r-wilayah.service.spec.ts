import { Test, TestingModule } from '@nestjs/testing';
import { RWilayahService } from './r-wilayah.service';

describe('RWilayahService', () => {
  let service: RWilayahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RWilayahService],
    }).compile();

    service = module.get<RWilayahService>(RWilayahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
