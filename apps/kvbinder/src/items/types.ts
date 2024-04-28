export interface ItemsStore {
  set(key: string, value: unknown): Promise<void>;

  get(key: string): Promise<unknown>;

  delete(key: string): Promise<void>;

  all(): Promise<unknown[]>;

  keys(): Promise<string[]>;
}

export class ItemNotFoundException extends Error {
  constructor(key: string) {
    super(`Item with key ${key} not found`);
  }
}

export class ItemsQueryDto {
  limit?: number;
  page?: number;
}

export class KeysQueryDto {
  startsWith?: string;
  query?: string;
  limit?: number;
  page?: number;
}

