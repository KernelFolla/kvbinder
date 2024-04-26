import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ItemsStore } from './types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheItemsStore implements ItemsStore {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache,) {}

  async set(key: string, value: unknown): Promise<void> {
    await this.cache.set(key, value, 60 * 60 * 24 * 365)
  }

  async get(key: string): Promise<unknown> {
    return await this.cache.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.cache.del(key);
  }
}
