/**
 * 498. 对角线遍历
 * 中等
 * 417
 * 相关企业
 * 给你一个大小为 m x n 的矩阵 mat ，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：mat = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,4,7,5,3,6,8,9]
 * 示例 2：
 *
 * 输入：mat = [[1,2],[3,4]]
 * 输出：[1,2,3,4]
 *
 *
 * 提示：
 *
 * m == mat.length
 * n == mat[i].length
 * 1 <= m, n <= 104
 * 1 <= m * n <= 104
 * -105 <= mat[i][j] <= 105
 */
export function findDiagonalOrder(mat: number[][]): number[] {
  const row = mat.length;
  const column = mat[0].length;
  const result = new Array(row * column).fill(0);
  let position = 0;

  for (let i = 0; i < row + column - 1; i++) {
    if (i & 1) {
      // 说明 i 是奇数, 从上往下遍历
      let x = i < column ? 0 : i - column + 1;
      let y = i < column ? i : column - 1;
      while (x < row && y >= 0) {
        result[position] = mat[x][y];
        position++;
        x++;
        y--;
      }
    } else {
      // 说明 i 是偶数, 从下往上遍历
      let x = i < row ? i : row - 1;
      let y = i < row ? 0 : i - row + 1;
      while (x >= 0 && y < column) {
        result[position] = mat[x][y];
        position++;
        x--;
        y++;
      }
    }
  }

  return result;
}
