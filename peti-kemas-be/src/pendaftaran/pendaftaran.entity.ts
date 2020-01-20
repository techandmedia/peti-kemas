import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pendaftaran extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_pendaftaran: number;

  @Column()
  nik: string;

  @Column()
  email: string;

  @Column()
  nama_lengkap: string;

  @Column()
  alamat_lengkap: string;

  @Column()
  nomor_hp: string;

  @Column()
  bukti_bayar_dp: string;

  @Column()
  bukti_bayar_pelunasan: string;
}
