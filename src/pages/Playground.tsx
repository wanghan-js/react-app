import TaskApp from '../features/task'
import { Stopwatch } from '@/features/stopwatch'
import { Cat } from '@/features/cat'
import { Form } from '@/features/forward-ref'

function Playground() {
  return (
    <div className={'p-4'}>
      <TaskApp />
      {/* <Stopwatch /> */}
      {/* <Cat /> */}
      <Form />
    </div>
  )
}

export default Playground
