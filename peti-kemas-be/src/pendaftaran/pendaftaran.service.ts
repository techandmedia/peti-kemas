import { CreatePendaftaranDto } from './dto/create-pendaftaran.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { Pendaftaran } from './pendaftaran.entity';
import { PendaftaranRepository } from './pendaftaran.repository';

@Injectable()
export class PendaftaranService {
  constructor(
    @InjectRepository(PendaftaranRepository)
    private pendaftaranRepository: PendaftaranRepository,
  ) {}

  logger = new Logger('Pendaftaran Service');

  async createPendaftaran(
    createPendaftaranDto: CreatePendaftaranDto,
  ): Promise<Pendaftaran> {
    const result = await this.pendaftaranRepository.createTask(
      createPendaftaranDto,
    );
    return result;
  }

  async searchPendaftaran(search: string): Promise<any> {
    const query = await this.pendaftaranRepository.find({
      nik: Like(`%${search}%`),
      email: Like(`%${search}%`),
    });

    if (query.length === 0) {
      throw new NotFoundException(`NIK atau Nama ${search} tidak ditemukan`);
    }

    return {
      code: 200,
      title: 'Data Pendaftar',
      message: 'Data Pendaftar',
      data: query,
    };
  }

  async getPagePendaftaran(page: number, amount: number): Promise<any> {
    const query = await this.pendaftaranRepository.find({
      select: ['nik', 'email', 'nama_lengkap', 'bukti_bayar_dp'],
      skip: page * amount - amount,
      take: amount,
    });

    if (query.length === 0) {
      throw new NotFoundException(
        `Kurangi jumlah data yang direquest atau kurangi nomor halaman`,
      );
    }

    return {
      code: 200,
      title: 'Data Pendaftar',
      message: 'Data Pendaftar',
      data: query,
    };
  }

  async getAllPendaftaran(): Promise<any> {
    const query = await this.pendaftaranRepository.find({
      select: [
        'id_pendaftaran',
        'nomor_antrian',
        'nik',
        'nama_lengkap',
        'nama_perusahaan',
        'alamat_lengkap',
        'nomor_telepon',
        'email',
        'jumlah_peti_kemas',
        'status_perbaikan',
        'created_at',
        'updated_at',
        'bukti_bayar_dp',
        'bukti_bayar_pelunasan',
      ],
      order: { updated_at: 'DESC' },
    });

    return {
      code: 200,
      title: 'Data Pendaftar',
      message: 'Data Pendaftar',
      data: query,
    };
  }
}
