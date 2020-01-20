import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { RNegaraRepository } from './r-negara.repository';
import { RNegara } from './r-negara.entity';

const logger = new Logger('Negara');

@Injectable()
export class RNegaraService {
  constructor(
    @InjectRepository(RNegaraRepository)
    private negaraRepository: RNegaraRepository,
  ) {}

  async searchNegara(search: string): Promise<RNegara[]> {
    const query = await this.negaraRepository.find({
      NamaNegara: Like(`%${search}%`),
    });

    if (query.length === 0) {
      throw new NotFoundException(
        `Negara dengan nama ${search} tidak ditemukan`,
      );
    }

    return query;
  }

  async getNegara(page: number, amount: number): Promise<RNegara[]> {
    const query = await this.negaraRepository.find({
      select: ['KodeNegara', 'NamaNegara'],
      skip: page * amount - amount,
      take: amount,
    });

    logger.log(page, 'Page');
    logger.log(amount, 'amount');

    if (query.length === 0) {
      throw new NotFoundException(
        `Kurangi jumlah data yang direquest atau kurangi nomor halaman`,
      );
    }

    return query;
  }

  async getAllNegara(): Promise<RNegara[]> {
    const query = await this.negaraRepository.find({
      select: ['KodeNegara', 'NamaNegara'],
    });

    const response = [];
    query.map(item =>
      response.push({
        label: item['KodeNegara'],
      }),
    );

    return query;
  }
}
