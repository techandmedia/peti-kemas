import { Controller, Post, ParseIntPipe, Body } from '@nestjs/common';
import { RAsalsekolahService } from './r-asalsekolah.service';
import { RAsalsekolah } from './r-asalsekolah.entity';

@Controller('asal-sekolah')
export class RAsalsekolahController {
  constructor(private asalSekolahService: RAsalsekolahService) {}

  @Post()
  getAsalSekolah(
    @Body('type') type: string,
    @Body('search') search: string,
    @Body('page') page: number,
    @Body('amount') amount: number,
  ): Promise<RAsalsekolah[]> {
    let query;

    switch (type) {
      case 'get-page':
        query = this.asalSekolahService.getPageAsalSekolah(page, amount);
        break;

      case 'get-all':
        query = this.asalSekolahService.getAllAsalSekolah();
        break;

      case 'search':
        query = this.asalSekolahService.searchAsalSekolah(search);
        break;

      default:
        query = 'NOT FOUND';
        break;
    }

    return query;
  }
}
