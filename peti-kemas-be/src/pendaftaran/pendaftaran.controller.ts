import { Controller, Post,Body } from '@nestjs/common';
import { CreatePendaftaranDto } from './dto/create-pendaftaran.dto';
import { Pendaftaran } from './pendaftaran.entity';
import { PendaftaranService } from './pendaftaran.service';


@Controller('pendaftaran')
export class PendaftaranController {
  constructor(private tPendaftaranUjianService: PendaftaranService) {}

  @Post()
  getPendaftaranUjian(
    @Body('type') type: string,
    @Body('search') search: string,
    @Body('page') page: number,
    @Body('amount') amount: number,
    @Body() createPendaftarDto: CreatePendaftaranDto,
  ): Promise<Pendaftaran[]> {
    let query;

    switch (type) {
      case 'create-pendaftaran':
        query = this.tPendaftaranUjianService.createPendaftaran(
          createPendaftarDto,
        );
        break;

      case 'get-page':
        query = this.tPendaftaranUjianService.getPagePendaftaran(
          page,
          amount,
        );
        break;

      case 'get-all':
        query = this.tPendaftaranUjianService.getAllPendaftaran();
        break;

      case 'search':
        query = this.tPendaftaranUjianService.searchPendaftaran(search);
        break;

      default:
        query = 'NOT FOUND';
        break;
    }

    return query;
  }
}