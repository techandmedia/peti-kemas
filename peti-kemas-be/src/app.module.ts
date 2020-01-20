import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UploadFilesModule } from './upload-files/upload-files.module';
import { PendaftaranModule } from './pendaftaran/pendaftaran.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule,
    UploadFilesModule,
    PendaftaranModule,
  ],
})
export class AppModule {}
