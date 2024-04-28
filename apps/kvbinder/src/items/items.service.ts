import { Inject, Injectable } from '@nestjs/common';
import { ItemsQueryDto, ItemsStore, KeysQueryDto } from './types';

@Injectable()
export class ItemsService {
  private readonly persistenceStrategy: ItemsStore;
  private readonly cacheStrategy: ItemsStore;

  constructor(
    @Inject('PERSISTENCE_STRATEGY') private readonly persistenceProvider: ItemsStore,
    @Inject('CACHE_STRATEGY') private readonly cacheProvider: ItemsStore
  ) {
    this.persistenceStrategy = this.persistenceProvider;
    this.cacheStrategy = this.cacheProvider;
  }

  async set(key: string, value: unknown): Promise<void> {
    await this.cacheStrategy.set(key, value);
    await this.persistenceStrategy.set(key, value);
  }

  async get(key: string): Promise<unknown> {
    let value = await this.cacheStrategy.get(key);
    if (value === undefined || value === null) {
      value = await this.persistenceStrategy.get(key);
      if (value) {
        await this.cacheStrategy.set(key, value); // Update cache
      }
    }

    return value;
  }

  async remove(key: string): Promise<void> {
    await this.cacheStrategy.delete(key);
    await this.persistenceStrategy.delete(key);
  }

  async findAll({ page, limit }: ItemsQueryDto): Promise<unknown[]> {
    const items = await this.persistenceStrategy.all();
    return this.paginate(items, page, limit);
  }

  async findAllKeys(query: KeysQueryDto): Promise<string[]> {
    const keys = (await this.persistenceStrategy.keys()).filter((key) => {
      if (!query.startsWith && !query.query) return true;
      if (query.startsWith) return key.startsWith(query.startsWith);
      if (query.query) return key.includes(query.query);
    });
    return this.paginate(keys, query.page, query.limit);
  }

  private paginate<T>(items: T[], page: number, limit: number): T[] {
    if (!limit) {
      return items;
    }
    const offset = ((page || 1) - 1) * limit;
    return items.slice(offset, offset + limit);
  }
}
