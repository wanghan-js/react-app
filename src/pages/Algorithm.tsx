import { calculate } from '@/algorithm/calculate'

export function Algorithm() {
  const inputDisplay = '1 - (0-2)'
  const output = calculate(inputDisplay)

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
