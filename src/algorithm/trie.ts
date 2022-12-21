/**
 * 前缀树/字典树
 */
import { Queue } from '@/algorithm/queue'

class Node {
  ch = ''
  pass = 0
  end = 0
  nextNodes: Record<string, Node | null> = {}
}

export class Trie {
  private root = new Node()

  // 在前缀树中插入一个单词, 注意单词都是小写字母
  insert(word: string): void {
    if (!word) {
      return
    }
    let node = this.root
    node.pass++
    for (const ch of word) {
      if (!node.nextNodes[ch]) {
        node.nextNodes[ch] = new Node()
      }
      node = node.nextNodes[ch] as Node
      node.ch = ch
      node.pass++
    }
    node.end++
  }

  // 在前缀树中查询某个单词 word 加入过几次
  count(word: string): number {
    if (!word) {
      return 0
    }
    let node = this.root
    for (const ch of word) {
      const nextNode = node.nextNodes[ch]
      if (!nextNode) {
        return 0
      }
      node = nextNode
    }
    return node.end
  }

  // 在所有加入过的 word 中, 有几个是以 prefix 这个字符串作为前缀的
  prefixCount(prefix: string): number {
    if (!prefix) {
      return 0
    }
    let node = this.root
    for (const ch of prefix) {
      const nextNode = node.nextNodes[ch]
      if (!nextNode) {
        return 0
      }
      node = nextNode
    }
    return node.pass
  }

  // 在前缀树中删除某个单词
  delete(word: string): void {
    // 如果前缀树里压根没有这个单词, 直接返回; 只有存在, 才能删除
    if (this.count(word) === 0) {
      return
    }
    let node = this.root
    node.pass--
    for (const ch of word) {
      // 因为 word 的个数大于 0, 所以它的每个字符的节点都存在, 这里就可以使用类型断言
      const nextNode = node.nextNodes[ch] as Node
      if (nextNode.pass === 1) {
        // 说明从这个节点(包含此节点)往下所有的节点都没有存在的必要了
        node.nextNodes[ch] = null
        return
      }
      node = nextNode
      node.pass--
    }
    node.end--
  }

  toString(): string {
    // 多叉树的层序遍历
    const queue = new Queue<Node[]>()
    queue.enqueue([this.root])

    const result: string[][] = []
    while (!queue.isEmpty()) {
      const nodes = queue.dequeue() as Node[]
      const arr: string[] = []
      const layerNodes: Node[] = []
      for (const node of nodes) {
        arr.push(`ch: ${node.ch}; pass: ${node.pass}; end: ${node.end}`)
        for (const value of Object.values(node.nextNodes)) {
          if (value) {
            layerNodes.push(value)
          }
        }
      }
      // 这里要加判断, 否则队列会一直加入空数组元素, 导致死循环
      if (layerNodes.length > 0) {
        queue.enqueue(layerNodes)
      }

      result.push(arr)
    }
    return result.map((arr) => arr.join(' || ')).join('**********')
  }
}
