import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ItemsStore } from './types';
import { restoreFilename, sanitizeFilename } from './file-items.utils';

@Injectable()
export class FileItemsStore implements ItemsStore {
  private storagePath: string = path.join(__dirname, '..', 'data');

  constructor() {
    // Ensure the data directory exists
    if (!fs.existsSync(this.storagePath)) {
      Logger.debug(`Creating storage directory at ${this.storagePath}`);
      fs.mkdirSync(this.storagePath);
    } else {
      Logger.debug(`Storage directory already exists at ${this.storagePath}`);
    }
  }

  async get(key: string): Promise<unknown> {
    const filePath = this.getFilePathForKey(key);
    console.log(filePath);
    Logger.debug(`Reading file at ${filePath}`);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  async set(key: string, value: unknown): Promise<void> {
    const filePath = this.getFilePathForKey(key);
    const data = JSON.stringify(value);
    fs.writeFileSync(filePath, data);
  }

  async delete(key: string): Promise<void> {
    const filePath = this.getFilePathForKey(key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      throw new NotFoundException(`Key '${key}' not found`);
    }
  }

  private getFilePathForKey(key: string): string {
    return path.join(this.storagePath, `${sanitizeFilename(key)}.json`);
  }

  private getKeyFromFilePath(filePath: string): string {
    return restoreFilename(filePath.replace('.json', ''));
  }

  async all(): Promise<unknown[]> {
    const files = fs.readdirSync(this.storagePath);
    return files.map((file) => {
      const data = fs.readFileSync(path.join(this.storagePath, file), 'utf-8');
      return {
        key: this.getKeyFromFilePath(file),
        value: JSON.parse(data)
      };
    });
  }

  async keys(): Promise<string[]> {
    const files = fs.readdirSync(this.storagePath);
    return files.map((file) => this.getKeyFromFilePath(file));
  }
}
