import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

function Playground() {
  const [text, setText] = useState('a')

  useEffect(() => {
    function onTimeout() {
      console.log('⏰ ' + text)
    }
    console.log('🔵 Schedule "' + text + '" log')
    const timeoutId = window.setTimeout(onTimeout, 3000)

    return () => {
      console.log('🟡 Cancel "' + text + '" log')
      window.clearTimeout(timeoutId)
    }
  }, [text])

  return (
    <>
      <label>
        What to log: <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <h1>{text}</h1>
    </>
  )
}

export function Effect() {
  const [show, setShow] = useState(false)

  return (
    <>
      <button onClick={() => setShow(!show)}>{show ? 'Unmount' : 'Mount'} the component</button>
      {show && <hr />}
      {show && <Playground />}
    </>
  )
}
