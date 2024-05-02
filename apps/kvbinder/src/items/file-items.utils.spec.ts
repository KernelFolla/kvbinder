import { restoreFilename, sanitizeFilename } from './file-items.utils';

describe('Filename Sanitizer', () => {
  it('should sanitize and restore filenames correctly', () => {
    // Original filename
    const originalFilename = 'folder\\with:proble/matic?characters.txt';

    // Sanitize the filename
    const sanitizedFilename = sanitizeFilename(originalFilename);

    // Check if the sanitized filename contains placeholders
    expect(sanitizedFilename).not.toEqual(originalFilename);

    // Restore the filename
    const restoredFilename = restoreFilename(sanitizedFilename);

    // Check if the restored filename matches the original filename
    expect(restoredFilename).toEqual(originalFilename);
  });
});
