/**
 * 各种排序算法
 * 排序算法总结:
 * 1.不基于比较的排序 (桶排序) 对样本数据的格式和范围有严格要求, 不易改写
 * 2. 基于比较的排序, 只要规定好两个样本怎么比大小就可以直接服用
 * 3. 基于比较的排序, 时间复杂度的极限是 O(N*logN)
 * 4. 时间复杂度为 O(N*logN), 额外空间复杂度低于 O(N), 且具有稳定性的基于比较的排序是不存在的
 *    这是一个不可能三角, 你用了某种魔法优化了其中一项, 则另一项就会变差
 * 5. 为了绝对的速度选随机快排 (因为快排的常数时间最低); 为了省空间选堆排; 为了稳定性选归并
 * 6. 实际工程上排序的实现, 会做一些工程上的优化, 多种排序方法混合使用, 达到实际最优解
 *    一般来说, 针对基础类型, 会用快排; 针对引用类型, 会用归并 (保持稳定性)
 *    快排中, 如果元素的个数比较少 (比如少于 60 个), 那么可能直接使用插入排序
 *    因为虽然快排的时间复杂度相对低, 但是常数时间在样本量较小的时候并不优秀, 这时使用插入排序会更快
 *
 * 算法 时间       空间     稳定性
 * 选择 O(N^2)    O(1)    无
 * 冒泡 O(N^2)    O(1)    有
 * 插入 O(N^2)    O(1)    有
 * ========================
 * 归并 O(N*logN) O(N)    有
 * 快排 O(N*logN) O(logN) 无
 * 堆排 O(N*logN) O(1)    无
 * ========================
 * 计数 O(N^2)    O(M)    有
 * 基数 O(N^2)    O(N)    有
 */
// 选择排序: 一直找最小的数; 不具有稳定性
export function selectionSort(xs: number[]): void {
  const len = xs.length
  for (let i = 0; i < len; i++) {
    // 从头到尾遍历每一个元素
    // 记录下最小数的下标, 初始为 i
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      // 更新 minIndex 的值
      if (xs[minIndex] > xs[j]) {
        minIndex = j
      }
    }
    // 交换 minIndex 和 i 下标的值
    swap(xs, i, minIndex)
  }
}

// 冒泡排序: 一直找最大的数; 具有稳定性
export function bubbleSort(xs: number[]): void {
  const len = xs.length
  // 每遍历一次, 最大下标就少 1 (因为最大值已经确定了)
  for (let i = len - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      // 如果前面的比后面的大, 就交换
      if (xs[j] > xs[j + 1]) {
        swap(xs, j, j + 1)
      }
    }
  }
}

// 插入排序: 确保前面的部分有序; 具有稳定性
export function insertionSort(xs: number[]): void {
  const len = xs.length
  for (let i = 1; i < len; i++) {
    for (let j = i - 1; j >= 0 && xs[j] > xs[j + 1]; j--) {
      // 从右往左比较, 遇到比 j 大的就交换
      swap(xs, j, j + 1)
    }
  }
}

// 快速排序: 分治思想, 把数组分为 3 块: 小于区, 等于区, 大于区
// 不具有稳定性
export function quickSort(xs: number[]): void {
  function process(xs: number[], left: number, right: number): void {
    if (right <= left) {
      return
    }
    // 这里 pivot 需要随机选择, 以避免当数组本身有序时 O(N^2) 的复杂度
    const pivot = getRandomInt(left, right + 1)
    const value = xs[pivot]
    // 把 pivot 的元素放在第一个
    swap(xs, left, pivot)
    // 小于区指针
    let little = left - 1
    // 大于区指针
    let big = right + 1
    for (let i = left + 1; i < big; i++) {
      if (xs[i] < value) {
        // 小于区扩大边界
        little++
        swap(xs, little, i)
      } else if (xs[i] > value) {
        // 大于区扩大边界
        big--
        swap(xs, big, i)
        // 这里 i-- 的原因是, 从大于区换过来的数还没有比对过, 所以 i 不能自增, 需要停在原地
        i--
      }
    }
    process(xs, left, little)
    process(xs, big, right)
  }

  process(xs, 0, xs.length - 1)
}

// 归并排序: 分治: O(N*logN); 具有稳定性
// 这种类型的递归算法的时间复杂度计算公式: T(N) = a * T(N/b) + O(N^d)
// 其中 a, b, d 都为常数
// a: 递归的子问题的个数; b: 每个子问题占据整个问题规模 N 的倒数; d: 处理子问题外, 其他算法步骤的时间复杂度
// if logba > d, T(N) = O(N^logba); if logba < d, T(N) = O(N^d); if logba == d, T(N) = O(N^d * logN)
export function mergeSort(xs: number[]): void {
  function process(xs: number[], left: number, right: number): void {
    if (right <= left) {
      return
    }
    const mid = left + ((right - left) >> 1)
    // 先把两部分排好序, 最后把他们合并起来
    process(xs, left, mid)
    process(xs, mid + 1, right)

    let i = left
    let j = mid + 1
    const helper: number[] = []
    while (i <= mid || j <= right) {
      if (i > mid) {
        // 左组越界, 把剩余右组的元素 push 进去
        for (let k = j; k <= right; k++) {
          helper.push(xs[k])
        }
        break
      }
      if (j > right) {
        // 右组越界, 把剩余左组的元素 push 进去
        for (let k = i; k <= mid; k++) {
          helper.push(xs[k])
        }
        break
      }

      const a = xs[i]
      const b = xs[j]

      if (a > b) {
        helper.push(b)
        j++
      } else {
        helper.push(a)
        i++
      }
    }

    for (let k = 0; k < helper.length; k++) {
      xs[left + k] = helper[k]
    }
  }

  process(xs, 0, xs.length - 1)
}

// 堆排序 O(N*logN); 不具有稳定性
export function heapSort(xs: number[]): void {
  // 先把数组变成大顶堆
  const len = xs.length
  // 从后往前遍历, 对每个数执行 heapify, 可以把数组变成大顶堆的时间复杂度降低为 O(N)
  for (let i = len - 1; i >= 0; i--) {
    heapify(xs, i, len)
  }

  // 如果题目要求是逐个的提供数字, 然后变成大顶堆, 则只能对每个数字逐个调用 heapInsert 方法
  // 这样的时间复杂度是 O(N*logN)
  // for (let i = 0; i < len; i++) {
  //   heapInsert(xs, i);
  // }

  let heapSize = len
  while (heapSize > 1) {
    // 再逐个交换最大值和数组末尾值
    swap(xs, 0, heapSize - 1)
    // 交换之后, 当前最大值就在数组末尾了, 接着将堆容量减 1, 不再关注最后的最大数
    heapSize--
    // 然后需要把交换后的子数组 (heapSize - 1) 再变为大顶堆
    heapify(xs, 0, heapSize)
  }

  // function heapInsert(xs: number[], index: number): void {
  //   let j = index
  //   while (j) {
  //     // 父节点的下标
  //     const k = Math.floor((j - 1) / 2)
  //     if (xs[j] > xs[k]) {
  //       // 比父大就交换位置
  //       swap(xs, j, k)
  //       j = k
  //     } else {
  //       break
  //     }
  //   }
  // }

  function heapify(xs: number[], index: number, heapSize: number): void {
    let i = index
    // 如果 i 处有孩子, 并且它比其中一个孩子小, 则下沉
    let leftIndex = i * 2 + 1
    while (leftIndex < heapSize) {
      const rightIndex = leftIndex + 1
      const maxIndex =
        rightIndex < heapSize && xs[rightIndex] > xs[leftIndex] ? rightIndex : leftIndex
      // 如果 i 处有孩子, 并且它比其中一个孩子小, 则下沉
      if (xs[i] < xs[maxIndex]) {
        swap(xs, i, maxIndex)
        i = maxIndex
        leftIndex = i * 2 + 1
      } else {
        break
      }
    }
  }
}

// 交换数组中元素的位置
function swap(xs: number[], i: number, j: number): void {
  ;[xs[i], xs[j]] = [xs[j], xs[i]]
}

// 获取一个随机数: [min, max)
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}
