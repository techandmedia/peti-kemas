import { Controller, Post, Body } from '@nestjs/common';
import { RWilayahService } from './r-wilayah.service';
import { RWilayah } from './r-wilayah.entity';

@Controller('wilayah')
export class RWilayahController {
  constructor(private wilayahService: RWilayahService) {}

  @Post()
  getWilayah(
    @Body('type') type: string,
    @Body('search') search: string,
    @Body('page') page: number,
    @Body('amount') amount: number,
  ): Promise<RWilayah[]> {
    let query;

    switch (type) {
      case 'get-page':
        query = this.wilayahService.getWilayah(page, amount);
        break;

      case 'get-all':
        query = this.wilayahService.getAllWilayah();
        break;

      case 'search':
        query = this.wilayahService.searchWilayah(search);
        break;

      default:
        query = 'NOT FOUND';
        break;
    }

    return query;
  }
}
