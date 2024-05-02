import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ItemsStore } from './types';
import { CacheItemsStore } from './cache-items.store';

describe('CacheItemsStore', () => {
  let store: ItemsStore;
  const mockCacheGet = jest.fn();
  let mockCache: Partial<Cache>;

  beforeEach(async () => {
    mockCacheGet.mockReset();
    mockCache = {
      set: jest.fn(),
      get: mockCacheGet,
      del: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheItemsStore,
        { provide: CACHE_MANAGER, useValue: mockCache }
      ]
    }).compile();

    store = module.get<ItemsStore>(CacheItemsStore);
  });

  describe('set', () => {
    it('should set the value in cache with one year expiration', async () => {
      const key = 'test-key';
      const value = 'test-value';

      await store.set(key, value);

      expect(mockCache.set).toHaveBeenCalledWith(key, value, 60 * 60 * 24 * 365); // One year expiration
    });
  });

  describe('get', () => {
    it('should return cached value if available', async () => {
      const key = 'test-key';
      const cachedValue = 'cached-value';
      mockCacheGet.mockReturnValueOnce(cachedValue);

      const result = await store.get(key);

      expect(result).toEqual(cachedValue);
      expect(mockCache.get).toHaveBeenCalledWith(key);
    });

    it('should return undefined if not found in cache', async () => {
      const key = 'test-key';

      mockCacheGet.mockReturnValueOnce(undefined);

      const result = await store.get(key);

      expect(result).toBeUndefined();
      expect(mockCache.get).toHaveBeenCalledWith(key);
    });
  });

  describe('delete', () => {
    it('should remove the key from cache', async () => {
      const key = 'test-key';

      await store.delete(key);

      expect(mockCache.del).toHaveBeenCalledWith(key);
    });
  });

  describe('all', () => {
    it('should throw error as not implemented', async () => {
      try {
        await store.all();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Method not implemented.');
      }
    });
  });

  describe('keys', () => {
    it('should throw error as not implemented', async () => {
      try {
        await store.keys();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Method not implemented.');
      }
    });
  });
});
