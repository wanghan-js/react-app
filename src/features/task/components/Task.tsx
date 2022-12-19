import React, { useState } from 'react'
import { TTask, TTaskActionType } from '../types'
import { useTasksDispatch } from '../context/TasksContext'

type TaskProps = {
  task: TTask
}

export default function Task({ task }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useTasksDispatch() as React.Dispatch<TTaskActionType>

  let taskContent
  if (isEditing) {
    taskContent = (
      <>
        <input
          className='w-200 rounded border border-blue-500 p-1.5'
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value,
              },
            })
          }}
        />
        <button className='rounded bg-green-200 p-1' onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    )
  } else {
    taskContent = (
      <>
        <div className='w-200'>{task.text}</div>
        <button className='rounded bg-blue-200 p-1' onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    )
  }
  return (
    <label className='mb-3 flex items-center gap-3 rounded border border-amber-600 p-2'>
      <input
        type='checkbox'
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked,
            },
          })
        }}
      />
      {taskContent}
      <button
        className='rounded bg-red-200 p-1'
        onClick={() => {
          dispatch({
            type: 'deleted',
            id: task.id,
          })
        }}
      >
        Delete
      </button>
    </label>
  )
}
