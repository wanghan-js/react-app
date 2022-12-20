/**
 * 三数之和
 *
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
 *
 * 你返回所有和为 0 且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 解释：
 * nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
 * nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
 * nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
 * 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
 * 注意，输出的顺序和三元组的顺序并不重要。
 * 示例 2：
 *
 * 输入：nums = [0,1,1]
 * 输出：[]
 * 解释：唯一可能的三元组和不为 0 。
 * 示例 3：
 *
 * 输入：nums = [0,0,0]
 * 输出：[[0,0,0]]
 * 解释：唯一可能的三元组和为 0 。
 *
 *
 * 提示：
 *
 * 3 <= nums.length <= 3000
 * -105 <= nums[i] <= 105
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/3sum
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
export function threeSum(nums: number[]): number[][] {
  // 特殊判定, 如果数组长度小于 3, 则不可能有解, 直接返回空数组
  if (nums.length < 3) {
    return [];
  }

  // 先对数组排序
  nums.sort((a, b) => a - b);

  const result: number[][] = [];

  const count = nums.length;
  for (let i = 0; i < count; i += 1) {
    const num = nums[i];
    if (num > 0) {
      // 如果 num 大于 0, 则后面的元素都大于 0, 没有继续遍历的必要了
      return result;
    }
    if (i > 0 && num === nums[i - 1]) {
      // 当前遍历的元素跟上一个元素一样, 这时需要跳过, 避免出现重复解
      // 因为如果值一样的话, 后面发生的一切都会一样, 这样就会出现重复解
      continue;
    }

    // 左右双指针
    let l = i + 1;
    let r = count - 1;

    while (l < r) {
      if (num + nums[l] + nums[r] === 0) {
        // 找到一组, 更新结果
        result.push([num, nums[l], nums[r]]);
        // 然后更新左右指针
        while (l < r && nums[l] === nums[l + 1]) {
          // 当左值跟它下一个元素值一样时, 需要跳过, 避免出现重复解
          l += 1;
        }
        while (l < r && nums[r] === nums[r - 1]) {
          // 当右值跟它下一个元素值一样时, 需要跳过, 避免出现重复解
          r -= 1;
        }
        // 这时需要把 l 和 r 更新到他们下一个不重复的位置上
        l += 1;
        r -= 1;
        // 在这里可以确保左值和右值都跟他们上一次的值不一样
      } else if (num + nums[l] + nums[r] > 0) {
        // 三数之和大于 0, 说明右值太大, 需要将右指针左移
        r -= 1;
      } else {
        // 三数之和小于 0, 说明左值太小, 需要将左指针右移
        l += 1;
      }
    }
  }

  return result;
}
