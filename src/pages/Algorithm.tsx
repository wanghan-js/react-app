import { sortArrayDistanceLessThanK } from '@/algorithm/heap/sortArrayDistanceLessThanK'

export function Algorithm() {
  const input = [2, 4, 1, 3, 5, 7, 6, 9, 8]
  const inputDisplay = input.slice().join(', ')
  sortArrayDistanceLessThanK(input, 2)
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
