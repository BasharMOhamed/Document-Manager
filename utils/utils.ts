export function replaceFolderPath(path: string, newName: string): string {
  const lastSlashIndex = path.lastIndexOf('/');
  if (lastSlashIndex === -1) return newName;
  return path.substring(0, lastSlashIndex + 1) + newName;
}
