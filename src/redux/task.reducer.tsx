import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Task } from '../types/Task'
import { initTodoList } from '../constants/Constants'
import { TaskSave, TaskUpdate, getTaskById, moveTaskToTrash, saveTask, updateTask } from '../sqlite/task.sqlite'

interface State {
  taskList: Task[]
  editingTask: Task | null
  formData: FormData | null
  imagePath: string | null
}

const initialState: State = {
  taskList: initTodoList,
  editingTask: null,
  formData: null,
  imagePath: null
}

const TaskSlice = createSlice({
  name: 'Task',
  initialState: initialState,
  reducers: {
    setTasksAction: (state, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload
    },
    addTaskAction: (state, action: PayloadAction<TaskSave>) => {
      saveTask(action.payload, (taskId: number) => {
        getTaskById(taskId, (data: Task) => {
          state.taskList.push(data)
        })
      })
    },
    startEditTaskAction: (state, action: PayloadAction<Task | null>) => {
      state.editingTask = action.payload
    },
    finishEditTaskAction: (state, action: PayloadAction<TaskUpdate>) => {
      const taskId = action.payload._id
      updateTask(action.payload)
      getTaskById(taskId ?? 0, (taskResponse: Task) => {
        const index = state.taskList.findIndex((task) => task._id === taskId)
        state.taskList[index] = taskResponse
      })
      state.editingTask = null
    },
    removeTaskAction: (state, action: PayloadAction<number>) => {
      let taskId = action.payload
      moveTaskToTrash(taskId)
      state.taskList = state.taskList.filter((task) => task._id !== taskId)
    }
  },
  extraReducers(builder) {}
})

export const { addTaskAction, startEditTaskAction, finishEditTaskAction, removeTaskAction, setTasksAction } =
  TaskSlice.actions

const TaskReducer = TaskSlice.reducer
export default TaskReducer
