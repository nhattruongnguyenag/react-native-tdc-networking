import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { Button, IconButton, Modal, Portal } from 'react-native-paper'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { ADD_QUESTION_VIEW_COMPONENT_BUTTON_COMPLETE, ADD_QUESTION_VIEW_COMPONENT_CHOICE_INPUT_PLACEHOLDER, ADD_QUESTION_VIEW_COMPONENT_MULTI_CHOICE_QUESTION, ADD_QUESTION_VIEW_COMPONENT_ONE_CHOICE_QUESTION, ADD_QUESTION_VIEW_COMPONENT_QUESTION_EMPTY_ERROR_CONTENT, ADD_QUESTION_VIEW_COMPONENT_QUESTION_EMPTY_ERROR_TITLE, ADD_QUESTION_VIEW_COMPONENT_QUESTION_TYPE_DROPDOWN_SEARCH, ADD_QUESTION_VIEW_COMPONENT_QUESTION_TYPE_DROPDOWN_TITLE, ADD_QUESTION_VIEW_COMPONENT_SHORT_ANSWER, ADD_QUESTION_VIEW_COMPONENT_TITLE_CONTAINS_SPECIAL_CHARACTER_VALIDATE, ADD_QUESTION_VIEW_COMPONENT_TITLE_EMPTY_VALIDATE, ADD_QUESTION_VIEW_COMPONENT_TITLE_INPUT_PLACEHOLDER, ADD_QUESTION_VIEW_COMPONENT_TITLE_OVER_255_CHARACTER_VALIDATE } from '../../constants/StringVietnamese'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { addQuestion, resetChoices } from '../../redux/Slice'
import { Question } from '../../types/Question'
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isLengthInRange,
  isNotBlank
} from '../../utils/ValidateUtils'
import ButtonFullWith from '../buttons/ButtonFullWith'
import TextInputWithBottomBorder from '../inputs/TextInputWithBottomBorder'
import TextInputWithTitle from '../inputs/TextInputWithTitle'
import TextValidate from '../common/TextValidate'

interface QuestionType {
  icon: string
  name: string
  value: string
}

export const SHORT_ANSWER = 'tra-loi-ngan'
export const ONE_CHOICE_QUESTION = 'chon-mot-dap-an'
export const MULTI_CHOICE_QUESTION = 'chon-nhieu-dap-an'

const questionTypes: QuestionType[] = [
  {
    icon: 'file-alt',
    name: ADD_QUESTION_VIEW_COMPONENT_SHORT_ANSWER,
    value: SHORT_ANSWER
  },
  {
    icon: 'check-circle',
    name: ADD_QUESTION_VIEW_COMPONENT_ONE_CHOICE_QUESTION,
    value: ONE_CHOICE_QUESTION
  },
  {
    icon: 'check-square',
    name: ADD_QUESTION_VIEW_COMPONENT_MULTI_CHOICE_QUESTION,
    value: MULTI_CHOICE_QUESTION
  }
]

const AddChoices = () => {
  const { choices } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  return (
    <Fragment>
      <Text style={{ marginLeft: 10, marginTop: 15, fontSize: 16, fontWeight: 'bold', color: '#000' }}>Lựa chọn</Text>
      <View style={{ paddingHorizontal: 15 }}>
        {choices.map((item, index) => {
          return (
            <TextInputWithBottomBorder
              choice={{
                index: index,
                data: item
              }}
              totalChoices={choices.length}
              placeholder={`${ADD_QUESTION_VIEW_COMPONENT_CHOICE_INPUT_PLACEHOLDER} ${index + 1}...`}
            />
          )
        })}
      </View>
    </Fragment>
  )
}

export default function AddQuestionView() {
  const [visible, setVisible] = React.useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const { choices, surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | null>(null)
  const [titleValidate, setTitleValidate] = useState<InputTextValidate>({
    textError: ADD_QUESTION_VIEW_COMPONENT_TITLE_EMPTY_VALIDATE,
    isVisible: false,
    isError: true
  })

  const defaultQuestion: Question = {
    title: '',
    type: '',
    choices: [],
    required: 1
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
      Alert.alert(ADD_QUESTION_VIEW_COMPONENT_QUESTION_EMPTY_ERROR_TITLE, ADD_QUESTION_VIEW_COMPONENT_QUESTION_EMPTY_ERROR_CONTENT)
      return
    }

    clearQuestion()
    showModal()
  }

  useEffect(() => {
    if (selectedQuestionType?.value !== SHORT_ANSWER) {
      setQuestion({
        ...question,
        choices: choices.filter((choice) => isNotBlank(choice))
      })
    }
  }, [choices])

  const onQuestionTypeDropdownChange = (item: QuestionType) => {
    setQuestion({ ...question, type: item.value })
    setSelectedQuestionType(item)
  }

  const onTitleChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setTitleValidate({
          ...titleValidate,
          isError: true,
          textError: ADD_QUESTION_VIEW_COMPONENT_TITLE_EMPTY_VALIDATE
        })
      } else if (isContainSpecialCharacter(value)) {
        setTitleValidate({
          ...titleValidate,
          isError: true,
          textError: ADD_QUESTION_VIEW_COMPONENT_TITLE_CONTAINS_SPECIAL_CHARACTER_VALIDATE
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setTitleValidate({
          ...titleValidate,
          isError: true,
          textError: ADD_QUESTION_VIEW_COMPONENT_TITLE_OVER_255_CHARACTER_VALIDATE
        })
      } else {
        setTitleValidate({
          ...titleValidate,
          isError: false
        })

        setQuestion({
          ...question,
          title: value.trim()
        })
      }

      setQuestion({
        ...question,
        title: value.trimStart()
      })
    },
    [question.title, titleValidate]
  )

  const onBtnCompleteAddQuestionPress = () => {
    if (!titleValidate.isError) {
      dispatch(addQuestion(question))
      clearQuestion()
      dispatch(resetChoices())
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
        placeholder={ADD_QUESTION_VIEW_COMPONENT_QUESTION_TYPE_DROPDOWN_TITLE}
        searchPlaceholder={ADD_QUESTION_VIEW_COMPONENT_QUESTION_TYPE_DROPDOWN_SEARCH}
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
        }}
        textColor='#fff'
      >
        <Text style={{ fontSize: 16 }}>Thêm</Text>
      </Button>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>{selectedQuestionType?.name}</Text>
            <IconButton
              icon='close'
              iconColor='#ff003e'
              rippleColor={'#fff'}
              size={22}
              style={styles.btnClose}
              onPress={() => {
                hideModal()
              }}
            />
          </View>
          <ScrollView style={styles.modalBody}>
            <TextInputWithTitle
              onFocus={() => setTitleValidate({ ...titleValidate, isVisible: true })}
              value={question.title}
              placeholder={ADD_QUESTION_VIEW_COMPONENT_TITLE_INPUT_PLACEHOLDER}
              onChangeText={(value) => onTitleChangeText(value)}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={titleValidate.textError}
              isError={titleValidate.isError}
              isVisible={titleValidate.isVisible}
            />

            {question.type !== SHORT_ANSWER && <AddChoices />}
            <View style={styles.modalFooter}>
              <ButtonFullWith iconName='plus' title={ADD_QUESTION_VIEW_COMPONENT_BUTTON_COMPLETE} onPress={() => onBtnCompleteAddQuestionPress()} />
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
