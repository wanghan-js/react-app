import { useRef, useState } from 'react'

export function Stopwatch() {
  const [startTime, setStartTime] = useState(0)
  const [now, setNow] = useState(0)
  const timer = useRef(0)

  let secondsPassed = 0
  if (startTime > 0 && now > 0) {
    secondsPassed = (now - startTime) / 1000
  }

  function handleStart() {
    setStartTime(Date.now())
    setNow(Date.now())

    timer.current = window.setInterval(() => {
      setNow(Date.now())
    }, 10)
  }

  function handleStop() {
    window.clearInterval(timer.current)
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  )
}
