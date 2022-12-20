// 数组小和
// [1, 3, 4, 2, 5], 从左往右，在某个元素的左边，所有比它小的值加起来
// 1; 1, 3; 1; 1, 2, 3, 2: 全部加起来是 16

export function arrayLittleSum(
  arr: number[],
  left = 0,
  right = arr.length - 1
): number {
  // 使用归并排序的思路，在merge阶段求小和
  if (right <= left) {
    return 0;
  }

  const mid = left + ((right - left) >> 1);
  const leftSum = arrayLittleSum(arr, left, mid);
  const rightSum = arrayLittleSum(arr, mid + 1, right);

  let i = left;
  let j = mid + 1;
  let mergeSum = 0;
  const help: number[] = [];

  while (i <= mid || j <= right) {
    const leftItem = arr[i];
    const rightItem = arr[j];
    if (i > mid) {
      // 左组越界，把右组剩下的放进辅助数组
      help.push(...arr.slice(j, right + 1));
      break;
    }
    if (j > right) {
      // 右组越界，把左组剩下的放进辅助数组
      help.push(...arr.slice(i, mid + 1));
      break;
    }

    if (leftItem < rightItem) {
      help.push(leftItem);
      // 有小和
      mergeSum += (right - j + 1) * leftItem;
      i++;
    } else {
      help.push(rightItem);
      j++;
    }
  }

  // 把help数组的值替换到原数组
  for (let i = 0; i <= right - left; i++) {
    arr[left + i] = help[i];
  }

  return leftSum + rightSum + mergeSum;
}
