import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemsQueryDto } from './types';
import { Item } from '@kvbinder/api-client-angular';

describe('ItemsController', () => {
  let controller: ItemsController;
  const mockItemsService = {
    findAll: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: mockItemsService
        }
      ]
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  // Test cases for each controller method

  describe('getItems', () => {
    it('should return items from the service with default pagination', async () => {
      const expectedItems = [1, 2, 3];
      mockItemsService.findAll.mockReturnValueOnce(expectedItems);

      const query: ItemsQueryDto = {};
      const result = await controller.getItems(query);

      expect(result).toEqual(expectedItems);
      expect(mockItemsService.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 }); // Default pagination applied
    });

    it('should return items from the service with provided pagination', async () => {
      const expectedItems = [4, 5, 6];
      mockItemsService.findAll.mockReturnValueOnce(expectedItems);

      const query: ItemsQueryDto = { page: 2, limit: 20 };
      const result = await controller.getItems(query);

      expect(result).toEqual(expectedItems);
      expect(mockItemsService.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('getItem', () => {
    it('should get an item by key from the service', async () => {
      const key = 'my-key';
      const expectedItem = { value: 'data' };
      mockItemsService.get.mockReturnValueOnce(expectedItem);

      const result = await controller.getItem(key);

      expect(result).toEqual(expectedItem);
      expect(mockItemsService.get).toHaveBeenCalledWith(key);
    });
  });

  describe('updateItem', () => {
    it('should update an item by key using the service', async () => {
      const key = 'my-key';
      const updateData = { value: 'updated' };
      await controller.updateItem(key, updateData);

      expect(mockItemsService.set).toHaveBeenCalledWith(key, updateData);
    });
  });

  describe('importItems', () => {
    it('should import items using service.set for each item', async () => {
      mockItemsService.set.mockReset();
      const items: Item[] = [
        { key: 'key1', value: { x: 'value1' } },
        { key: 'key2', value: { x: 'value2' } }
      ];

      await controller.importItems(items);

      expect(mockItemsService.set).toHaveBeenCalledTimes(items.length);
      expect(mockItemsService.set).toHaveBeenCalledWith(items[0].key, items[0].value);
      expect(mockItemsService.set).toHaveBeenCalledWith(items[1].key, items[1].value);
    });
  });
});
