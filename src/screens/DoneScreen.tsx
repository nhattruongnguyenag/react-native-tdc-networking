import React from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import TaskSectionList, { TASK_RENDER_TYPE } from '../components/TaskSectionList'
import useOnResume from '../hooks/UseOnResume'
import { setTasksAction } from '../redux/task.reducer'
import { getTasksFromDB, TaskSave, TaskUpdate } from '../sqlite/task.sqlite'
import GlobalStyles from '../styles/GlobalStyles'

export default function DoneScreen() {
  const dispach = useDispatch()

  useOnResume(() => {
    getTasksFromDB((data) => {
      dispach(setTasksAction(data))
    })
  })

  return (
    <View style={GlobalStyles.body}>
      <TaskSectionList taskRenderType={TASK_RENDER_TYPE.done} />
    </View>
  )
}
