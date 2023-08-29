import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TaskRecybinList from '../components/TaskRecybinList'
import useOnResume from '../hooks/UseOnResume'
import { getTasksFromDB } from '../sqlite/task.sqlite'
import { useDispatch } from 'react-redux'
import { setTasksAction } from '../redux/task.reducer'

export default function TaskRecybinScreen() {
  const dispach = useDispatch()

  useOnResume(() => {
    getTasksFromDB((data) => {
      dispach(setTasksAction(data))
    })
  })

  return (
    <View style={{ padding: 5 }}>
      <TaskRecybinList />
    </View>
  )
}
