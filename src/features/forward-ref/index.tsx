import { useRef } from 'react'
import { MyInput, MyInputRefValue } from '@/features/forward-ref/components/MyInput'

export function Form() {
  const inputRef = useRef<MyInputRefValue>(null)
  function handleClick() {
    if (!inputRef.current) {
      throw new Error('Input does not exist!')
    }
    inputRef.current.focus()
  }

  return (
    <div>
      <MyInput ref={inputRef} />
      <button type='button' onClick={handleClick}>
        Focus the input
      </button>
    </div>
  )
}
