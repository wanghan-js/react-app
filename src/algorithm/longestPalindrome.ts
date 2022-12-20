/**
 * 5. 最长回文子串
 * 中等
 * 5.9K
 * 相关企业
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 * 示例 2：
 *
 * 输入：s = "cbbd"
 * 输出："bb"
 *
 *
 * 提示：
 *
 * 1 <= s.length <= 1000
 * s 仅由数字和英文字母组成
 */
export function longestPalindrome(s: string): string {
  const len = s.length;
  // 单个字符的串一定是回文串, 直接返回
  if (len === 1) {
    return s;
  }

  // 记录下最大回文子串的起始 index 和长度
  let longestIndex = 0;
  let longestLen = 1;

  // 动态规划, 空间换时间
  const dp: boolean[][] = [];

  // 初始化 dp, dp 的状态表示为 从 left 到 right 下标内的子串是否为回文串
  for (let i = 0; i < len; i++) {
    dp[i] = [];
    for (let j = 0; j < len; j++) {
      // 单个字符一定是回文, 否则初始化为 false
      dp[i][j] = i === j;
    }
  }

  for (let right = 1; right < len; right++) {
    for (let left = 0; left < right; left++) {
      /**
       * 这里的判断是关键
       * 首先判断 left 和 right 的字符是否相等
       * 如果不相等肯定不是回文子串
       * 如果相等, 则如果子串的长度为 2 或者 3, 那肯定是回文子串
       * 如果子串的长度大于 3, 则判断 dp 中保存的上一个维度的字段 (长度减 2) 是否是回文子串
       */
      if (
        s[left] === s[right] &&
        (right - left <= 2 || dp[right - 1][left + 1])
      ) {
        dp[right][left] = true;
        const len = right - left + 1;
        if (len > longestLen) {
          longestLen = len;
          longestIndex = left;
        }
      }
    }
  }

  return s.slice(longestIndex, longestIndex + longestLen);
}
