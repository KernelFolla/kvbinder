import { Module } from '@nestjs/common';

import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheItemsStore } from './cache-items.store';
import { FileItemsStore } from './file-items.store';

@Module({
  imports: [CacheModule.register()],
  controllers: [ItemsController],
  providers: [
    { provide: 'PERSISTENCE_STRATEGY', useClass: FileItemsStore },
    { provide: 'CACHE_STRATEGY', useClass: CacheItemsStore },
    ItemsService],
  exports: [CacheModule],
})
export class ItemsModule {}
