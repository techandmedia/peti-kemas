import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { RWilayahRepository } from './r-wilayah.repository';
import { RWilayah } from './r-wilayah.entity';

@Injectable()
export class RWilayahService {
  constructor(
    @InjectRepository(RWilayahRepository)
    private wilayahRepository: RWilayahRepository,
  ) {}

  async searchWilayah(search: string): Promise<RWilayah[]> {
    const query = await this.wilayahRepository.find({
      nm_wil: Like(`%${search}%`),
    });

    if (query.length === 0) {
      throw new NotFoundException(
        `Kota/Kabupaten dengan nama ${search} tidak ditemukan`,
      );
    }

    return query;
  }

  async getWilayah(page: number, amount: number): Promise<RWilayah[]> {
    const query = await this.wilayahRepository.find({
      select: ['nm_wil'],
      skip: page * amount - amount,
      take: amount,
    });

    if (query.length === 0) {
      throw new NotFoundException(
        `Kurangi jumlah data yang direquest atau kurangi nomor halaman`,
      );
    }

    return query;
  }

  async getAllWilayah(): Promise<RWilayah[]> {
    const query = await this.wilayahRepository.find({
      select: ['id_wil', 'nm_wil'],
    });

    return query;
  }
}
