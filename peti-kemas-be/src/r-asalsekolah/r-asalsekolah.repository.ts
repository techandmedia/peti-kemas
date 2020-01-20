import { EntityRepository, Repository } from 'typeorm';
import { RAsalsekolah } from './r-asalsekolah.entity';

@EntityRepository(RAsalsekolah)
export class RAsalSekolahRepository extends Repository<RAsalsekolah> {
  async getAsalSekolah(): Promise<RAsalsekolah[]> {
    /**
     * Perhatikan pemberian nama alias untuk tabel r-asalsekolah
     * Menjadi hanya 'asalsekolah'
     */
    const query = this.createQueryBuilder('asalsekolah')
      .select('asalsekolah.SekolahID')
      .addSelect('asalsekolah.Nama')
      .addSelect('asalsekolah.Alamat1')
      .addSelect('asalsekolah.Kota')
      .take(20)
      .getMany();

    return query;
  }
}
