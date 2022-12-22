import { TodoCreator } from '@/features/todo/components/TodoCreator'
import { TodoList } from '@/features/todo/components/TodoList'

export function Todo() {
  return (
    <main>
      <header>Daily To Do List</header>
      <TodoCreator />
      <TodoList />
      <footer>
        <div>3 item selected</div>
        <button>Clear All</button>
      </footer>
    </main>
  )
}
