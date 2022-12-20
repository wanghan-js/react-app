/**
 * 7. 整数反转
 * 中等
 * 3.7K
 * 相关企业
 * 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
 *
 * 如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。
 *
 * 假设环境不允许存储 64 位整数（有符号或无符号）。
 *
 *
 * 示例 1：
 *
 * 输入：x = 123
 * 输出：321
 * 示例 2：
 *
 * 输入：x = -123
 * 输出：-321
 * 示例 3：
 *
 * 输入：x = 120
 * 输出：21
 * 示例 4：
 *
 * 输入：x = 0
 * 输出：0
 *
 *
 * 提示：
 *
 * -231 <= x <= 231 - 1
 */
export function reverse(x: number): number {
  let n = Math.abs(x);

  const queue = [];
  while (n) {
    queue.push(n % 10);
    n = Math.floor(n / 10);
  }

  let sum = 0;
  while (queue.length > 0) {
    const n = queue.shift() as number;
    sum += n * Math.pow(10, queue.length);
  }

  if (sum > Math.pow(2, 31) - 1) {
    return 0;
  } else {
    if (x < 0) {
      return -sum;
    } else {
      return sum;
    }
  }
}
