/**
 * 119. 杨辉三角 II
 * 简单
 * 440
 * 相关企业
 * 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。
 *
 * 在「杨辉三角」中，每个数是它左上方和右上方的数的和。
 *
 *
 *
 *
 *
 * 示例 1:
 *
 * 输入: rowIndex = 3
 * 输出: [1,3,3,1]
 * 示例 2:
 *
 * 输入: rowIndex = 0
 * 输出: [1]
 * 示例 3:
 *
 * 输入: rowIndex = 1
 * 输出: [1,1]
 *
 *
 * 提示:
 *
 * 0 <= rowIndex <= 33
 *
 *
 * 进阶：
 *
 * 你可以优化你的算法到 O(rowIndex) 空间复杂度吗？
 */
function getRow(rowIndex: number): number[] {
  // 直接构造出目标行
  const row = new Array(rowIndex + 1).fill(0);
  // 第一个元素固定为 1
  row[0] = 1;

  for (let i = 1; i <= rowIndex; i += 1) {
    for (let j = i; j > 0; j -= 1) {
      row[j] += row[j - 1];
    }
  }

  return row;
}

// xs: [5, 4, 3, 7, 8]
function localMin(xs) {
  let lo = 0;
  let hi = xs.length - 1;
  let mid = -1;
  while (lo <= hi && mid !== lo && mid !== hi) {
    if (xs[lo] < xs[lo + 1]) {
      return lo;
    } else if (xs[hi] < xs[hi - 1]) {
      return hi;
    } else {
      mid = lo + ((hi - lo) >> 1);
      const num = xs[mid];
      const left = xs[mid - 1];
      const right = xs[mid + 1];
      if (num < left && num < right) {
        return mid;
      } else if (num >= left) {
        hi = mid;
      } else {
        lo = mid;
      }
    }
  }
  return -1;
}
