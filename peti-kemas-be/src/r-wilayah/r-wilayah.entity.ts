import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class RWilayah extends BaseEntity {
  @PrimaryColumn()
  id_wil: string;

  @Column()
  nm_wil: string;

  @Column()
  id_induk_wilayah: string;

  @Column()
  id_level_wil: number;

  @Column()
  id_negara: string;
}
