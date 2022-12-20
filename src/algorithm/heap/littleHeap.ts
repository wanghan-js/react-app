import { swap } from '@/algorithm/utils'

/**
 * 实现一个小顶堆
 */
export class LittleHeap<T> {
  constructor(private array: T[]) {
    for (let i = this.size() - 1; i >= 0; i--) {
      this.heapify(i)
    }
  }

  // 添加一个元素到小顶堆
  add(item: T): void {
    this.array.push(item)
    let j = this.array.length - 1
    while (j) {
      // 父节点的下标
      const k = Math.floor((j - 1) / 2)
      if (this.array[j] < this.array[k]) {
        // 比父小就交换位置
        swap(this.array, j, k)
        j = k
      } else {
        break
      }
    }
  }

  // 从小顶堆中弹出最小值
  poll(): T {
    if (this.isEmpty()) {
      throw new Error('Little heap already empty!')
    }
    const min = this.array[0]
    swap(this.array, 0, this.size() - 1)
    // 交换后丢掉最后一个元素 (也是最小的元素)
    this.array.pop()
    this.heapify(0)
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

  private heapify(index: number): void {
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
