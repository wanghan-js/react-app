import { cloneRandom2, NodeWithRandom } from '@/algorithm/链表/cloneRandom'

export function Algorithm() {
  const head = new NodeWithRandom(1, null, null)
  const node1 = new NodeWithRandom(2, null, null)
  const node2 = new NodeWithRandom(3, null, null)
  const node3 = new NodeWithRandom(4, null, null)
  head.next = node1
  head.random = node3
  node1.next = node2
  node1.random = node1
  node2.next = node3
  node2.random = null
  node3.random = head
  const copyNode = cloneRandom2(head)
  const inputDisplay = head.toString()
  const output = copyNode?.toString()

  return (
    <div className={'p-4'}>
      <h1 className='mb-3 text-xl font-bold'>Algorithm</h1>

      <section className='mt-3'>
        <div>输入: {inputDisplay}</div>
        <div>输出: {output}</div>
      </section>
    </div>
  )
}
