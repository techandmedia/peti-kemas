import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RNegaraController } from './r-negara.controller';
import { RNegaraService } from './r-negara.service';
import { RNegaraRepository } from './r-negara.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RNegaraRepository])],
  controllers: [RNegaraController],
  providers: [RNegaraService],
})
export class RNegaraModule {}
