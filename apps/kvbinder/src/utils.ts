export const paginate = <T>(items: T[], page: number, limit: number): T[] => {
  if (!limit) {
    return items;
  }
  const offset = ((page || 1) - 1) * limit;
  return items.slice(offset, offset + limit);
};
