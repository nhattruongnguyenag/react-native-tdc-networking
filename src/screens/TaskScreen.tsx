import CheckBox from '@react-native-community/checkbox'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Image, LogBox, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import CustomizedImagePicker from '../components/CustomizedImagePicker'
import InputColor, { TASK_COLORS } from '../components/InputColor'
import { RootState } from '../redux/store'
import { addTaskAction, finishEditTaskAction } from '../redux/task.reducer'
import { TaskSave, TaskUpdate } from '../sqlite/task.sqlite'

export default function TaskScreen() {
  const { taskList, editingTask } = useSelector((state: RootState) => state.taskReducer)
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [imagePickerOptionsRef, setImagePickerOptionsRef] = useState<ActionSheet | null>()
  const dispach = useDispatch()
  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [color, setColor] = useState<string>(TASK_COLORS.white)
  const [image, setImage] = useState<string | null>(null)
  const [status, setStatus] = useState<boolean>(false)

  const [toggleModal, setToggleModal] = useState(false)

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`', 'Warning: componentWillReceiveProps has been renamed'])

    if (editingTask) {
      setTitle(editingTask.title)
      setDesc(editingTask.desc)
      setColor(editingTask.color)
      setImage(editingTask.image)
      setStatus(editingTask.status)
    }
  }, [])

  const saveOrUpdateTask = useCallback(() => {
    if (title.length === 0) {
      Alert.alert('Warning !', 'Please write your task title.')
    } else {
      if (editingTask === null) {
        let task: TaskSave = {
          title: title,
          desc: desc,
          image: image,
          color: color,
          status: false
        }

        dispach(addTaskAction(task))
        Alert.alert('Success !', 'Task saved successfully')
      } else {
        let task: TaskUpdate = {
          _id: editingTask._id,
          title: title,
          desc: desc,
          image: image,
          color: color,
          status: status
        }

        dispach(finishEditTaskAction(task))
        Alert.alert('Success !', 'Task updated successfully')
      }

      navigation.goBack()
    }
  }, [title, desc, color, status, image])

  return (
    <View>
      <ScrollView>
        <View style={styles.body}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(value) => setTitle(value)}
            placeholder='Title ...'
          />

          <TextInput
            style={styles.input}
            value={desc}
            onChangeText={(value) => setDesc(value)}
            placeholder='Description ...'
            multiline
          />

          <InputColor selectColor={color} onChangeValue={(value) => setColor(value)} />

          <View style={styles.btnGroupWithRow}>
            <Pressable
              style={({ pressed }) => [pressed ? styles.btn50Pressed : styles.btn50, { marginRight: 5 }]}
              onPress={() => setToggleModal(true)}
            >
              <Icon name={'bell'} size={20} color={'#fff'} />
            </Pressable>

            <Pressable
              onPress={() => {
                imagePickerOptionsRef?.show()
              }}
              style={({ pressed }) => [pressed ? styles.btn50Pressed : styles.btn50, { marginLeft: 5 }]}
            >
              <Icon name={'camera'} size={20} color={'#fff'} />
            </Pressable>
          </View>

          <View style={styles.checkboxGroup}>
            <CheckBox value={status ? true : false} onValueChange={(value) => setStatus(value)} />
            <Text style={styles.checkboxTitle}>Done</Text>
          </View>

          {image && <Image resizeMode={'contain'} style={styles.taskImage} source={{ uri: image }} />}

          <Pressable
            onPress={saveOrUpdateTask}
            style={({ pressed }) => (pressed ? styles.btn100Pressed : styles.btn100)}
          >
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
      <CustomizedImagePicker
        optionsRef={(ref) => setImagePickerOptionsRef(ref)}
        onResult={(path) => {
          if (path) {
            setImage('file://' + path)
          }
        }}
      />
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
