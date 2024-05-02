import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  let mockPersistenceStore;
  let mockCacheStore;

  beforeEach(async () => {
    mockPersistenceStore = {
      set: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
      all: jest.fn(),
      keys: jest.fn()
    };
    mockCacheStore = {
      set: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
      all: jest.fn(),
      keys: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: 'PERSISTENCE_STRATEGY', useValue: mockPersistenceStore },
        { provide: 'CACHE_STRATEGY', useValue: mockCacheStore }
      ]
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  describe('set', () => {
    it('should set the value in both cache and persistence store', async () => {
      const key = 'test-key';
      const value = 'test-value';

      await service.set(key, value);

      expect(mockCacheStore.set).toHaveBeenCalledWith(key, value);
      expect(mockPersistenceStore.set).toHaveBeenCalledWith(key, value);
    });
  });

  describe('get', () => {
    it('should return cached value if available', async () => {
      const key = 'test-key';
      const cachedValue = 'cached-value';

      mockCacheStore.get.mockReturnValueOnce(cachedValue);

      const result = await service.get(key);

      expect(result).toEqual(cachedValue);
      expect(mockPersistenceStore.get).not.toHaveBeenCalled();
    });

    it('should fetch from persistence store if cache miss', async () => {
      const key = 'test-key';
      const persistenceValue = 'persistence-value';

      mockCacheStore.get.mockReturnValueOnce(undefined);
      mockPersistenceStore.get.mockReturnValueOnce(persistenceValue);

      const result = await service.get(key);

      expect(result).toEqual(persistenceValue);
      expect(mockCacheStore.get).toHaveBeenCalledWith(key);
      expect(mockPersistenceStore.get).toHaveBeenCalledWith(key);
      expect(mockCacheStore.set).toHaveBeenCalledWith(key, persistenceValue); // Update cache
    });

    it('should return undefined if not found in either store', async () => {
      const key = 'test-key';

      mockCacheStore.get.mockReturnValueOnce(undefined);
      mockPersistenceStore.get.mockReturnValueOnce(undefined);

      const result = await service.get(key);

      expect(result).toBeUndefined();
      expect(mockCacheStore.get).toHaveBeenCalledWith(key);
      expect(mockPersistenceStore.get).toHaveBeenCalledWith(key);
    });
  });

  describe('remove', () => {
    it('should remove the key from both cache and persistence store', async () => {
      const key = 'test-key';

      await service.remove(key);

      expect(mockCacheStore.delete).toHaveBeenCalledWith(key);
      expect(mockPersistenceStore.delete).toHaveBeenCalledWith(key);
    });
  });

  describe('findAll', () => {
    it('should fetch all items from persistence and apply pagination', async () => {
      const items = ['item1', 'item2', 'item3'];
      const page = 2;
      const limit = 1;

      mockPersistenceStore.all.mockReturnValueOnce(items);

      const result = await service.findAll({ page, limit });

      expect(result).toEqual([items[1]]); // Paginated result (item2)
      expect(mockPersistenceStore.all).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllKeys', () => {
    it('should fetch all keys from persistence and apply pagination', async () => {
      const keys = ['key1', 'key2', 'key3', 'key4'];
      const page = 1;
      const limit = 2;

      mockPersistenceStore.keys.mockReturnValueOnce(keys);

      const result = await service.findAllKeys({ page, limit });

      expect(result).toEqual(keys.slice(0, limit)); // Paginated result (key1, key2)
      expect(mockPersistenceStore.keys).toHaveBeenCalledTimes(1);
    });

    it('should return all keys if no pagination is provided', async () => {
      const keys = ['key1', 'key2', 'key3'];

      mockPersistenceStore.keys.mockReturnValueOnce(keys);

      const result = await service.findAllKeys({});

      expect(result).toEqual(keys);
      expect(mockPersistenceStore.keys).toHaveBeenCalledTimes(1);
    });
  });
});
