import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
  Logger,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadFilesService } from './upload-files.service';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';

const logger = new Logger('Tes logger upload');
@Controller('files')
export class UploadFilesController {
  constructor(private uploadFilesService: UploadFilesService) {}

  /**
   * Get Files
   */
  @Get('/bukti-bayar-tertulis/:imgpath')
  getTertulis(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './images/bukti-bayar/tertulis' });
  }

  @Get('/bukti-bayar-kesehatan/:imgpath')
  getKesehatan(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './images/bukti-bayar/kesehatan' });
  }

  @Get('/bukti-bayar-administrasi/:imgpath')
  getAdministrasi(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './images/bukti-bayar/administrasi' });
  }

  /****************************************************************************
   * Post Files
   */
  @Post('/upload-bukti-bayar/tertulis')
  @UseInterceptors(
    /**
     * Perhatikan cara penulisan field 'bukti-bayar-tertulis'
     * atau 'file' di bawah ini
     * Nama field ini harus sama dengan field di Postman atau
     * fieldName dari postData
     */
    // FileInterceptor('file', {
    FileInterceptor('bukti-bayar-tertulis', {
      storage: diskStorage({
        destination: './images/bukti-bayar/tertulis',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  buktiBayarTertulis(@UploadedFile() file): Promise<any> {
    return this.uploadFilesService.buktiBayar(file);
  }

  @Post('/upload-bukti-bayar/kesehatan')
  @UseInterceptors(
    /**
     * Nama field 'bukti-bayar-kesehatan'
     * Baik itu di postman ataupun field upload UI
     */
    FileInterceptor('bukti-bayar-kesehatan', {
      storage: diskStorage({
        destination: './images/bukti-bayar/kesehatan',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  buktiBayarKesehatan(@UploadedFile() file): Promise<any> {
    return this.uploadFilesService.buktiBayar(file);
  }

  @Post('/upload-bukti-bayar/administrasi')
  @UseInterceptors(
    /**
     * Nama field 'bukti-bayar-kesehatan'
     * Baik itu di postman ataupun field upload UI
     */
    FileInterceptor('bukti-bayar-administrasi', {
      storage: diskStorage({
        destination: './images/bukti-bayar/administrasi',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  buktiBayarAdministrasi(@UploadedFile() file): Promise<any> {
    return this.uploadFilesService.buktiBayar(file);
  }
}
