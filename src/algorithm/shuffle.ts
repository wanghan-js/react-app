import { getRandomInt, swap } from '@/algorithm/utils'

export function shuffle<T>(xs: T[]): void {
  // 每个元素跟它的下标及它的下标之后的随机元素调换位置, 可实现洗牌效果
  const len = xs.length
  for (let i = 0; i < len; i++) {
    const j = getRandomInt(i, len)
    swap(xs, i, j)
  }
}
