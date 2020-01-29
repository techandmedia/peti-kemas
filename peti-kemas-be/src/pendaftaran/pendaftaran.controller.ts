import { Controller, Post, Body } from '@nestjs/common';
import { CreatePendaftaranDto } from './dto/create-pendaftaran.dto';
import { Pendaftaran } from './pendaftaran.entity';
import { PendaftaranService } from './pendaftaran.service';

@Controller('pendaftaran')
export class PendaftaranController {
  constructor(private pendaftaran: PendaftaranService) {}

  @Post()
  getPendaftaran(
    @Body('type') type: string,
    @Body('search') search: string,
    @Body('page') page: number,
    @Body('amount') amount: number,
    @Body() createPendaftarDto: CreatePendaftaranDto,
  ): Promise<Pendaftaran[]> {
    let query;

    switch (type) {
      case 'create-pendaftaran':
        query = this.pendaftaran.createPendaftaran(createPendaftarDto);
        break;

      case 'update-pendaftaran':
        query = this.pendaftaran.updatePendaftaran(createPendaftarDto);
        break;

      case 'get-page':
        query = this.pendaftaran.getPagePendaftaran(page, amount);
        break;

      case 'get-all':
        query = this.pendaftaran.getAllPendaftaran();
        break;

      case 'search':
        query = this.pendaftaran.searchPendaftaran(search);
        break;

      default:
        query = 'NOT FOUND';
        break;
    }

    return query;
  }
}
