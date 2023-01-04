/**
 * 一种特殊的单链表节点类描述如下
 * random 指针是单链表节点结构中新增的指针, random 可能指向链表中的任意一个节点 (包括它自己), 也可能指向 null
 * 给定一个由 Node 节点类型组成的无环单链表 (无环指的是 next 指针不会形成环, random 指针可以任意指) 的头结点 head
 * 请实现一个函数完成这个链表的复制, 并返回复制的新链表的头结点
 * [要求]: 时间复杂度 O(N), 额外空间复杂度 O(1)
 */
export class NodeWithRandom {
  constructor(
    public value: number,
    public next: NodeWithRandom | null,
    public random: NodeWithRandom | null,
  ) {}
  toString(): string {
    let s = ''
    let p: NodeWithRandom | null = new NodeWithRandom(this.value, this.next, this.random)
    while (p) {
      s += `value: ${p.value}; random: ${p.random ? p.random.value : 'null'} | `
      p = p.next
    }
    s = s.slice(0, -3)
    return s
  }
}

// 简单方法, 使用 Map, 额外空间复杂度 O(N)
export function cloneRandom(head: NodeWithRandom | null): NodeWithRandom | null {
  if (!head) {
    return null
  }
  const map = new Map<NodeWithRandom, NodeWithRandom>()
  let p: NodeWithRandom | null = head
  while (p) {
    const node = new NodeWithRandom(p.value, null, null)
    map.set(p, node)
    p = p.next
  }
  p = head
  while (p) {
    const next = p.next
    const random = p.random
    const node = map.get(p) as NodeWithRandom
    if (next) {
      node.next = map.get(next) as NodeWithRandom
    } else {
      node.next = null
    }
    if (random) {
      node.random = map.get(random) as NodeWithRandom
    } else {
      node.random = null
    }
    p = p.next
  }
  return map.get(head) as NodeWithRandom
}

// 进阶解法, 额外空间复杂度 O(1)
export function cloneRandom2(head: NodeWithRandom | null): NodeWithRandom | null {
  if (!head) {
    return null
  }
  // 遍历每个节点, 复制一个节点放在它的后面, 本质上是利用复制节点和现有节点之间的位置关系, 来避免 hash 表的使用
  let p: NodeWithRandom | null = head
  while (p) {
    const next: NodeWithRandom | null = p.next
    p.next = new NodeWithRandom(p.value, next, null)
    p = next
  }
  p = head
  // 两个一组遍历链表, 给复制节点的 random 指针赋值
  while (p && p.next) {
    const copy: NodeWithRandom | null = p.next
    if (p.random) {
      copy.random = p.random.next
    } else {
      copy.random = null
    }
    p = copy.next
  }
  // 最后将链表分开, 得到复制后的链表头结点
  p = head
  const copyHead = head.next
  while (p && p.next) {
    const copy: NodeWithRandom = p.next
    const next = copy.next
    copy.next = next ? next.next : null
    p.next = next
    p = next
  }
  return copyHead
}
