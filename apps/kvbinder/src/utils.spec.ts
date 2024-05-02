import { paginate } from './utils';

describe('paginate', () => {
  it('should return all items if limit is not provided', async () => {
    const items = ['item1', 'item2', 'item3'];
    const page = 1;

    const result = paginate(items, page, 10);

    expect(result).toEqual(items);
  });

  it('should apply pagination (offset and limit)', async () => {
    const items = ['item1', 'item2', 'item3', 'item4'];
    const page = 2;
    const limit = 2;

    const result = paginate(items, page, limit);

    const expectedStart = (page - 1) * limit;
    expect(result).toEqual(items.slice(expectedStart, expectedStart + limit)); // Paginated result (item3, item4)
  });

  it('should not exceed the total item count', async () => {
    const items = ['item1', 'item2'];
    const page = 3; // Page beyond total items
    const limit = 10;

    const result = paginate(items, page, limit);

    expect(result).toEqual([]); // Empty result for invalid page
  });
});
