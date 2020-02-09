import { IsNotEmpty } from 'class-validator';
export class CreatePendaftaranDto {
  @IsNotEmpty()
  nik: string;

  @IsNotEmpty()
  nama_lengkap: string;

  @IsNotEmpty()
  alamat_lengkap: string;

  @IsNotEmpty()
  nomor_telepon: string;

  @IsNotEmpty()
  jumlah_peti_kemas: number;

  @IsNotEmpty()
  bukti_bayar_dp: string;

  jumlah_dp: number;
  nomor_antrian: string;
  nama_perusahaan: string;
  email: string;
  status_perbaikan: string;
  jumlah_sisa: number;
  jumlah_total: number;
}
