export function findKeyOfMaxValue(obj: Record<string, number>): string | null {
  let maxKey: string | null = null;
  let maxValue = -Infinity;

  for (const [key, value] of Object.entries(obj)) {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  }

  return maxKey;
}
