import { swap } from '@/algorithm/utils'

/**
 * 实现一个小顶堆
 */
export class LittleHeap<T> {
  constructor(private array: T[]) {
    // 注意这里从最后一个元素开始调用 sink 方法, 可以将时间复杂度降低为 O(N)
    // 而如果从第一个元素开始遍历的话, 时间复杂度为 O(N*logN)
    for (let i = this.lastIndex(); i >= 0; i--) {
      this.sink(i)
    }
  }

  // 添加一个元素到小顶堆
  push(item: T): void {
    this.array.push(item)
    this.rise(this.lastIndex())
  }

  // 从小顶堆中弹出最小值
  pop(): T {
    if (this.isEmpty()) {
      throw new Error('Little heap already empty!')
    }
    const min = this.array[0]
    swap(this.array, 0, this.lastIndex())
    // 交换后丢掉最后一个元素 (也是最小的元素)
    this.array.pop()
    this.sink(0)
    return min
  }

  size(): number {
    return this.array.length
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  toString(): string {
    return this.array.join(', ')
  }

  private lastIndex(): number {
    return this.size() - 1
  }

  // 节点上浮
  private rise(index: number): void {
    let i = index
    while (i) {
      // 父节点的下标
      const j = Math.floor((i - 1) / 2)
      if (this.array[i] < this.array[j]) {
        // 比父小就交换位置
        swap(this.array, i, j)
        i = j
      } else {
        break
      }
    }
  }

  // 节点下沉
  private sink(index: number): void {
    let i = index
    let leftIndex = i * 2 + 1
    while (leftIndex < this.size()) {
      const rightIndex = leftIndex + 1
      const minIndex =
        rightIndex < this.size() && this.array[rightIndex] < this.array[leftIndex]
          ? rightIndex
          : leftIndex
      // 如果 i 处有孩子, 并且它比其中一个孩子大, 则下沉
      if (this.array[i] > this.array[minIndex]) {
        swap(this.array, i, minIndex)
        i = minIndex
        leftIndex = i * 2 + 1
      } else {
        break
      }
    }
  }
}
