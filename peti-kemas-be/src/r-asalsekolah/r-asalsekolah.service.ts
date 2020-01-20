import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { RAsalSekolahRepository } from './r-asalsekolah.repository';
import { RAsalsekolah } from './r-asalsekolah.entity';

@Injectable()
export class RAsalsekolahService {
  constructor(
    @InjectRepository(RAsalSekolahRepository)
    private asalSekolahRepository: RAsalSekolahRepository,
  ) {}

  async searchAsalSekolah(search: string): Promise<RAsalsekolah[]> {
    const query = await this.asalSekolahRepository.find({
      Nama: Like(`%${search}%`),
    });

    if (query.length === 0) {
      throw new NotFoundException(
        `Sekolah dengan nama ${search} tidak ditemukan`,
      );
    }

    return query;
  }

  async getPageAsalSekolah(
    page: number,
    amount: number,
  ): Promise<RAsalsekolah[]> {
    const query = await this.asalSekolahRepository.find({
      select: ['SekolahID', 'Nama', 'Alamat1', 'Kota'],
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

  async getAllAsalSekolah(): Promise<RAsalsekolah[]> {
    const query = await this.asalSekolahRepository.find({
      select: ['SekolahID', 'Nama'],
    });

    return query;
  }
}
