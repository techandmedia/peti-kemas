import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RWilayahController } from './r-wilayah.controller';
import { RWilayahService } from './r-wilayah.service';
import { RWilayahRepository } from './r-wilayah.repository';

/**
 * Penting!!
 * Sewaktu membuat modul baru, pastikan nama modul nya sesuai dengan nama tabelnya
 * Jika nama tabel nya adalah r_wilayah
 * Maka perintah membuat module nya adalah nest g module r_wilayah
 * Nest akan membuat folder dan nama file menjadi r-wilayah, abaikan!
 * Pada controller, ubah route URL sesuai keinginan
 * Misalnya menjadi 'wilayah'
 *
 * UPDATE:
 * Format Nest dalam membaca tabel di database adalah sebagai berikut
 * jika tabel nya memiliki nama r_asalsekolah
 * Maka class entity nya harus diberi nama RAsalsekolah
 * Setiap huruf besar adalah 'pemisah', jika nama entity nya adalah RAsalSekolah
 * Maka nama tabel nya harus r_asal_sekolah
 */

@Module({
  imports: [TypeOrmModule.forFeature([RWilayahRepository])],
  controllers: [RWilayahController],
  providers: [RWilayahService],
})
export class RWilayahModule {}
