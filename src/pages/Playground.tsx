import TaskApp from '../features/task'
import { Stopwatch } from '@/features/stopwatch'
import { Cat } from '@/features/cat'
import { Form } from '@/features/forward-ref'
import { Effect } from '@/features/effect'

export function Playground() {
  return (
    <div className={'p-4'}>
      <TaskApp />
      {/* <Stopwatch />*/}
      {/* <Cat />*/}
      {/* <Form />*/}
      <Effect />
    </div>
  )
}
