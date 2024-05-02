export function sanitizeFilename(filename: string) {
  // Replace slashes and other problematic characters with placeholders
  return filename.replace(/[/\\:*?"<>|]/g, (match) => {
    // Use a unique placeholder for each replaced character
    return '%' + match.charCodeAt(0).toString(16);
  });
}

export function restoreFilename(filename: string) {
  // Restore characters based on placeholders
  return filename.replace(/%([0-9a-f]{2})/gi, (_, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
}
