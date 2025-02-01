export function newDescription(description: string): string {
  return description.replace(/~/g, '\n');
}
