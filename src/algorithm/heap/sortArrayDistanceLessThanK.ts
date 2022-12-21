import { LittleHeap } from '@/algorithm/heap/littleHeap'

/**
 * 已知一个几乎有序的数组
 * 几乎有序是指: 如果把数组排好序的话, 每个元素移动的距离一定不超过 k
 * 并且 k 相对于数组长度来说是比较小的
 * 请选择一个合适的排序策略, 对这个数组进行排序
 */
export function sortArrayDistanceLessThanK(xs: number[], k: number): void {
  // 将前 k + 1 个数变成小顶堆
  const heap = new LittleHeap(xs.slice(0, Math.min(xs.length, k + 1)))

  // 从 k + 1 个元素开始遍历, 每次从小顶堆中取出最小元素放入原数组中, 并且再加入新增的元素
  let index = 0
  for (let i = k + 1; i < xs.length; i++, index++) {
    xs[index] = heap.pop()
    heap.push(xs[i])
  }

  // 最后的小顶堆, 需要依次弹出最小值, 放入原数组中
  while (!heap.isEmpty()) {
    xs[index] = heap.pop()
    index++
  }
}
