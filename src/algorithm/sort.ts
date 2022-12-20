// 各种排序算法

// 选择排序: 一直找最小的数

export function selectionSort(xs: number[]): void {
  const len = xs.length;
  for (let i = 0; i < len; i++) {
    // 从头到尾遍历每一个元素
    // 记录下最小数的下标, 初始为 i
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      // 更新 minIndex 的值
      if (xs[minIndex] > xs[j]) {
        minIndex = j;
      }
    }
    // 交换 minIndex 和 i 下标的值
    swap(xs, i, minIndex);
  }
}

// 冒泡排序: 一直找最大的数
export function bubbleSort(xs: number[]): void {
  const len = xs.length;
  // 每遍历一次, 最大下标就少 1 (因为最大值已经确定了)
  for (let i = len - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      // 如果前面的比后面的大, 就交换
      if (xs[j] > xs[j + 1]) {
        swap(xs, j, j + 1);
      }
    }
  }
}

// 插入排序: 确保前面的部分有序
export function insertionSort(xs: number[]): void {
  const len = xs.length;
  for (let i = 1; i < len; i++) {
    for (let j = i - 1; j >= 0 && xs[j] > xs[j + 1]; j--) {
      // 从右往左比较, 遇到比 j 大的就交换
      swap(xs, j, j + 1);
    }
  }
}

// 快速排序: 分治思想, 把数组分为 3 块: 小于区, 等于区, 大于区
export function quickSort(xs: number[]): void {
  function process(xs: number[], left: number, right: number): void {
    if (right <= left) {
      return;
    }
    // 这里 pivot 需要随机选择, 以避免当数组本身有序时 O(N^2) 的复杂度
    const pivot = getRandomInt(left, right + 1);
    const value = xs[pivot];
    // 把 pivot 的元素放在第一个
    swap(xs, left, pivot);
    // 小于区指针
    let little = left - 1;
    // 大于区指针
    let big = right + 1;
    for (let i = left + 1; i < big; i++) {
      if (xs[i] < value) {
        // 小于区扩大边界
        little++;
        swap(xs, little, i);
      } else if (xs[i] > value) {
        // 大于区扩大边界
        big--;
        swap(xs, big, i);
        // 这里 i-- 的原因是, 从大于区换过来的数还没有比对过, 所以 i 不能自增, 需要停在原地
        i--;
      }
    }
    process(xs, left, little);
    process(xs, big, right);
  }

  process(xs, 0, xs.length - 1);
}

// 归并排序: 分治: O(N*logN)
// 这种类型的递归算法的时间复杂度计算公式: T(N) = a * T(N/b) + O(N^d)
// 其中 a, b, d 都为常数
// a: 递归的子问题的个数; b: 每个子问题占据整个问题规模 N 的倒数; d: 处理子问题外, 其他算法步骤的时间复杂度
// if logba > d, T(N) = O(N^logba); if logba < d, T(N) = O(N^d); if logba == d, T(N) = O(N^d * logN)
export function mergeSort(xs: number[]): void {
  function process(xs: number[], left: number, right: number): void {
    if (right <= left) {
      return;
    }
    const mid = left + ((right - left) >> 1);
    // 先把两部分排好序, 最后把他们合并起来
    process(xs, left, mid);
    process(xs, mid + 1, right);

    let i = left;
    let j = mid + 1;
    const helper: number[] = [];
    while (i <= mid || j <= right) {
      if (i > mid) {
        // 左组越界, 把剩余右组的元素 push 进去
        for (let k = j; k <= right; k++) {
          helper.push(xs[k]);
        }
        break;
      }
      if (j > right) {
        // 右组越界, 把剩余左组的元素 push 进去
        for (let k = i; k <= mid; k++) {
          helper.push(xs[k]);
        }
        break;
      }

      const a = xs[i];
      const b = xs[j];

      if (a > b) {
        helper.push(b);
        j++;
      } else {
        helper.push(a);
        i++;
      }
    }

    for (let k = 0; k < helper.length; k++) {
      xs[left + k] = helper[k];
    }
  }

  process(xs, 0, xs.length - 1);
}

// 堆排序 O(N*logN)
export function heapSort(xs: number[]): void {
  // 先把数组变成大顶堆
  const len = xs.length;
  // 从后往前遍历, 对每个数执行 heapify, 可以把数组变成大顶堆的时间复杂度降低为 O(N)
  for (let i = len - 1; i >= 0; i--) {
    heapify(xs, i, len);
  }

  // 如果题目要求是逐个的提供数字, 然后变成大顶堆, 则只能对每个数字逐个调用 heapInsert 方法
  // 这样的时间复杂度是 O(N*logN)
  // for (let i = 0; i < len; i++) {
  //   heapInsert(xs, i);
  // }

  let heapSize = len;
  while (heapSize > 1) {
    // 再逐个交换最大值和数组末尾值
    swap(xs, 0, heapSize - 1);
    // 交换之后, 当前最大值就在数组末尾了, 接着将堆容量减 1, 不再关注最后的最大数
    heapSize--;
    // 然后需要把交换后的子数组 (heapSize - 1) 再变为大顶堆
    heapify(xs, 0, heapSize);
  }

  function heapInsert(xs: number[], index: number): void {
    let j = index;
    while (j) {
      // 父节点的下标
      const k = Math.floor((j - 1) / 2);
      if (xs[j] > xs[k]) {
        // 比父大就交换位置
        swap(xs, j, k);
        j = k;
      } else {
        break;
      }
    }
  }

  function heapify(xs: number[], index: number, heapSize: number): void {
    let i = index;
    // 如果 i 处有孩子, 并且它比其中一个孩子小, 则下沉
    let leftIndex = i * 2 + 1;
    while (leftIndex < heapSize) {
      const rightIndex = leftIndex + 1;
      const maxIndex =
        rightIndex < heapSize && xs[rightIndex] > xs[leftIndex]
          ? rightIndex
          : leftIndex;
      // 如果 i 处有孩子, 并且它比其中一个孩子小, 则下沉
      if (xs[i] < xs[maxIndex]) {
        swap(xs, i, maxIndex);
        i = maxIndex;
        leftIndex = i * 2 + 1;
      } else {
        break;
      }
    }
  }
}

// 交换数组中元素的位置
function swap(xs: number[], i: number, j: number): void {
  [xs[i], xs[j]] = [xs[j], xs[i]];
}

// 获取一个随机数: [min, max)
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
