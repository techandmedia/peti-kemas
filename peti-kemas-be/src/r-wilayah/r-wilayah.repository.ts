import { Repository, EntityRepository } from 'typeorm';
import { RWilayah } from './r-wilayah.entity';

@EntityRepository(RWilayah)
export class RWilayahRepository extends Repository<RWilayah> {}
