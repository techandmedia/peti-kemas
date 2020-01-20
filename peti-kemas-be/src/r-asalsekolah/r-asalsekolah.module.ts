import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RAsalSekolahRepository } from './r-asalsekolah.repository';
import { RAsalsekolahController } from './r-asalsekolah.controller';
import { RAsalsekolahService } from './r-asalsekolah.service';

@Module({
  imports: [TypeOrmModule.forFeature([RAsalSekolahRepository])],
  controllers: [RAsalsekolahController],
  providers: [RAsalsekolahService],
})
export class RAsalsekolahModule {}
