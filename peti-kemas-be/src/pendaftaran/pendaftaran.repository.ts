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
      email,
      nama_lengkap,
      alamat_lengkap,
      nomor_hp,
      bukti_bayar_dp,
    } = pendaftaranUjianDto;

    const pendaftaran = new Pendaftaran();
    pendaftaran.nik = nik;
    pendaftaran.email = email;
    pendaftaran.nama_lengkap = nama_lengkap;
    pendaftaran.alamat_lengkap = alamat_lengkap;
    pendaftaran.nomor_hp = nomor_hp;
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
