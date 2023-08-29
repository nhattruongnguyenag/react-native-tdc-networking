import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch } from 'react-redux'
import IconButton from '../components/buttons/IconButton'
import TaskSectionList, { TASK_RENDER_TYPE } from '../components/TaskSectionList'
import useOnResume from '../hooks/UseOnResume'
import { setTasksAction, startEditTaskAction } from '../redux/task.reducer'
import { getTasksFromDB } from '../sqlite/task.sqlite'
import GlobalStyles from '../styles/GlobalStyles'

export default function TodoScreen(): JSX.Element {
  const dispach = useDispatch()
  const navigation = useNavigation<DrawerNavigationProp<any>>()

  useOnResume(() => {
    getTasksFromDB((data) => {
      dispach(setTasksAction(data))
    })
  })

  return (
    <View style={GlobalStyles.body}>
      <TaskSectionList taskRenderType={TASK_RENDER_TYPE.todo} />
      <IconButton
        width={55}
        height={55}
        iconName='plus'
        iconColor='#fff'
        inactiveBackgroundColor='#0088ff'
        activeBackgroundColor='#0088ffB3'
        customStyle={styles.button}
        onPress={() => {
          navigation.navigate('Task')
          dispach(startEditTaskAction(null))
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20
  }
})
