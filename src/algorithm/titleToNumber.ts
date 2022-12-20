/**
 * 171. Excel 表列序号
 * 简单
 * 357
 * 相关企业
 * 给你一个字符串 columnTitle ，表示 Excel 表格中的列名称。返回 该列名称对应的列序号 。
 *
 * 例如：
 *
 * A -> 1
 * B -> 2
 * C -> 3
 * ...
 * Z -> 26
 * AA -> 27
 * AB -> 28
 * ...
 *
 *
 * 示例 1:
 *
 * 输入: columnTitle = "A"
 * 输出: 1
 * 示例 2:
 *
 * 输入: columnTitle = "AB"
 * 输出: 28
 * 示例 3:
 *
 * 输入: columnTitle = "ZY"
 * 输出: 701
 *
 *
 * 提示：
 *
 * 1 <= columnTitle.length <= 7
 * columnTitle 仅由大写英文组成
 * columnTitle 在范围 ["A", "FXSHRXW"] 内
 */
function codePointOf(ch: string): number {
  return ch.codePointAt(0) as number;
}

function sizeOf(ch: string): number {
  return codePointOf(ch) - codePointOf("A") + 1;
}

export function titleToNumber(columnTitle: string): number {
  let size = 0;

  for (let i = 0; i < columnTitle.length; i += 1) {
    const ch = columnTitle[i];
    const n = sizeOf(ch);
    const weight = columnTitle.length - i - 1;
    size += Math.pow(sizeOf("Z"), weight) * n;
  }

  return size;
}
