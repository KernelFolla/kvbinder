import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsQueryDto } from './types';
import { Item } from '@kvbinder/api-client-angular';

@Controller('items')
export class ItemsController {
  constructor(private readonly service: ItemsService) {
  }

  @Get()
  async getItems(@Query() query: ItemsQueryDto): Promise<unknown[]> {
    query.page = query.page || 1;
    query.limit = query.limit || 10;
    return await this.service.findAll(query);
  }

  @Get(':key')
  async getItem(@Param('key') key: string) {
    return this.service.get(key);
  }

  @Put(':key')
  async updateItem(@Param('key') key: string, @Body() body: unknown) {
    await this.service.set(key, body);
  }

  @Post()
  async importItems(@Body() body: Item[]) {
    Logger.debug('Importing items', body);
    await Promise.all(body.map(async item => {
      await this.service.set(item.key, item.value);
    }));
  }

  @Delete(':key')
  async remove(@Param('key') key: string) {
    return this.service.remove(key);
  }
}
