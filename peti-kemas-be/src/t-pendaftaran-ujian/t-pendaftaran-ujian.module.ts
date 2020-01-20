import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TPendaftaranUjianController } from './t-pendaftaran-ujian.controller';
import { TPendaftaranUjianService } from './t-pendaftaran-ujian.service';
import { TPendaftaranUjianRepository } from './t-pendaftaran-ujian.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TPendaftaranUjianRepository])],
  controllers: [TPendaftaranUjianController],
  providers: [TPendaftaranUjianService],
})
export class TPendaftaranUjianModule {}
