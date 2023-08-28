import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch } from 'react-redux'
import TaskSectionList, { TASK_RENDER_TYPE } from '../components/TaskSectionList'
import { setTasksAction, startEditTaskAction } from '../redux/task.reducer'
import { getTasksFromDB } from '../sqlite/task.sqlite'
import GlobalStyles from '../styles/GlobalStyles'
import useOnResume from '../hooks/UseOnResume'

export default function TodoScreen(): JSX.Element {
  const dispach = useDispatch()
  const navigation = useNavigation<DrawerNavigationProp<any>>()

  let focused = useIsFocused()

  useEffect(() => {
    getTasksFromDB((data) => {
      dispach(setTasksAction(data))
    })
  }, [focused])

  return (
    <View style={GlobalStyles.body}>
      <TaskSectionList taskRenderType={TASK_RENDER_TYPE.todo} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Task')
          dispach(startEditTaskAction(null))
        }}
      >
        <Icon name={'plus'} size={20} color={'#fff'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#0088ff',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20
  }
})
