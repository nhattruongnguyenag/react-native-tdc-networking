import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Task } from '../types/Task'
import { initTodoList } from '../constants/Constants'

interface State {
  taskList: Task[]
  editingTask: Task | null
  formData: FormData | null
}

const initialState: State = {
  taskList: initTodoList,
  editingTask: null,
  formData: null
}

const TaskSlice = createSlice({
  name: 'Task',
  initialState: initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload
    },
    addTaskAction: (state, action: PayloadAction<Task>) => {
      state.taskList.push(action.payload)
    },
    startEditTaskAction: (state, action: PayloadAction<Task | null>) => {
      state.editingTask = action.payload
    },
    cancelEditTaskAction: (state, action: PayloadAction<string>) => {},
    finishEditTaskAction: (state, action: PayloadAction<Task>) => {
      const taskId = action.payload._id
      const index = state.taskList.findIndex((task) => task._id === taskId)
      state.taskList[index] = action.payload
      state.editingTask = null
    },
    removeTaskAction: (state, action: PayloadAction<number>) => {
      let taskId = action.payload
      state.taskList = state.taskList.filter((task) => task._id !== taskId)
    }
  },
  extraReducers(builder) {}
})

export const {
  addTaskAction,
  startEditTaskAction,
  cancelEditTaskAction,
  finishEditTaskAction,
  removeTaskAction,
  setTasks
} = TaskSlice.actions

const TaskReducer = TaskSlice.reducer
export default TaskReducer
