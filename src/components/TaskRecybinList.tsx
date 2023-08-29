import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useMemo } from 'react'
import { SectionList } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Task } from '../types/Task'
import { TaskSection } from '../types/TaskSection'
import { getTaskBySections, isExistsTaskInactive } from '../utils/CommonUtils'
import TaskRecybinItem from './TaskRecybinItem'
import TaskSectionHeader from './toolbars/TaskSectionHeader'

export default function TaskRecybinList() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { taskList } = useSelector((state: RootState) => state.taskReducer)

  let data = useMemo(() => {
    return getTaskBySections([...taskList])
  }, [taskList])

  let taskRenderSectionHeader = useCallback(
    (section: TaskSection): JSX.Element => {
      let check = false

      if (isExistsTaskInactive(section.data)) {
        return <TaskSectionHeader title={new Date(section.title).toDateString()} />
      } else return <></>
    },
    [taskList]
  )

  let taskRenderItem = useCallback(
    (item: Task): JSX.Element => {
      if (!item.active) {
        return <TaskRecybinItem data={item} />
      } else {
        return <></>
      }
    },
    [taskList]
  )

  return (
    <SectionList
      keyExtractor={(item, index) => index.toString()}
      sections={data}
      renderItem={({ item, index }) => taskRenderItem(item)}
      renderSectionHeader={({ section }) => taskRenderSectionHeader(section)}
    />
  )
}
