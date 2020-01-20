import { Injectable, Logger } from '@nestjs/common';

const logger = new Logger('Upload Files');

@Injectable()
export class UploadFilesService {
  async buktiBayar(file): Promise<any> {
    let response;
    const title = 'Upload Berkas';
    try {
      const success = await {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
      };
      response = {
        code: 201,
        title,
        message: 'Anda berhasil melakukan upload berkas',
        data: success,
      };
    } catch (error) {
      response = {
        code: 500,
        title,
        message:
          'Anda gagal melakukan upload berkas, hubungi Admin untuk bantuan',
      };
    }
    return response;
  }
}
