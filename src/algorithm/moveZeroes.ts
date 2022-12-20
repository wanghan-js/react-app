/**
 * 283. 移动零
 * 简单
 * 1.8K
 * 相关企业
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 *
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 *
 *
 *
 * 示例 1:
 *
 * 输入: nums = [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 * 示例 2:
 *
 * 输入: nums = [0]
 * 输出: [0]
 *
 *
 * 提示:
 *
 * 1 <= nums.length <= 104
 * -231 <= nums[i] <= 231 - 1
 *
 *
 * 进阶：你能尽量减少完成的操作次数吗？
 */
/**
 * Do not return anything, modify nums in-place instead.
 */
export function moveZeroes(nums: number[]): void {
  // 特殊判断
  if (nums.length < 2) {
    return;
  }
  // 双指针: 一个指向首个 0 的下标; 另一个指向下一个非 0 的坐标
  let p = nums.indexOf(0);
  if (p < 0) {
    // 说明数组中没有 0, 直接返回
    return;
  }
  for (let q = p + 1; q < nums.length; q += 1) {
    if (nums[q] === 0) {
      // 跳过后面的 0
      continue;
    }
    // 交换 0 和非 0
    nums[p] = nums[q];
    nums[q] = 0;
    p += 1;
  }
}
