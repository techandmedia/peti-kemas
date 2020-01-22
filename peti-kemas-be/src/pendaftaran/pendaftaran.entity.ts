import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
} from 'typeorm';
import { StatusPerbaikan } from './enum/status-perbaikan.enum';

@Entity()
export class Pendaftaran extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_pendaftaran: number;

  @Column()
  nik: string;

  @Column()
  nama_lengkap: string;

  @Column()
  nama_perusahaan: string;

  @Column()
  alamat_lengkap: string;

  @Column()
  nomor_telepon: string;

  @Column()
  email: string;

  @Column()
  jumlah_peti_kemas: number;

  @Column()
  nomor_antrian: string;

  @Column()
  bukti_bayar_dp: string;

  @Column()
  status_perbaikan: StatusPerbaikan;

  @Column()
  bukti_bayar_pelunasan: string;

  @Column('timestamp', {
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  created_at: Date;

  @Column('timestamp', {
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP(0)',
  })
  updated_at: Date;
}
