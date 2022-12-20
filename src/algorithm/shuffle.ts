export function shuffle(xs: number[]): number[] {
  const arr = xs.slice();
  // 每个元素跟它的下标及它的下标之后的随机元素调换位置, 可实现洗牌效果
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const k = randomInt(i, len);
    [arr[i], arr[k]] = [arr[k], arr[i]];
  }
  return arr;
}

function randomInt(a: number, b: number): number {
  return a + Math.floor(Math.random() * (b - a));
}
