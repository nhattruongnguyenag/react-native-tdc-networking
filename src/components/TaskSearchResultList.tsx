import { StyleSheet, Text, View, FlatList, StyleSheetProperties, ViewStyle } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import TaskItem from './TaskItem'
import { initTodoList } from '../constants/Constants'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleProp } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

interface TaskSearchResultListProps {
  style: StyleProp<ViewStyle>
}

export default function TaskSearchResultList({ style }: TaskSearchResultListProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { taskList } = useSelector((state: RootState) => state.taskReducer)

  return (
    <View style={style}>
      {initTodoList.map((item, index) => (
        <TaskItem key={index} navigation={navigation} data={item} />
      ))}
    </View>
  )
}
