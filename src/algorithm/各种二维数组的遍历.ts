// 回形数组的展开
export function 回形数组(arr: number[][]): number[] {
  if (arr.length === 0) {
    return [];
  }

  const res = [];
  const row = arr.length;
  const column = arr[0].length;
  const count = row * column;

  // 上右下左 4 条边遍历的次数
  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;

  while (res.length < count) {
    // 每遍历一次是一大圈
    // 每一大圈由 4 个小循环构成
    // 每次循环都要更新 4 条边的值

    // 上
    if (row - top - bottom > 0) {
      for (let i = left; i < column - right; i++) {
        res.push(arr[top][i]);
      }
      top += 1;
    }

    if (column - left - right > 0) {
      // 右
      for (let i = top; i < row - bottom; i++) {
        res.push(arr[i][column - 1 - right]);
      }
      right += 1;
    }

    if (row - top - bottom > 0) {
      // 下
      for (let i = column - 1 - right; i >= left; i--) {
        res.push(arr[row - 1 - bottom][i]);
      }
      bottom += 1;
    }

    if (column - left - right > 0) {
      // 左
      for (let i = row - 1 - bottom; i >= top; i--) {
        res.push(arr[i][left]);
      }
      left += 1;
    }
  }

  return res;
}

// 4 个方向斜着遍历二维数组

// 构造测试二维数组 N*N
const arr: number[][] = [];
for (let i = 0; i < 5; i++) {
  const row: number[] = [];
  for (let j = 0; j < 5; j++) {
    row.push(i * 5 + j + 1);
  }
  arr.push(row);
}

const topRight: number[] = [];
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - i; j++) {
    topRight.push(arr[j][i + j]);
  }
}

const bottomLeft: number[] = [];
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - i; j++) {
    bottomLeft.push(arr[i + j][j]);
  }
}

const topLeft: number[] = [];
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - i; j++) {
    topLeft.push(arr[j][arr.length - j - i - 1]);
  }
}

const bottomRight: number[] = [];
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - i; j++) {
    bottomRight.push(arr[i + j][arr.length - j - 1]);
  }
}

console.log(topLeft);
console.log(topRight);
console.log(bottomLeft);
console.log(bottomRight);

// 锯齿形遍历二维数组
const testArr1 = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
];

export function 锯齿形遍历(array: number[][]) {
  const result: number[] = [];
  const m = array.length;
  let n = array[0].length;
  n = n % 2 === 0 ? n : n + 1;
  let i = 0;
  while (i < n) {
    // 左边
    for (let j = 0; j < m; j++) {
      if (j % 2 === 0) {
        if (array[j][i] !== undefined) {
          result.push(array[j][i]);
        }
      } else {
        if (array[j][i + 1] !== undefined) {
          result.push(array[j][i + 1]);
        }
      }
    }
    i++;

    // 右边
    for (let j = 0; j < m; j++) {
      if (j % 2 === 0) {
        if (array[j][i] !== undefined) {
          result.push(array[j][i]);
        }
      } else {
        if (array[j][i - 1] !== undefined) {
          result.push(array[j][i - 1]);
        }
      }
    }
    i++;
  }

  return result;
}
console.log(锯齿形遍历(testArr1).join(", "));
// > 0, 6, 10, 16, 20, 1, 5, 11, 15, 21, 2, 8, 12, 18, 22, 3, 7, 13, 17, 23, 4, 14, 24, 9, 19

// 斜着从上到下遍历数组
const testArr2 = [
  [1, 2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, 31, 32],
];

function 斜着遍历数组(array: number[][]) {
  const result: number[] = [];

  const m = array.length;
  const n = array[0].length;

  for (let i = 0; i < n + m - 1; i++) {
    for (let j = 0; j < m; j++) {
      if (array[j][i - j] !== undefined) {
        result.push(arr[j][i - j]);
      }
    }
  }

  return result;
}
console.log(斜着遍历数组(testArr2).join(", "));
// > 1, 2, 9, 3, 10, 17, 4, 11, 18, 25, 5, 12, 19, 26, 6, 13, 20, 27 ...
