import { Trie } from '@/algorithm/trie'

export function Algorithm() {
  const input = ['abc', 'abcde', 'def', 'abcd', 'bcde', 'abcdefes', 'a', 'b', 'bc']
  const inputDisplay = input.slice().join(', ')
  const trie = new Trie()
  for (const word of input) {
    trie.insert(word)
  }
  const output = trie.toString()

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
