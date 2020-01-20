import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PendaftaranRepository } from './pendaftaran.repository';
import { PendaftaranController } from './pendaftaran.controller';
import { PendaftaranService } from './pendaftaran.service';

@Module({
  imports: [TypeOrmModule.forFeature([PendaftaranRepository])],
  controllers: [PendaftaranController],
  providers: [PendaftaranService],
})
export class PendaftaranModule {}
