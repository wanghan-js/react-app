/**
 * 计数排序: 属于桶排序思想的一种实现 (所谓桶就是一个容器, 可能是一个数组下标, 一个队列, 一个栈等等)
 * 时间复杂度: O(N)
 * 适用场景: 非负十进制整数, 且待排序的数据范围较窄
 */
export function countSort(xs: number[]): void {
  if (xs.length <= 1) {
    return
  }
  // 我们首先需要假设, xs 中的每个数都在 [0, 100] 的范围 (100 是随意取的值, 实际为多少看具体情况)
  // 我们预先把所有可能的数值出现的频次, 放在一个数组中
  const buckets: number[] = new Array(101).fill(0)
  // 然后遍历原数组, 计算出数字频次, 更新桶
  for (const x of xs) {
    buckets[x]++
  }
  // 最后从左到右遍历桶, 覆盖原数组
  let index = 0
  for (let i = 0; i < buckets.length; i++) {
    const count = buckets[i]
    if (count) {
      for (let j = 0; j < count; j++) {
        xs[index] = i
        index++
      }
    }
  }
}
