export type TTask = {
  id: number
  text: string
  done: boolean
}

type TTaskId = TTask['id']

type TTaskText = TTask['text']

export type TTaskActionType =
  | {
      type: 'added'
      id: TTaskId
      text: TTaskText
    }
  | {
      type: 'changed'
      task: TTask
    }
  | {
      type: 'deleted'
      id: TTaskId
    }
