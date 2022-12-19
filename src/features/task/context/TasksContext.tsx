import React, { createContext, useContext } from 'react'
import { tasks as initialTasks } from '../data/tasks'
import { TTask, TTaskActionType } from '../types'
import { useImmerReducer } from 'use-immer'
import { Draft } from 'immer'

const TasksContext = createContext<TTask[]>([])
const TasksDispatchContext = createContext<React.Dispatch<TTaskActionType> | null>(null)

export function useTasks() {
  return useContext(TasksContext)
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext)
}

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks)

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}

function tasksReducer(draft: Draft<TTask[]>, action: TTaskActionType): void {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      })
      break
    }
    case 'changed': {
      const index = draft.findIndex((d) => d.id === action.task.id)
      if (index >= 0) {
        draft[index] = action.task
      }
      break
    }
    case 'deleted': {
      const index = draft.findIndex((d) => d.id === action.id)
      if (index >= 0) {
        draft.splice(index, 1)
      }
      break
    }
    default: {
      throw Error('Unknown action')
    }
  }
}
