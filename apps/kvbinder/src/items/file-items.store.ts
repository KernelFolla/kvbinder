import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ItemsStore } from './types';

@Injectable()
export class FileItemsStore implements ItemsStore {
  private storagePath: string = path.join(__dirname, '..', 'data');

  constructor() {
    // Ensure the data directory exists
    if (!fs.existsSync(this.storagePath)) {
      Logger.debug(`Creating storage directory at ${this.storagePath}`)
      fs.mkdirSync(this.storagePath);
    }else{
      Logger.debug(`Storage directory already exists at ${this.storagePath}`)
    }
  }

  async get(key: string): Promise<unknown> {
    const filePath = this.getFilePathForKey(key);
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
    return path.join(this.storagePath, `${key}.json`);
  }
}
