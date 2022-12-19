import React, { createContext, useContext, useReducer } from 'react'
import { tasks as initialTasks } from '../data/tasks'
import { TTask, TTaskActionType } from '../types'

const TasksContext = createContext<TTask[]>([])
const TasksDispatchContext = createContext<React.Dispatch<TTaskActionType> | null>(null)

export function useTasks() {
  return useContext(TasksContext)
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext)
}

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}

function tasksReducer(tasks: TTask[], action: TTaskActionType) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ]
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task
        } else {
          return t
        }
      })
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id)
    }
    default: {
      throw Error('Unknown action')
    }
  }
}
