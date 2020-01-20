import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StatusUjian } from './enum/status-ujian.enum';

@Entity()
export class TPendaftaranUjian extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_pendaftaran: number;

  @Column()
  nik: string;

  @Column()
  email: string;

  @Column()
  nama_lengkap: string;

  @Column()
  tempat_lahir: string;

  @Column()
  tanggal_lahir: Date;

  @Column()
  alamat_lengkap: string;

  @Column()
  nomor_hp: string;

  @Column()
  warga_negara: number;

  @Column()
  tinggi_badan: number;

  @Column()
  berat_badan: number;

  @Column()
  asal_sekolah: string;

  @Column()
  tanggal_ujian_tertulis: Date;

  @Column()
  tanggal_ujian_kesehatan: Date;

  @Column()
  nomor_ujian: string;

  @Column()
  status_ujian_tertulis: StatusUjian;

  @Column()
  status_ujian_kesehatan: StatusUjian;

  @Column()
  bukti_bayar_tertulis: string;

  @Column()
  bukti_bayar_kesehatan: string;
}
