import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { Button, IconButton, Modal, Portal } from 'react-native-paper'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { BACKGROUND_BLUE } from '../../constants/Color'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { addQuestion, setSurveyPostRequest } from '../../redux/Slice'
import { Question } from '../../types/Question'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils'
import { InputTextValidate, isBlank, isContainSpecialCharacter, isLengthInRange, isNotBlank } from '../../utils/ValidateUtils'
import ButtonFullWith from '../buttons/ButtonFullWith'
import TextInputWithBottomBorder from '../inputs/TextInputWithBottomBorder'
import TextInputWithTitle from '../inputs/TextInputWithTitle'
import TextValidate from '../TextValidate'

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
            }}
              totalChoices={choices.length}
              placeholder={`Lựa chọn ${index + 1}...`} />
          })
        }
      </View>
    </Fragment>
  )
}

export default function AddQuestionView() {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { choices, surveyPostRequest } = useAppSelector(state => state.TDCSocialNetworkReducer)
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | null>(null)
  const [titleValidate, setTitleValidate] = useState<InputTextValidate>({
    textError: "Tiêu đề không được để trống",
    isVisible: false,
    isError: true
  })

  const defaultQuestion: Question = {
    title: '',
    type: '',
    choices: []
  }

  const [question, setQuestion] = useState<Question>(defaultQuestion)

  const clearQuestion = useCallback(() => {
    setQuestion({ ...defaultQuestion, type: selectedQuestionType?.value ?? '' })
  }, [selectedQuestionType])

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

    clearQuestion()
    showModal()
  }

  useEffect(() => {
    if (selectedQuestionType?.value !== SHORT_ANSWER) {
      setQuestion({
        ...question, choices: choices.filter(choice => isNotBlank(choice))
      })
    }
  }, [choices])

  useEffect(() => {
    console.log(surveyPostRequest)
  }, [surveyPostRequest])

  const onQuestionTypeDropdownChange = (item: QuestionType) => {
    setQuestion({ ...question, type: item.value })
    setSelectedQuestionType(item)
  }

  const onTitleChangeText = useCallback((value: string) => {
    if (isBlank(value)) {
      setTitleValidate({
        ...titleValidate,
        isError: true,
        textError: "Tiêu đề không được để trống"
      })
    } else if (isContainSpecialCharacter(value)) {
      setTitleValidate({
        ...titleValidate,
        isError: true,
        textError: "Tiêu đề không được chứa ký tự đặc biệt"
      })
    } else if (!isLengthInRange(value, 1, 255)) {
      setTitleValidate({
        ...titleValidate,
        isError: true,
        textError: "Tiêu đề không vượt quá 255 ký tự"
      })
    }
    else {
      setTitleValidate({
        ...titleValidate,
        isError: false
      })

      setQuestion({
        ...question, title: value.trim()
      })
    }

    setQuestion({
      ...question, title: value.trimStart()
    })
  }, [question.title, titleValidate])

  const onBtnCompleteAddQuestionPress = () => {
    if (!titleValidate.isError) {
      dispatch(addQuestion(question))
      clearQuestion()
      setSelectedQuestionType(null)
      setTitleValidate({ ...titleValidate, isError: true, isVisible: false })
      hideModal()
    } else if (titleValidate.isError) {
      setTitleValidate({ ...titleValidate, isVisible: true })
    }
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

      <Button
        icon='plus'
        mode='elevated'
        style={{ backgroundColor: '#0065FF' }}
        onPress={() => {
          onBtnStartAddQuestionPress()
        }} textColor='#fff'>
        <Text style={{ fontSize: 16 }}>Thêm</Text>
      </Button>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>{selectedQuestionType?.name}</Text>
            <IconButton icon='close' iconColor='#ff003e' rippleColor={'#fff'} size={22} style={styles.btnClose} onPress={() => {
              hideModal()
            }} />
          </View>
          <ScrollView style={styles.modalBody}>
            <TextInputWithTitle
              onFocus={() => setTitleValidate({ ...titleValidate, isVisible: true })}
              value={question.title}
              placeholder='Nhập tiêu đề câu hỏi...'
              onChangeText={(value) => onTitleChangeText(value)} />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={titleValidate.textError}
              isError={titleValidate.isError}
              isVisible={titleValidate.isVisible}
            />

            {
              question.type !== SHORT_ANSWER &&
              <AddChoices />
            }
            <View style={styles.modalFooter}>
              <ButtonFullWith
                iconName='plus'
                title='Hoàn tất'
                onPress={() => onBtnCompleteAddQuestionPress()} />
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  modalBody: {
    maxHeight: '90%',
    paddingHorizontal: 5
  },
  modalFooter: {
    paddingHorizontal: 5
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginStart: 15,
    color: '#000'
  },
  btnClose: {
    marginStart: 'auto'
  }
})
