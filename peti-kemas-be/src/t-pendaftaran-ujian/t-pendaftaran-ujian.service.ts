import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { CreateTPendaftaranUjianDto } from './dto/create-t-pendaftaran-ujian.dto';
import { TPendaftaranUjianRepository } from './t-pendaftaran-ujian.repository';
import { TPendaftaranUjian } from './t-pendaftaran-ujian.entity';

@Injectable()
export class TPendaftaranUjianService {
  constructor(
    @InjectRepository(TPendaftaranUjianRepository)
    private pendaftaranUjianRepository: TPendaftaranUjianRepository,
  ) {}

  logger = new Logger('TPendaftaranUjianService');

  async createPendaftarUjian(
    createPendaftarDto: CreateTPendaftaranUjianDto,
  ): Promise<TPendaftaranUjian> {
    const results = await this.pendaftaranUjianRepository.createTask(
      createPendaftarDto,
    );
    this.logger.log(results, 'Error ngga nih');
    return results;
  }

  async searchPendaftaranUjian(search: string): Promise<TPendaftaranUjian[]> {
    const query = await this.pendaftaranUjianRepository.find({
      nik: Like(`%${search}%`),
      email: Like(`%${search}%`),
    });

    if (query.length === 0) {
      throw new NotFoundException(`NIK atau Nama ${search} tidak ditemukan`);
    }

    return query;
  }

  async getPagePendaftaranUjian(
    page: number,
    amount: number,
  ): Promise<TPendaftaranUjian[]> {
    const query = await this.pendaftaranUjianRepository.find({
      select: [
        'id_pendaftaran',
        'nik',
        'email',
        'nomor_ujian',
        'tanggal_ujian_tertulis',
        'tanggal_ujian_kesehatan',
        'status_ujian_tertulis',
        'status_ujian_kesehatan',
        'bukti_bayar_tertulis',
        'bukti_bayar_kesehatan',
      ],
      skip: page * amount - amount,
      take: amount,
    });

    if (query.length === 0) {
      throw new NotFoundException(
        `Kurangi jumlah data yang direquest atau kurangi nomor halaman`,
      );
    }

    return query;
  }

  async getAllPendaftaranUjian(): Promise<any> {
    const query = await this.pendaftaranUjianRepository.find({
      select: [
        'id_pendaftaran',
        'nik',
        'nama_lengkap',
        'email',
        'nomor_ujian',
        'tanggal_ujian_tertulis',
        'tanggal_ujian_kesehatan',
        'status_ujian_tertulis',
        'status_ujian_kesehatan',
        'bukti_bayar_tertulis',
        'bukti_bayar_kesehatan',
      ],
    });

    return {
      code: 200,
      title: 'Data Pendaftar',
      message: 'Data Pendaftar',
      data: query,
    };
  }
}
