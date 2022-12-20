/**
 * 岛屿的最大面积
 *
 * 给你一个大小为 m x n 的二进制矩阵 grid 。
 *
 * 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。
 *
 * 岛屿的面积是岛上值为 1 的单元格的数目。
 *
 * 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
 * 输出：6
 * 解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
 * 示例 2：
 *
 * 输入：grid = [[0,0,0,0,0,0,0,0]]
 * 输出：0
 *
 *
 * 提示：
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 50
 * grid[i][j] 为 0 或 1
 */
export function maxAreaOfIsland(grid: number[][]): number {
  if (grid.length === 0) {
    return 0;
  }

  let maxArea = 0;
  const width = grid[0].length;
  const height = grid.length;
  // 记录访问过的 cell
  const visited: number[][] = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      // 遍历每一个单元格
      const cell = grid[i][j];
      if (cell === 1) {
        // 发现岛屿入口, 使用广度优先搜索 (BFS), 计算岛屿面积
        const area = bfs(j, i, grid);
        // 更新最大岛屿面积
        if (area > maxArea) {
          maxArea = area;
        }
      }
    }
  }

  function bfs(x: number, y: number, grid: number[][]): number {
    if (visited.find(([x1, y1]) => x1 === x && y1 === y)) {
      return 0;
    }
    let area = 1;
    visited.push([x, y]);
    // 上
    if (y - 1 >= 0 && grid[y - 1][x] === 1) {
      area += bfs(x, y - 1, grid);
    }

    // 右
    if (x + 1 <= width - 1 && grid[y][x + 1] === 1) {
      area += bfs(x + 1, y, grid);
    }

    // 下
    if (y + 1 <= height - 1 && grid[y + 1][x] === 1) {
      area += bfs(x, y + 1, grid);
    }

    // 左
    if (x - 1 >= 0 && grid[y][x - 1] === 1) {
      area += bfs(x - 1, y, grid);
    }

    return area;
  }

  return maxArea;
}
