import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function TodoScreen() {
  const { taskList } = useSelector((state: RootState) => state.taskReducer)
  console.log(taskList)

  return (
    <View>
      <Text>TodoScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
