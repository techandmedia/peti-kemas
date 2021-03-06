import { CreatePendaftaranDto } from './dto/create-pendaftaran.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, createQueryBuilder } from 'typeorm';
import { Pendaftaran } from './pendaftaran.entity';
import { PendaftaranRepository } from './pendaftaran.repository';

@Injectable()
export class PendaftaranService {
  constructor(
    @InjectRepository(PendaftaranRepository)
    private pendaftaranRepository: PendaftaranRepository,
  ) {}

  logger = new Logger('Pendaftaran Service');

  async getAntrianByEmail(email): Promise<Pendaftaran> {
    const found = await this.pendaftaranRepository.findOne({
      where: { email },
    });

    console.log('FOUND', found);

    if (!found) {
      throw new NotFoundException(
        `Antrian dengan email "${email}" belum terdaftar`,
      );
    }

    return found;
  }

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
        'jumlah_dp',
        'jumlah_sisa',
        'jumlah_total',
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

  async updatePendaftaran(
    updatePendaftaranDto: CreatePendaftaranDto,
  ): Promise<any> {
    const {
      email,
      nomor_antrian,
      status_perbaikan,
      jumlah_sisa,
      jumlah_total,
    } = updatePendaftaranDto;
    const pendaftar = await this.getAntrianByEmail(email);
    pendaftar.nomor_antrian = nomor_antrian;
    pendaftar.status_perbaikan = status_perbaikan;
    pendaftar.jumlah_sisa = jumlah_sisa;
    pendaftar.jumlah_total = jumlah_total;
    await pendaftar.save();
    return {
      code: 201,
      title: 'Update Pendaftar',
      message: 'Berhasil memberikan nomor antrian',
      data: pendaftar,
    };
  }

  async getNumberOfCustomer() {
    const results = this.pendaftaranRepository
      .createQueryBuilder('pendaftaran')
      .distinctOn(['pendaftaran.nama_perusahaan']);

    console.log('RESULTS', results);
  }
}
