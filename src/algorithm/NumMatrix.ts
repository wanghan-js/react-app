/**
 * 304. 二维区域和检索 - 矩阵不可变
 * 中等
 * 448
 * 相关企业
 * 给定一个二维矩阵 matrix，以下类型的多个请求：
 *
 * 计算其子矩形范围内元素的总和，该子矩阵的 左上角 为 (row1, col1) ，右下角 为 (row2, col2) 。
 * 实现 NumMatrix 类：
 *
 * NumMatrix(int[][] matrix) 给定整数矩阵 matrix 进行初始化
 * int sumRegion(int row1, int col1, int row2, int col2) 返回 左上角 (row1, col1) 、右下角 (row2, col2) 所描述的子矩阵的元素 总和 。
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入:
 * ["NumMatrix","sumRegion","sumRegion","sumRegion"]
 * [[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2],[1,2,2,4]]
 * 输出:
 * [null, 8, 11, 12]
 *
 * 解释:
 * NumMatrix numMatrix = new NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]);
 * numMatrix.sumRegion(2, 1, 4, 3); // return 8 (红色矩形框的元素总和)
 * numMatrix.sumRegion(1, 1, 2, 2); // return 11 (绿色矩形框的元素总和)
 * numMatrix.sumRegion(1, 2, 2, 4); // return 12 (蓝色矩形框的元素总和)
 *
 *
 * 提示：
 *
 * m == matrix.length
 * n == matrix[i].length
 * 1 <= m, n <= 200
 * -105 <= matrix[i][j] <= 105
 * 0 <= row1 <= row2 < m
 * 0 <= col1 <= col2 < n
 * 最多调用 104 次 sumRegion 方法
 */
export class NumMatrix {
  // 前缀和数组
  private preSums: number[][]

  constructor(private matrix: number[][]) {
    const row = matrix.length
    const col = matrix[0].length
    // 初始化 preSums 二维数组
    this.preSums = new Array(row + 1)
    for (let i = 0; i < row + 1; i++) {
      this.preSums[i] = new Array(col + 1).fill(0)
    }

    for (let i = 1; i < row + 1; i++) {
      for (let j = 1; j < col + 1; j++) {
        // 核心逻辑, 画图考虑矩形相交
        this.preSums[i][j] =
          matrix[i - 1][j - 1] +
          this.preSums[i - 1][j] +
          this.preSums[i][j - 1] -
          this.preSums[i - 1][j - 1]
      }
    }
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    return (
      this.preSums[row2 + 1][col2 + 1] -
      this.preSums[row1][col2 + 1] -
      this.preSums[row2 + 1][col1] +
      this.preSums[row1][col1]
    )
  }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
