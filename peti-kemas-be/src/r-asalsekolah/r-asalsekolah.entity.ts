import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class RAsalsekolah extends BaseEntity {
  @PrimaryColumn()
  SekolahID: string;

  @Column()
  Nama: string;

  @Column()
  Alamat1: string;

  @Column()
  Alamat2: string;

  @Column()
  Kota: string;

  @Column()
  KodePos: string;

  @Column()
  JenisSekolahID: string;

  @Column()
  Telephone: string;

  @Column()
  Fax: string;

  @Column()
  Website: string;

  @Column()
  Email: string;

  @Column()
  Kontak: string;

  @Column()
  JabatanKontak: string;

  @Column()
  HandphoneKontak: string;

  @Column()
  EmailKontak: string;
}
