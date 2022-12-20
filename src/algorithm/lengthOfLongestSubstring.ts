/**
 * 3. 无重复字符的最长子串
 * 中等
 * 8.4K
 * 相关企业
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 *
 *
 * 示例 1:
 *
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 示例 2:
 *
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 * 示例 3:
 *
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 *      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 *
 * 提示：
 *
 * 0 <= s.length <= 5 * 104
 * s 由英文字母、数字、符号和空格组成
 */
export function lengthOfLongestSubstring(s: string): number {
  if (!s) {
    return 0;
  }
  const dp = [s[0]];
  let max: number = 1;
  for (let i = 1; i < s.length; i++) {
    const ch = s[i];
    const lastDp = dp[i - 1];
    const index = lastDp.indexOf(ch);
    if (index >= 0) {
      dp[i] = lastDp.slice(index + 1) + ch;
    } else {
      dp[i] = dp[i - 1] + ch;
    }
    max = Math.max(max, dp[i].length);
  }
  return max;
}

// 滑动窗口解法
// function lengthOfLongestSubstring(s: string): number {
//   if (!s) {
//     return 0;
//   }
//   let left = 0;
//   let right = 0;
//   let max = 0;
//   const window = new Map()
//   while (right < s.length) {
//     // 窗口往右扩大
//     const ch = s[right]
//     right += 1
//
//     // 更新窗口内数据
//     window.set(ch, (window.get(ch) || 0) + 1)
//
//     while (window.get(ch) > 1) {
//       const leftCh = s[left]
//       left += 1
//       window.set(leftCh, window.get(leftCh) - 1)
//     }
//
//     max = Math.max(max, right - left)
//   }
//   return max
// }
