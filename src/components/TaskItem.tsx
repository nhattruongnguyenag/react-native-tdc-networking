import { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch } from 'react-redux'
import { removeTaskAction } from '../redux/task.reducer'
import GlobalStyles from '../styles/GlobalStyles'
import { Task } from '../types/Task'
import ConfirmModal from './ConfirmModal'
import CustomizedMenuOption from './CustomizedMenuOption'

type TaskItemProps = {
  data: Task
  navigation: any
}

const TaskItem = ({ navigation, data }: TaskItemProps) => {
  const [confirmModal, setConfirmModal] = useState(false)
  const dispach = useDispatch()
  const onEditTask = useCallback(() => {
    navigation.navigate('Task', { taskId: data._id })
  }, [])

  const deleteTaskHandling = useCallback(() => {
    dispach(removeTaskAction(data._id ?? 0))
    setConfirmModal(false)
  }, [])

  return (
    <>
      <View style={styles.body}>
        <View style={[styles.taskColor, { backgroundColor: data.color }]} />

        <View style={styles.itemContent}>
          <Text style={[GlobalStyles.title, { marginTop: 10, marginBottom: 10 }]}>{data.title}</Text>
          <Text style={[GlobalStyles.normalText]} ellipsizeMode='tail' numberOfLines={1}>
            {data.desc}
          </Text>
          <Text style={[styles.date, { marginTop: 15, marginBottom: 10 }]}>
            Last modified: {new Date(data.createAt).toLocaleTimeString('vi-VN').slice(0, 5)}
          </Text>
        </View>

        <Menu>
          <MenuTrigger style={styles.btnOptions}>
            <Icon name={'ellipsis-v'} size={18} color={'#000'} />
          </MenuTrigger>
          <MenuOptions>
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
      </View>
      <ConfirmModal
        visible={confirmModal}
        title={'Warning'}
        message={'Are you sure to delete this task?'}
        onBtnDeletePress={() => {
          setConfirmModal(false)
        }}
        onBtnOkPress={deleteTaskHandling}
      />
    </>
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
