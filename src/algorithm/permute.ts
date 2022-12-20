/**
 * 46. 全排列
 * 中等
 * 2.3K
 * 相关企业
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 示例 2：
 *
 * 输入：nums = [0,1]
 * 输出：[[0,1],[1,0]]
 * 示例 3：
 *
 * 输入：nums = [1]
 * 输出：[[1]]
 *
 *
 * 提示：
 *
 * 1 <= nums.length <= 6
 * -10 <= nums[i] <= 10
 * nums 中的所有整数 互不相同
 */
export function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  const track: number[] = [];

  // 回溯函数, 递归调用
  function backtrack() {
    // 没有可选的数字了, 所有已选的数字构成一个路径, push 到返回值中
    if (track.length === nums.length) {
      res.push(track.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      if (track.includes(num)) {
        continue;
      }
      track.push(num);
      backtrack();
      track.pop();
    }
  }

  backtrack();

  return res;
}
