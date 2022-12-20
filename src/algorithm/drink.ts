/**
 * 1 块钱买一瓶饮料
 * n 个空瓶换一瓶饮料
 * 可以找老板借空瓶, 但是借多少必须还多少
 *
 * 输入: 钱数
 * 返回: 能喝多少瓶饮料
 * @param money
 * @param bottleCount
 */

export function drink(money: number, bottleCount: number): number {
  // 单独搞个函数计算 count 个空瓶能喝多少瓶饮料
  function bottle(count: number): number {
    // 如果剩 0 个或 1 个空瓶, 则不能借, 因为借 2 个或 3 个空瓶, 最后也还不上
    if (count <= bottleCount - 2) {
      return 0;
    }
    // 如果剩 2 个空瓶, 则可以借, 因为借 1 个空瓶, 换一瓶饮料, 喝完后刚好可以还 1 个空瓶
    if (count === bottleCount - 1) {
      return 1;
    }

    const n = Math.floor(count / bottleCount);
    const r = count % bottleCount;
    return n + bottle(n + r);
  }

  return money + bottle(money);
}

type Tree = {
  id: number;
  name: string;
  pid: number;
  children: Tree[];
};

type Node = Omit<Tree, "children">;
export function arrToTree(arr: Node[], pid: number): Tree[] {
  const res: Tree[] = [];

  const map = new Map<number, Tree>();
  for (const item of arr) {
    map.set(item.id, {
      ...item,
      children: [],
    });
  }

  for (const item of arr) {
    const { id, pid } = item;
    const node = map.get(id) as Tree;
    if (pid === 0) {
      res.push(node);
    } else {
      const parentNode = map.get(pid) as Tree;
      parentNode.children.push(node);
    }
  }

  return res;
}
