import {
  InternalServerErrorException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Pendaftaran } from './pendaftaran.entity';
import { CreatePendaftaranDto } from './dto/create-pendaftaran.dto';

@EntityRepository(Pendaftaran)
export class PendaftaranRepository extends Repository<Pendaftaran> {
  private logger = new Logger('Pendaftaran-Repository');

  async createTask(pendaftaranUjianDto: CreatePendaftaranDto): Promise<any> {
    const {
      nik,
      nama_lengkap,
      nama_perusahaan,
      email,
      alamat_lengkap,
      jumlah_peti_kemas,
      nomor_telepon,
      bukti_bayar_dp,
    } = pendaftaranUjianDto;

    const pendaftaran = new Pendaftaran();
    pendaftaran.nik = nik;
    pendaftaran.nama_lengkap = nama_lengkap;
    pendaftaran.nama_perusahaan = nama_perusahaan;
    pendaftaran.alamat_lengkap = alamat_lengkap;
    pendaftaran.email = email;
    pendaftaran.jumlah_peti_kemas = jumlah_peti_kemas;
    pendaftaran.nomor_telepon = nomor_telepon;
    pendaftaran.bukti_bayar_dp = bukti_bayar_dp;

    try {
      await pendaftaran.save();
      this.logger.verbose(`Berhasil membuat pendaftaran`);
    } catch (error) {
      this.logger.verbose(`Error Code: ${error.code} ${error.errno}`);
      if (error.errno === 1062) {
        this.logger.verbose(
          `Gagal membuat pendaftaran, duplicate NIK atau Email`,
        );
        throw new ConflictException({
          code: 409,
          title: 'Duplikasi Data',
          message: 'NIK atau Email sudah terdaftar',
        });
      } else {
        throw new InternalServerErrorException({
          code: 500,
          title: 'Error',
          message: `Error Number: ${error.errno}. Please contact support`,
        });
      }
    }

    /**
     * Tidak perlu mengirimkan semua respon
     */
    delete pendaftaran.id_pendaftaran;
    delete pendaftaran.nomor_telepon;
    delete pendaftaran.alamat_lengkap;
    delete pendaftaran.bukti_bayar_dp;

    return {
      code: 201,
      title: 'Pendaftaran',
      message: 'Anda berhasil mendaftar',
      data: pendaftaran,
    };
  }
}
