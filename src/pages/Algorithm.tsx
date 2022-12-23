import { cardinalSort } from '@/algorithm/桶排序/cardinalSort'

export function Algorithm() {
  const input = [100, 36, 983, 228, 83, 9, 381]
  const inputDisplay = input.slice().join(', ')
  cardinalSort(input)
  const output = input.join(', ')

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
