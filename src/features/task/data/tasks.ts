import { TTask } from '../types'

let nextId = 3
export function getNextId() {
  return nextId++
}

export const tasks: TTask[] = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false },
]
