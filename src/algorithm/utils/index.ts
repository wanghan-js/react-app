export function swap<T>(array: T[], i: number, j: number): void {
  ;[array[i], array[j]] = [array[j], array[i]]
}

// 获取一个随机数: [min, max)
export function getRandomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min))
}
