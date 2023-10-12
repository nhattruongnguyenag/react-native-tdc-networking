import React, { Fragment, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { Button, IconButton, Modal, Portal } from 'react-native-paper'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { BACKGROUND_BLUE } from '../../constants/Color'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { addQuestion } from '../../redux/Slice'
import { Question } from '../../types/Question'
import ButtonFullWith from '../buttons/ButtonFullWith'
import TextInputWithBottomBorder from '../inputs/TextInputWithBottomBorder'
import TextInputWithTitle from '../inputs/TextInputWithTitle'

interface QuestionType {
  icon: string
  name: string
  value: string
}

export const SHORT_ANSWER = '1'
export const ONE_CHOICE_QUESTION = '2'
export const MULTI_CHOICE_QUESTION = '3'

const questionTypes: QuestionType[] = [
  {
    icon: 'file-alt',
    name: 'Trả lời ngắn',
    value: SHORT_ANSWER
  },
  {
    icon: 'check-circle',
    name: 'Trắc nghiệm',
    value: ONE_CHOICE_QUESTION
  },
  {
    icon: 'check-square',
    name: 'Nhiều lựa chọn',
    value: MULTI_CHOICE_QUESTION
  }
]

const AddChoices = () => {
  const { choices } = useAppSelector(state => state.TDCSocialNetworkReducer)

  return (
    <Fragment>
      <Text style={{ marginLeft: 10, marginTop: 15, fontSize: 16, fontWeight: 'bold', color: '#000' }}>Lựa chọn</Text>
      <View style={{ paddingHorizontal: 15 }}>
        {
          choices.map((item, index) => {
            return <TextInputWithBottomBorder choice={{
              index: index,
              data: item
            }} totalChoices={choices.length}
            placeholder={`Lựa chọn ${index + 1}...`} />
          })
        }
      </View>
    </Fragment>
  )
}

export default function AddQuestionView() {
  const { choices } = useAppSelector(state => state.TDCSocialNetworkReducer)
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | null>(null)
  const [question, setQuestion] = useState<Question>({
    title: '',
    type: '',
    choices: []
  })

  const dispatch = useAppDispatch()

  const renderItem = (item: QuestionType) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 10 }}>
        <Text style={{ margin: 5, fontSize: 16 }}>{item.name}</Text>
        <FontAwesome5Icon name={item.icon} size={16} style={{ marginStart: 'auto', marginEnd: 10 }} />
      </View>
    )
  }

  const onBtnStartAddQuestionPress = () => {
    if (selectedQuestionType === null) {
      Alert.alert("Lỗi !!!", "Vui lòng chọn loại câu hỏi")
      return
    }

    showModal()
  }

  useEffect(() => {
    if (selectedQuestionType?.value !== SHORT_ANSWER) {
      setQuestion({
        ...question, choices: choices
      })
    }
  }, [choices])

  const onBtnCompleteAddQuestionPress = () => {
    dispatch(addQuestion(question))
    setSelectedQuestionType(null)
    hideModal()
  }

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onQuestionTypeDropdownChange = (item: QuestionType) => {
    setQuestion({ ...question, type: item.value })
    setSelectedQuestionType(item)
  }

  return (
    <View style={styles.body}>
      <Dropdown
        style={styles.dropdown}
        data={questionTypes}
        search
        labelField='name'
        valueField='value'
        placeholder='--- Chọn loại câu hỏi ---'
        searchPlaceholder='Tìm kiếm...'
        value={selectedQuestionType}
        onChange={(item) => onQuestionTypeDropdownChange(item)}
        renderItem={renderItem}
      />

      <Button icon='plus' mode='elevated' style={{ backgroundColor: '#0065FF' }} onPress={() => {
        onBtnStartAddQuestionPress()
      }} textColor='#fff'>
        <Text style={{ fontSize: 16 }}>Thêm</Text>
      </Button>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>{selectedQuestionType?.name}</Text>
            <IconButton icon='close' iconColor='#fff' rippleColor={'#fff'} size={22} style={styles.btnClose} onPress={() => {
              hideModal()
            }} />
          </View>
          <ScrollView style={styles.modalBody}>
            <TextInputWithTitle
              title='Tiêu đề câu hỏi'
              placeholder='Nhập tiêu đề câu hỏi...'
              onChangeText={(value) => setQuestion({
                ...question, title: value
              })} />
            {
              question.type !== SHORT_ANSWER &&
              <AddChoices />
            }
            <View style={styles.modalFooter}>
              <ButtonFullWith title='Hoàn tất' onPress={() => onBtnCompleteAddQuestionPress()} />
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#00000099',
    elevation: 5
  },
  dropdown: {
    flex: 1,
    borderColor: '#97A1B0',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginStart: 5,
    marginEnd: 10
  },
  btnPlus: {
    marginStart: 'auto'
  },
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    borderRadius: 4,
    margin: 10
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: BACKGROUND_BLUE,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingVertical: 4,
  },
  modalBody: {
    height: '100%'
  },
  modalFooter: {
    paddingHorizontal: 5
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginStart: 15,
    color: '#fff'
  },
  btnClose: {
    marginStart: 'auto'
  }
})
