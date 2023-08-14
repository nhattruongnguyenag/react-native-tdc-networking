export const SET_TASKS = 'SET_TASKS'
export const SET_TASK_ID = 'SET_TASK_ID'

export type Task = {
  id: number
  title: string
  desc: string
  isDone: boolean
  color: string
  imageUri: string
  createAt: Date
}

export const setTasks = (tasks: [Task]) => (dispach: any) => {
  dispach({
    type: SET_TASKS,
    payload: tasks
  })
}

export const setTaskId = (taskId: number) => (dispach: any) => {
  dispach({
    type: SET_TASK_ID,
    payload: taskId
  })
}
