export function getRandomColor(): string {
  return Math.random() - 0.5 > 0 ? 'white' : 'black';
}