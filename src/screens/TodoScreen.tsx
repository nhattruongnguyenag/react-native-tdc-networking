import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch } from 'react-redux'
import TaskSectionList, { TASK_RENDER_TYPE } from '../components/TaskSectionList'
import { startEditTaskAction } from '../redux/task.reducer'
import GlobalStyles from '../styles/GlobalStyles'

export default function TodoScreen(): JSX.Element {
  const dispach = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  return (
    <View style={GlobalStyles.body}>
      <TaskSectionList taskRenderType={TASK_RENDER_TYPE.todo} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispach(startEditTaskAction(null))
          navigation.navigate('Task')
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
