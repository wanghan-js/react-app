import { heapSort } from '@/algorithm/sort'

export function Algorithm() {
  const input = [4, 5, 2, 3, 6, 1]
  heapSort(input)
  const output = input.join(', ')

  return (
    <div className={'p-4'}>
      <h1 className='mb-3 text-xl font-bold'>Algorithm</h1>

      <section className='mt-3'>
        <div>输入: {input.join(', ')}</div>
        <div>输出: {output}</div>
      </section>
    </div>
  )
}
