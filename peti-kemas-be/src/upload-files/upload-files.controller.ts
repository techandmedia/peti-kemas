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
  @Get('/bukti-bayar-dp/:imgpath')
  getTertulis(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './images/bukti-bayar/dp' });
  }

  @Get('/bukti-bayar-pelunasan/:imgpath')
  getKesehatan(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './images/bukti-bayar/pelunasan' });
  }

  /****************************************************************************
   * Post Files
   */
  @Post('/upload-bukti-bayar/dp')
  @UseInterceptors(
    /**
     * Perhatikan cara penulisan field 'bukti-bayar-dp'
     * atau 'file' di bawah ini
     * Nama field ini harus sama dengan field di Postman atau
     * fieldName dari postData
     */
    // FileInterceptor('file', {
    FileInterceptor('bukti-bayar-dp', {
      storage: diskStorage({
        destination: './images/bukti-bayar/dp',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  buktiBayarDp(@UploadedFile() file): Promise<any> {
    return this.uploadFilesService.buktiBayar(file);
  }

  @Post('/upload-bukti-bayar/pelunasan')
  @UseInterceptors(
    /**
     * Nama field 'bukti-bayar-pelunasan'
     * Baik itu di postman ataupun field upload UI
     */
    FileInterceptor('bukti-bayar-pelunasan', {
      storage: diskStorage({
        destination: './images/bukti-bayar/pelunasan',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  buktiBayarKesehatan(@UploadedFile() file): Promise<any> {
    return this.uploadFilesService.buktiBayar(file);
  }
}
