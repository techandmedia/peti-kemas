import {
  InternalServerErrorException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTPendaftaranUjianDto } from './dto/create-t-pendaftaran-ujian.dto';
import { TPendaftaranUjian } from './t-pendaftaran-ujian.entity';
import { StatusUjian } from './enum/status-ujian.enum';

@EntityRepository(TPendaftaranUjian)
export class TPendaftaranUjianRepository extends Repository<TPendaftaranUjian> {
  private logger = new Logger('PendaftaranUjianRepository');

  async createTask(
    pendaftaranUjianDto: CreateTPendaftaranUjianDto,
  ): Promise<any> {
    const {
      nik,
      email,
      nama_lengkap,
      tempat_lahir,
      tanggal_lahir,
      alamat_lengkap,
      warga_negara,
      nomor_hp,
      tinggi_badan,
      berat_badan,
      asal_sekolah,
      bukti_bayar_tertulis,
    } = pendaftaranUjianDto;

    const pendaftaran = new TPendaftaranUjian();
    pendaftaran.nik = nik;
    pendaftaran.email = email;
    pendaftaran.nama_lengkap = nama_lengkap;
    pendaftaran.tempat_lahir = tempat_lahir;
    pendaftaran.tanggal_lahir = tanggal_lahir;
    pendaftaran.alamat_lengkap = alamat_lengkap;
    pendaftaran.warga_negara = warga_negara;
    pendaftaran.tinggi_badan = tinggi_badan;
    pendaftaran.berat_badan = berat_badan;
    pendaftaran.asal_sekolah = asal_sekolah;
    pendaftaran.nomor_hp = nomor_hp;
    pendaftaran.status_ujian_tertulis = StatusUjian.TIDAK_TERDAFTAR;
    pendaftaran.status_ujian_kesehatan = StatusUjian.TIDAK_TERDAFTAR;
    pendaftaran.bukti_bayar_tertulis = bukti_bayar_tertulis;

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
    delete pendaftaran.tempat_lahir;
    delete pendaftaran.tanggal_lahir;
    delete pendaftaran.alamat_lengkap;
    delete pendaftaran.warga_negara;
    delete pendaftaran.tinggi_badan;
    delete pendaftaran.berat_badan;
    delete pendaftaran.asal_sekolah;
    delete pendaftaran.tanggal_ujian_tertulis;
    delete pendaftaran.tanggal_ujian_kesehatan;
    delete pendaftaran.nomor_ujian;
    delete pendaftaran.status_ujian_tertulis;
    delete pendaftaran.status_ujian_kesehatan;
    delete pendaftaran.bukti_bayar_tertulis;

    return {
      code: 201,
      title: 'Pendaftaran',
      message: 'Anda berhasil mendaftar',
      data: pendaftaran,
    };
  }
}
