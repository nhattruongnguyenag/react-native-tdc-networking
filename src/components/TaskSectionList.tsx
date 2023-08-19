import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useMemo } from 'react'
import { SectionList } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Task } from '../types/Task'
import { TaskSection } from '../types/TaskSection'
import { getTaskBySections, isExistsTaskDone, isExistsTaskTodo } from '../utils/CommonUtils'
import TaskItem from './TaskItem'
import TaskSectionHeader from './TaskSectionHeader'

interface TaskSectionListProps {
  taskRenderType: number
}

export const TASK_RENDER_TYPE = {
  todo: 0,
  done: 1
}

export default function TaskSectionList(props: TaskSectionListProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { taskList } = useSelector((state: RootState) => state.taskReducer)
  const focused = useIsFocused()

  let data = useMemo(() => {
    return getTaskBySections([...taskList])
  }, [taskList])

  let taskRenderSectionHeader = useCallback(
    (section: TaskSection): JSX.Element => {
      let check = false

      if (props.taskRenderType === TASK_RENDER_TYPE.todo) {
        check = isExistsTaskTodo(section.data)
      } else if (props.taskRenderType === TASK_RENDER_TYPE.done) {
        check = isExistsTaskDone(section.data)
      }

      if (check) {
        return <TaskSectionHeader title={new Date(section.title).toDateString()} />
      } else return <></>
    },
    [taskList]
  )

  let taskRenderItem = useCallback(
    (item: Task): JSX.Element => {
      let check = false

      if (props.taskRenderType === TASK_RENDER_TYPE.todo) {
        check = !item.isDone
      } else if (props.taskRenderType === TASK_RENDER_TYPE.done) {
        check = item.isDone
      }

      if (check) {
        return <TaskItem navigation={navigation} data={item} />
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
