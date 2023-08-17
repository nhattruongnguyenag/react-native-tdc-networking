import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Task } from '../types/Task'
import { initTodoList } from '../constants/Constants'

interface State {
  taskList: Task[]
  editingTask: Task | null
}

const initialState: State = {
  taskList: initTodoList,
  editingTask: null
}

const TaskSlice = createSlice({
  name: 'Task',
  initialState: initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload
    },
    addTaskAction: (state, action: PayloadAction<string>) => {},
    startEditTaskAction: (state, action: PayloadAction<string>) => {},
    cancelEditTaskAction: (state, action: PayloadAction<string>) => {},
    finishEditTaskAction: (state, action: PayloadAction<string>) => {},
    removeTaskAction: (state, action: PayloadAction<string>) => {}
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
