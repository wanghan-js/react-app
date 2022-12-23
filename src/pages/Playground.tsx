import TaskApp from '../features/task'
import { Effect } from '@/features/effect'

export function Playground() {
  return (
    <div className={'p-4'}>
      <TaskApp />
      <Effect />
    </div>
  )
}
