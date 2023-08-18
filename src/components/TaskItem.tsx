import { useCallback, useState } from 'react'
import { Pressable, StyleSheet, Text, Touchable, TouchableWithoutFeedback, Vibration, View } from 'react-native'
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { removeTaskAction, startEditTaskAction } from '../redux/task.reducer'
import GlobalStyles from '../styles/GlobalStyles'
import { Task } from '../types/Task'
import ConfirmModal from './ConfirmModal'
import CustomizedMenuOption from './CustomizedMenuOption'
import { RootState } from '../redux/store'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type TaskItemProps = {
  data: Task
  navigation: NativeStackNavigationProp<any>
}

const TaskItem = ({ navigation, data }: TaskItemProps) => {
  let menuRef: Menu | null
  const [confirmModal, setConfirmModal] = useState(false)
  const { taskList } = useSelector((state: RootState) => state.taskReducer)
  const dispach = useDispatch()
  const onEditTask = useCallback(() => {
    console.log(data)
    dispach(startEditTaskAction(data))
    navigation.navigate('Task')
  }, [taskList])

  const deleteTaskHandling = useCallback((taskId: number) => {
    dispach(removeTaskAction(taskId))
    setConfirmModal(false)
  }, [])

  return (
    <View>
      <Pressable
        onLongPress={() => {
          menuRef?.open()
          Vibration.vibrate(75)
        }}
        style={styles.body}
      >
        <View style={[styles.taskColor, { backgroundColor: data.color }]} />

        <View style={styles.itemContent}>
          <Text style={[GlobalStyles.title, { marginTop: 10, marginBottom: 10 }]}>{data.title}</Text>
          <Text style={[GlobalStyles.normalText]} ellipsizeMode='tail' numberOfLines={1}>
            {data.desc}
          </Text>
          <Text style={[styles.date, { marginTop: 15, marginBottom: 10 }]}>
            Last modified: {new Date(data.createAt).toLocaleTimeString().slice(0, 5)}
          </Text>
        </View>

        <Menu
          ref={(menu) => {
            menuRef = menu
          }}
        >
          <MenuTrigger style={styles.btnOptions}>
            <Icon name={'ellipsis-v'} size={18} color={'#000'} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ marginLeft: 0, marginTop: 0 }}>
            <CustomizedMenuOption icon='edit' text='Edit' onSelect={onEditTask} />
            <CustomizedMenuOption icon='bell' text='Set notification' />
            <CustomizedMenuOption
              onSelect={() => {
                setConfirmModal(true)
              }}
              icon='trash'
              customIconColor='red'
              text='Delete'
              customTextColor='red'
            />
          </MenuOptions>
        </Menu>
      </Pressable>
      <ConfirmModal
        visible={confirmModal}
        title={'Warning'}
        message={'Are you sure to delete this task?'}
        onBtnDeletePress={() => {
          setConfirmModal(false)
        }}
        onBtnOkPress={() => deleteTaskHandling(data._id ?? 0)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 7,
    elevation: 5,
    borderRadius: 5,
    borderColor: '#000'
  },
  optionsBox: {
    position: 'absolute',
    zIndex: 999,
    right: 40,
    width: 200,
    height: 400,
    backgroundColor: 'lightgreen'
  },
  itemContent: {
    flex: 1,
    marginLeft: 10
  },
  taskColor: {
    height: '100%',
    width: 20,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  date: {
    fontSize: 10,
    fontStyle: 'italic'
  },
  btnOptions: {
    width: 20,
    height: 30,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default TaskItem
