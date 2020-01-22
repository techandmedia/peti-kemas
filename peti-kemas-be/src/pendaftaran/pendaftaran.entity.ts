import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  bukti_bayar_dp: string;

  @Column()
  bukti_bayar_pelunasan: string;
}
