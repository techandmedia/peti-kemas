import { Controller, Post, Body, Res } from '@nestjs/common';
import { RNegaraService } from './r-negara.service';
import { RNegara } from './r-negara.entity';

@Controller('negara')
export class RNegaraController {
  constructor(private negaraService: RNegaraService) {}

  @Post()
  getNegara(
    @Body('type') type: string,
    @Body('search') search: string,
    @Body('page') page: number,
    @Body('amount') amount: number,
    // @Res() res,
  ): Promise<RNegara[]> {
    let query;

    switch (type) {
      case 'get-page':
        query = this.negaraService.getNegara(page, amount);
        break;

      case 'get-all':
        query = this.negaraService.getAllNegara();
        break;

      case 'search':
        query = this.negaraService.searchNegara(search);
        break;

      default:
        query = 'NOT FOUND';
        break;
    }

    return query;
  }
}
