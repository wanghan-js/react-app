import React, { useState } from 'react'
import { useTasksDispatch } from '../context/TasksContext'
import { getNextId } from '../data/tasks'
import { TTaskActionType } from '../types'

export default function AddTask() {
  const [text, setText] = useState('')
  const dispatch = useTasksDispatch() as React.Dispatch<TTaskActionType>

  return (
    <div className='mb-3'>
      <input
        className='w-200 mr-3 rounded border border-blue-500 p-1.5'
        placeholder='Add task'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        disabled={!text}
        className={'rounded bg-lime-200 p-1' + (!text ? ' cursor-not-allowed text-gray-400' : '')}
        onClick={() => {
          if (!text) {
            return
          }
          setText('')
          dispatch({
            type: 'added',
            id: getNextId(),
            text: text,
          })
        }}
      >
        Add
      </button>
    </div>
  )
}
