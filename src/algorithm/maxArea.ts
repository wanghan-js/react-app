/**
 * 11. 盛最多水的容器
 * 中等
 * 3.9K
 * 相关企业
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 *
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 *
 * 返回容器可以储存的最大水量。
 *
 * 说明：你不能倾斜容器。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 * 示例 2：
 *
 * 输入：height = [1,1]
 * 输出：1
 *
 *
 * 提示：
 *
 * n == height.length
 * 2 <= n <= 105
 * 0 <= height[i] <= 104
 * @param height
 */
export function maxArea(height: number[]): number {
  let max = 0
  let i = 0
  let j = height.length - 1
  // 首尾双指针向中间靠拢
  while (i !== j) {
    // 更新最大容量
    max = Math.max(max, (j - i) * Math.min(height[i], height[j]))
    // 更新 i 和 j 的值: 移动值较小的那个指针, 因为这样才有可能找到较大的面积
    if (height[i] <= height[j]) {
      i++
    } else {
      j--
    }
  }
  return max
}
