import { Controller, Get, Query } from '@nestjs/common';
import { KeysQueryDto } from './types';
import { ItemsService } from './items.service';

@Controller('keys')
export class KeysController {
  constructor(private readonly service: ItemsService) {
  }

  @Get()
  async findAll(@Query() query: KeysQueryDto): Promise<unknown[]> {
    return await this.service.findAllKeys(query);
  }
}
