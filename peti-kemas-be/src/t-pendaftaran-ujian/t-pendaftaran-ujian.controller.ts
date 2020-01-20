import { Controller, Post, Body } from '@nestjs/common';
import { CreateTPendaftaranUjianDto } from './dto/create-t-pendaftaran-ujian.dto';
import { TPendaftaranUjianService } from './t-pendaftaran-ujian.service';
import { TPendaftaranUjian } from './t-pendaftaran-ujian.entity';

@Controller('pendaftaran-ujian')
export class TPendaftaranUjianController {
  constructor(private tPendaftaranUjianService: TPendaftaranUjianService) {}

  @Post()
  getPendaftaranUjian(
    @Body('type') type: string,
    @Body('search') search: string,
    @Body('page') page: number,
    @Body('amount') amount: number,
    @Body() createPendaftarDto: CreateTPendaftaranUjianDto,
  ): Promise<TPendaftaranUjian[]> {
    let query;

    switch (type) {
      case 'create-pendaftaran':
        query = this.tPendaftaranUjianService.createPendaftarUjian(
          createPendaftarDto,
        );
        break;

      case 'get-page':
        query = this.tPendaftaranUjianService.getPagePendaftaranUjian(
          page,
          amount,
        );
        break;

      case 'get-all':
        query = this.tPendaftaranUjianService.getAllPendaftaranUjian();
        break;

      case 'search':
        query = this.tPendaftaranUjianService.searchPendaftaranUjian(search);
        break;

      default:
        query = 'NOT FOUND';
        break;
    }

    return query;
  }
}
