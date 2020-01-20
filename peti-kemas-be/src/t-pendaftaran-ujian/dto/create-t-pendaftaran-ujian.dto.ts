export class CreateTPendaftaranUjianDto {
  nik: string;
  email: string;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: Date;
  alamat_lengkap: string;
  nomor_hp: string;
  warga_negara: number;
  tinggi_badan: number;
  berat_badan: number;
  asal_sekolah: string;
  tanggal_ujian_tertulis: Date;
  tanggal_ujian_kesehatan: Date;
  nomor_ujian: string;
  status_ujian_tertulis: string;
  status_ujian_kesehatan: string;
  bukti_bayar_tertulis: string;
  bukti_bayar_kesehatan: string;
}
