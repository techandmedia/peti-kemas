import { Repository, EntityRepository } from 'typeorm';
import { RNegara } from './r-negara.entity';

@EntityRepository(RNegara)
export class RNegaraRepository extends Repository<RNegara> {}
