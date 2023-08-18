import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import CheckBox from '@react-native-community/checkbox'
import InputColor, { TASK_COLORS } from '../components/InputColor'
import { Task } from '../types/Task'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { addTaskAction, finishEditTaskAction } from '../redux/task.reducer'
import { TaskFormData } from '../types/TaskFormData'

export default function TaskScreen({ navigation }: any) {
  const { taskList, editingTask } = useSelector((state: RootState) => state.taskReducer)
  const dispach = useDispatch()

  const [formData, setFormData] = useState<TaskFormData>({
    title: editingTask ? editingTask.title : '',
    desc: editingTask ? editingTask.desc : '',
    color: editingTask ? editingTask.color : TASK_COLORS.white,
    isDone: editingTask ? editingTask.isDone : false,
    image: editingTask ? editingTask.image : ''
  })

  const [toggleModal, setToggleModal] = useState(false)

  const saveOrUpdateTask = useCallback(() => {
    if (formData.title.length === 0) {
      Alert.alert('Warning !', 'Please write your task title.')
    } else {
      let task: Task = {
        _id: taskList.length + 1,
        title: formData.title,
        desc: formData.desc,
        image: formData.image ?? '',
        color: formData.color,
        isDone: formData.isDone,
        createAt: Date.now(),
        updatedAt: Date.now()
      }
      if (editingTask === null) {
        dispach(addTaskAction(task))
      } else {
        task._id = editingTask._id
        dispach(finishEditTaskAction(task))
      }

      navigation.goBack()
    }
  }, [formData])

  return (
    <View>
      <ScrollView>
        <View style={styles.body}>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(value) => setFormData({ ...formData, title: value })}
            placeholder='Title ...'
          />

          <TextInput
            style={styles.input}
            value={formData.desc}
            onChangeText={(value) => setFormData({ ...formData, desc: value })}
            placeholder='Description ...'
            multiline
          />

          <InputColor
            selectColor={formData.color}
            onChangeValue={(value) => setFormData({ ...formData, color: value })}
          />

          <View style={styles.btnGroupWithRow}>
            <Pressable
              style={({ pressed }) => [pressed ? styles.btn50Pressed : styles.btn50, { marginRight: 5 }]}
              onPress={() => setToggleModal(true)}
            >
              <Icon name={'bell'} size={20} color={'#fff'} />
            </Pressable>

            <Pressable
              onPress={() => {}}
              style={({ pressed }) => [pressed ? styles.btn50Pressed : styles.btn50, { marginLeft: 5 }]}
            >
              <Icon name={'camera'} size={20} color={'#fff'} />
            </Pressable>
          </View>

          <View style={styles.checkboxGroup}>
            <CheckBox
              value={formData.isDone}
              onValueChange={(value: boolean) => setFormData({ ...formData, isDone: value })}
            />
            <Text style={styles.checkboxTitle}>Done</Text>
          </View>

          {false && <Image resizeMode={'contain'} style={styles.taskImage} source={{ uri: '' }} />}

          <Pressable
            onPress={saveOrUpdateTask}
            style={({ pressed }) => (pressed ? styles.btn100Pressed : styles.btn100)}
          >
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    margin: 10
  },
  normalText: {
    fontSize: 16
  },
  numberInput: {
    width: 100,
    height: 40,
    margin: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 20,
    borderWidth: 1
  },
  btnGroupWithRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 5,
    marginVertical: 5
  },
  btn50: {
    height: 50,
    width: '50%',
    backgroundColor: '#037eff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  btn50Pressed: {
    height: 50,
    width: '50%',
    backgroundColor: '#037eff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    opacity: 0.7
  },
  btn100: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#20b802',
    borderRadius: 10,
    marginTop: 10,
    elevation: 5,
    paddingVertical: 10,
    opacity: 1
  },
  btn100Pressed: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#20b802',
    borderRadius: 10,
    marginTop: 10,
    elevation: 5,
    paddingVertical: 10,
    opacity: 0.8
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  checkboxTitle: {
    fontSize: 20
  },
  btnModalNotification: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 0.5
  },
  taskImage: {
    width: '100%',
    height: 350,
    marginBottom: 10
  }
})
