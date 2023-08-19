import React from 'react'
import { View } from 'react-native'
import TaskSectionList, { TASK_RENDER_TYPE } from '../components/TaskSectionList'
import GlobalStyles from '../styles/GlobalStyles'

export default function DoneScreen() {
  return (
    <View style={GlobalStyles.body}>
      <TaskSectionList taskRenderType={TASK_RENDER_TYPE.done} />
    </View>
  )
}
