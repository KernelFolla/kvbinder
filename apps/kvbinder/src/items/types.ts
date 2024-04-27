export interface ItemsStore {
  set(key: string, value: unknown): Promise<void>;

  get(key: string): Promise<unknown>;

  delete(key: string): Promise<void>;
}

export class ItemNotFoundException extends Error {
  constructor(key: string) {
    super(`Item with key ${key} not found`);
  }
}
