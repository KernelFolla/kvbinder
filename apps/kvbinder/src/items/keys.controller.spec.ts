import { Test, TestingModule } from '@nestjs/testing';
import { KeysController } from './keys.controller';
import { ItemsService } from './items.service';
import { KeysQueryDto } from './types';

describe('KeysController', () => {
  let controller: KeysController;
  const findAllKeysMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeysController],
      providers: [
        {
          provide: ItemsService,
          useValue: {
            findAllKeys: findAllKeysMock // Mock the findAllKeys function
          }
        }
      ]
    }).compile();

    controller = module.get<KeysController>(KeysController);
  });

  it('should return all keys from the service', async () => {
    const expectedKeys = [1, 2, 3]; // Replace with your expected data
    findAllKeysMock.mockReturnValueOnce(expectedKeys);

    const query: KeysQueryDto = {}; // You can add query parameters here

    const result = await controller.findAll(query);
    expect(result).toEqual(expectedKeys);
    expect(findAllKeysMock).toHaveBeenCalledWith(query);
  });
});
