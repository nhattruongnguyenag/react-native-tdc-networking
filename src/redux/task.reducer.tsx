import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Task } from '../types/Task'
import { initTodoList } from '../constants/Constants'
import {
  TaskSave,
  TaskUpdate,
  getTaskById,
  moveTaskToTrash,
  saveTask,
  updateTask,
  searchTaskByTitleOrContent
} from '../sqlite/task.sqlite'

interface State {
  taskList: Task[]
  taskSearchResult: Task[]
  editingTask: Task | null
  formData: FormData | null
  imagePath: string | null
}

const initialState: State = {
  taskList: [],
  taskSearchResult: [],
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
    },
    taskSearchAction: (state, action: PayloadAction<Task[]>) => {
      state.taskSearchResult = []
      state.taskSearchResult = action.payload
      // state.taskSearchResult = []
      // state.taskList.forEach(task => {
      //   if (key.length > 0) {
      //     if (task.title.includes(key) || task.desc.includes(key)) {
      //       state.taskSearchResult.push(task)
      //     }
      //   }
      // })
    }
  },
  extraReducers(builder) {}
})

export const {
  addTaskAction,
  startEditTaskAction,
  finishEditTaskAction,
  removeTaskAction,
  setTasksAction,
  taskSearchAction
} = TaskSlice.actions

const TaskReducer = TaskSlice.reducer
export default TaskReducer
