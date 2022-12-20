/**
 * 836. 矩形重叠
 * 简单
 * 272
 * 相关企业
 * 矩形以列表 [x1, y1, x2, y2] 的形式表示，其中 (x1, y1) 为左下角的坐标，(x2, y2) 是右上角的坐标。矩形的上下边平行于 x 轴，左右边平行于 y 轴。
 *
 * 如果相交的面积为 正 ，则称两矩形重叠。需要明确的是，只在角或边接触的两个矩形不构成重叠。
 *
 * 给出两个矩形 rec1 和 rec2 。如果它们重叠，返回 true；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：rec1 = [0,0,2,2], rec2 = [1,1,3,3]
 * 输出：true
 * 示例 2：
 *
 * 输入：rec1 = [0,0,1,1], rec2 = [1,0,2,1]
 * 输出：false
 * 示例 3：
 *
 * 输入：rec1 = [0,0,1,1], rec2 = [2,2,3,3]
 * 输出：false
 */
export function isRectangleOverlap(rec1: number[], rec2: number[]): boolean {
  const x1 = rec1[0];
  const y1 = rec1[1];
  const x2 = rec1[2];
  const y2 = rec1[3];
  const a1 = rec2[0];
  const b1 = rec2[1];
  const a2 = rec2[2];
  const b2 = rec2[3];

  if (x1 === x2 || y1 === y2 || a1 === a2 || b1 === b2) {
    // 这代表 rec1 或者 rec2 不构成矩形, 只是个线段, 无法判断是否重合
    return false;
  }

  // rec2 不在 rec1 上下左右的任何一个位置, 则判断有重叠
  return !(a2 <= x1 || a1 >= x2 || b1 >= y2 || b2 <= y1);
}
