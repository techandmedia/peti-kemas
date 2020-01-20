import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RNegara extends BaseEntity {
  @PrimaryGeneratedColumn()
  IDNegara: number;

  @Column()
  KodeBenua: string;

  @Column()
  NamaBenua: string;

  @Column()
  KodeNegara: string;

  @Column()
  NamaNegara: string;
}
