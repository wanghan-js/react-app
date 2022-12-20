/**
 * 415. 字符串相加
 * 简单
 * 640
 * 相关企业
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 *
 * 你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。
 *
 *
 *
 * 示例 1：
 *
 * 输入：num1 = "11", num2 = "123"
 * 输出："134"
 * 示例 2：
 *
 * 输入：num1 = "456", num2 = "77"
 * 输出："533"
 * 示例 3：
 *
 * 输入：num1 = "0", num2 = "0"
 * 输出："0"
 *
 *
 *
 *
 * 提示：
 *
 * 1 <= num1.length, num2.length <= 104
 * num1 和num2 都只包含数字 0-9
 * num1 和num2 都不包含任何前导零
 */
export function addStrings(num1: string, num2: string): string {
  let result = "";
  let carry = 0;

  // 先将两个字符串变成同样的长度
  const l1 = num1.length;
  const l2 = num2.length;
  const maxL = Math.max(l1, l2);
  const n1 = "0".repeat(maxL - l1) + num1;
  const n2 = "0".repeat(maxL - l2) + num2;

  for (let i = maxL - 1; i >= 0; i--) {
    const a = Number(n1[i]);
    const b = Number(n2[i]);
    const sum = a + b + carry;
    result = (sum % 10) + result;
    if (sum >= 10) {
      carry = 1;
    } else {
      carry = 0;
    }
  }

  if (carry) {
    result = carry + result;
  }

  return result;
}

const a = await new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});
console.log(a);
