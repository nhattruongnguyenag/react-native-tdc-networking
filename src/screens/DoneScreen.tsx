import React, { useEffect } from 'react'
import { View } from 'react-native'
import TaskSectionList, { TASK_RENDER_TYPE } from '../components/TaskSectionList'
import GlobalStyles from '../styles/GlobalStyles'
import { Task } from '../types/Task'
import {
  TaskSave,
  TaskUpdate,
  getTasksFromDB,
  moveTaskToTrash,
  restoreTaskFromTrash,
  updateTask
} from '../sqlite/task.sqlite'

export default function DoneScreen() {
  let task: TaskSave = {
    title: '11111111111',
    desc: '1111111111',
    color: '#fff',
    image: 'image.jpg'
  }

  let taskUpdate: TaskUpdate = {
    _id: 1,
    title: 'title updated',
    desc: 'Updated 1111111111',
    color: '#fff updated',
    image: 'image.jpg updated'
  }

  return (
    <View style={GlobalStyles.body}>
      <TaskSectionList taskRenderType={TASK_RENDER_TYPE.done} />
    </View>
  )
}
