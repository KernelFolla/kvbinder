import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly service: ItemsService) {}

  @Get(':key')
  async get(@Param('key') key: string) {
    return this.service.get(key);
  }

  @Put(':key')
  async set(@Param('key') key: string, @Body() body: unknown) {
    await this.service.set(key, body);
  }


  @Delete(':key')
  async remove(@Param('key') key: string) {
    return this.service.remove(key);
  }
}
