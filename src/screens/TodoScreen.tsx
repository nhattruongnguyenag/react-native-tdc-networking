import React, { useMemo } from 'react'
import { SectionList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import TaskItem from '../components/TaskItem'
import TaskSectionHeader from '../components/TaskSectionHeader'
import { RootState } from '../redux/store'
import { getTaskBySections } from '../utils/CommonUtils'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { startEditTaskAction } from '../redux/task.reducer'

export default function TodoScreen(): JSX.Element {
  const dispach = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { taskList } = useSelector((state: RootState) => state.taskReducer)

  let data = useMemo(() => {
    return getTaskBySections([...taskList])
  }, [taskList])

  return (
    <MenuProvider>
      <View style={styles.body}>
        <SectionList
          keyExtractor={(item, index) => index.toString()}
          sections={data}
          renderItem={({ item, index}) => <TaskItem navigation={navigation} data={item} />}
          renderSectionHeader={({ section }) => <TaskSectionHeader title={new Date(section.title).toDateString()} />}
        />

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
    </MenuProvider>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 5
  },
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
