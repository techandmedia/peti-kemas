import { PipeTransform, BadRequestException } from '@nestjs/common';
import { StatusUjian } from '../enum/status-ujian.enum';

export class PendaftaranUjianValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    StatusUjian.LULUS,
    StatusUjian.TIDAK_LULUS,
    StatusUjian.TERDAFTAR,
    StatusUjian.TIDAK_TERDAFTAR,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
