import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { RAsalsekolahModule } from './r-asalsekolah/r-asalsekolah.module';
import { RWilayahModule } from './r-wilayah/r-wilayah.module';
import { RNegaraModule } from './r-negara/r-negara.module';
import { TPendaftaranUjianModule } from './t-pendaftaran-ujian/t-pendaftaran-ujian.module';
import { UploadFilesModule } from './upload-files/upload-files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule,
    RAsalsekolahModule,
    RWilayahModule,
    RNegaraModule,
    TPendaftaranUjianModule,
    UploadFilesModule,
  ],
})
export class AppModule {}
