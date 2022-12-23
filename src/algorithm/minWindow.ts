/**
 * 76. 最小覆盖子串
 * 困难
 * 2.3K
 * 相关企业
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 *
 *
 *
 * 注意：
 *
 * 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
 * 如果 s 中存在这样的子串，我们保证它是唯一的答案。
 *
 *
 * 示例 1：
 *
 * 输入：s = "ADOBECODEBANC", t = "ABC"
 * 输出："BANC"
 * 示例 2：
 *
 * 输入：s = "a", t = "a"
 * 输出："a"
 * 示例 3:
 *
 * 输入: s = "a", t = "aa"
 * 输出: ""
 * 解释: t 中两个字符 'a' 均应包含在 s 的子串中，
 * 因此没有符合条件的子字符串，返回空字符串。
 *
 *
 * 提示：
 *
 * 1 <= s.length, t.length <= 105
 * s 和 t 由英文字母组成
 *
 *
 * 进阶：你能设计一个在 o(n) 时间内解决此问题的算法吗？
 */
export function minWindow(s: string, t: string): string {
  let max = ''
  const window = new Map()
  const needs = new Map()
  for (const ch of t) {
    window.set(ch, 0)
    needs.set(ch, (needs.get(ch) ?? 0) + 1)
  }
  let left = 0
  let right = 0
  const totalCount = [...needs.keys()].length
  let validCount = 0
  while (right < s.length) {
    const ch = s[right]
    right++
    if (needs.get(ch) > 0) {
      // 匹配到目标字符
      // 将其加入 window 中
      window.set(ch, window.get(ch) + 1)
      if (window.get(ch) === needs.get(ch)) {
        // 如果已经满足了这个字符的数量, 做下标记
        validCount++
      }
    }

    while (validCount === totalCount) {
      // 说明找到子串, 需要更新最小子串
      if (max) {
        max = max.length >= right - left ? s.slice(left, right) : max
      } else {
        max = s.slice(left, right)
      }
      // 说明找到子串, 需要往左移动指针, 直到不满足子串的情况
      const ch = s[left]
      left++
      if (needs.get(ch) > 0) {
        // 更新窗口
        if (window.get(ch) === needs.get(ch)) {
          // 说明子串不再满足条件
          validCount--
        }
        window.set(ch, window.get(ch) - 1)
      }
    }
  }
  return max
}
