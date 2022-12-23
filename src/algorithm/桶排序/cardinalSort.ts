import { Queue } from '@/algorithm/queue'

/**
 * 基数排序: 桶排序思想的一种
 * 使用场景: 非负十进制整数, 对数据范围没有要求
 * 时间复杂度: 严格来说是 O(N*log10max), 其中 max 是数组中的最大值, 但是一般使用基数排序的场景, 每个数都约定不会太大
 * 所以 log10max 的值很小, 可以近似认为是 O(N) 的复杂度
 */
export function cardinalSort(xs: number[]): void {
  if (xs.length <= 1) {
    return
  }

  // 遍历原数组每个数字, 找到最大的数, 看它有几位, 给其他所有数补前置 0, 补齐位数
  const max = Math.max(...xs)
  const helper: string[] = xs.map((x) => String(x))
  const len = helper.length
  const maxLen = String(max).length
  for (let i = 0; i < len; i++) {
    const item = helper[i]
    if (item.length < maxLen) {
      helper[i] = item.padStart(maxLen, '0')
    }
  }

  // 从 0 到 9 搞 10 个队列, 当作桶
  const buckets: Queue<string>[] = []
  for (let i = 0; i < 10; i++) {
    buckets[i] = new Queue()
  }

  // 从个位开始遍历每个数, 按个位的值依次找对对应的桶入队, 如此依次处理十位, 百位等
  for (let i = 0; i < maxLen; i++) {
    for (let j = 0; j < len; j++) {
      const item = helper[j]
      // 取出位数, 将整个数放入桶中
      const num = item[maxLen - i - 1]
      buckets[Number(num)].enqueue(item)
    }
    // 从左往右依次出队
    let k = 0
    for (const bucket of buckets) {
      while (!bucket.isEmpty()) {
        const item = bucket.dequeue()
        if (item) {
          helper[k] = item
          k++
        }
      }
    }
  }

  // 处理完最高位后, 数组即排好序, 修改原数组
  for (let i = 0; i < len; i++) {
    xs[i] = Number(helper[i])
  }
}
