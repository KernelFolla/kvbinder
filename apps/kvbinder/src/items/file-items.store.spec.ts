import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ItemsStore } from './types';
import { FileItemsStore } from './file-items.store';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { sanitizeFilename } from './file-items.utils'; // Optional mock for logging

describe('FileItemsStore', () => {
  let store: ItemsStore;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileItemsStore
      ]
    }).compile();

    store = module.get<ItemsStore>(FileItemsStore);
  });

  afterEach(() => {
    // Cleanup test data (optional)
    const storagePath = path.join(__dirname, '..', 'data');
    if (fs.existsSync(storagePath)) {
      fs.rmSync(storagePath, { recursive: true, force: true }); // Remove directory and contents
    }
  });

  describe('get', () => {
    it('should return the value for an existing key', async () => {
      const key = 'test-key';
      const value = { data: 'test' };

      // Create mock data file (outside of the test)
      const fileName = path.join(__dirname, '..', 'data', `${sanitizeFilename(key)}.json`);
      console.log(fileName);
      fs.writeFileSync(fileName, JSON.stringify(value));

      const result = await store.get(key);

      expect(result).toEqual(value);
    });

    it('should return null for a non-existent key', async () => {
      const key = 'missing-key';

      const result = await store.get(key);

      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should save the value for a key', async () => {
      const key = 'new-key';
      const value = { data: 'new' };

      await store.set(key, value);

      const data = fs.readFileSync(path.join(__dirname, '..', 'data', `${key}.json`), 'utf-8');
      const savedValue = JSON.parse(data);

      expect(savedValue).toEqual(value);
    });
  });

  describe('delete', () => {
    it('should delete the key and its file', async () => {
      const key = 'test-key';

      // Create mock data file (outside of the test)
      fs.writeFileSync(path.join(__dirname, '..', 'data', `${sanitizeFilename(key)}.json`), '{}');

      await store.delete(key);

      const filePath = path.join(__dirname, '..', 'data', `${sanitizeFilename(key)}.json`);
      expect(fs.existsSync(filePath)).toBeFalsy();
    });

    it('should throw NotFoundException for non-existent key', async () => {
      const key = 'missing-key';

      try {
        await store.delete(key);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Key '${key}' not found`);
      }
    });
  });


  describe('all', () => {
    it('should return an empty array if no data exists', async () => {
      const result = await store.all();

      expect(result).toEqual([]);
    });

    it('should return all items as an array of objects', async () => {
      const key1 = 'key1';
      const value1 = { data: 'value1' };
      const key2 = 'key2';
      const value2 = { data: 'value2' };

      // Create mock data files (outside of the test)
      fs.writeFileSync(path.join(__dirname, '..', 'data', `${key1}.json`), JSON.stringify(value1));
      fs.writeFileSync(path.join(__dirname, '..', 'data', `${key2}.json`), JSON.stringify(value2));

      const result = await store.all();

      expect(result).toEqual([
        { key: key1, value: value1 },
        { key: key2, value: value2 }
      ]);
    });
  });

  describe('keys', () => {
    it('should return an empty array if no data exists', async () => {
      const result = await store.keys();

      expect(result).toEqual([]);
    });

    it('should return all keys as an array of strings', async () => {
      const key1 = 'key1';
      const key2 = 'key2';

      // Create mock data files (outside of the test)
      fs.writeFileSync(path.join(__dirname, '..', 'data', `${key1}.json`), '{}');
      fs.writeFileSync(path.join(__dirname, '..', 'data', `${key2}.json`), '{}');

      const result = await store.keys();

      expect(result).toEqual([key1, key2]);
    });
  });
});
