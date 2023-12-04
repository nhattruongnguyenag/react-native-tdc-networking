import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { IconButton, Modal, Portal } from 'react-native-paper'
import { useAppDispatch } from '../../redux/Hook'
import { updateQuestion } from '../../redux/Slice'
import { Choice, Question } from '../../types/Question'
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isLengthInRange
} from '../../utils/ValidateUtils'
import ButtonFullWith from '../buttons/ButtonFullWith'
import TextValidate from '../common/TextValidate'
import TextInputWithTitle from '../inputs/TextInputWithTitle'
import AddQuestionChoice, { QuestionUpdate } from './AddQuestionChoice'
import { QuestionType } from './ChooseQuestionBar'

export const SHORT_ANSWER = 'tra-loi-ngan'
export const ONE_CHOICE_QUESTION = 'chon-mot-dap-an'
export const MULTI_CHOICE_QUESTION = 'chon-nhieu-dap-an'

interface AddQuestionModalProps {
  questionUpdate: QuestionUpdate | null
  type: QuestionType | null
  onDismiss: () => void
  onCompleteSaveQuestion: (question: Question) => void
}

const defaultQuestion: Question = {
  choices: [],
  required: 1,
  type: "",
  title: ""
}

export default function AddQuestionModal(props: AddQuestionModalProps) {
  const t = useTranslation()
  const dispatch = useAppDispatch()
  const questionType = new Map<string, string>()
  questionType.set(SHORT_ANSWER, t('AddQuestionView.addQuestionViewComponentShortAnswer'))
  questionType.set(ONE_CHOICE_QUESTION, t('AddQuestionView.addQuestionViewComponentOneChoiceQuestion'))
  questionType.set(MULTI_CHOICE_QUESTION, t('AddQuestionView.addQuestionViewComponentMultiChoiceQuestion'))

  const [question, setQuestion] = useState<Question>(defaultQuestion)

  useEffect(() => {
    if (props.questionUpdate) {
      setTitleValidate({
        textError: t('AddQuestionView.addQuestionViewComponentTitleEmptyValidate'),
        isVisible: false,
        isError: isBlank(props.questionUpdate?.data.title)
      })
      setQuestion(props.questionUpdate.data)
    }
  }, [props.questionUpdate])

  const defaultValidate: InputTextValidate = useMemo(() => {
    return {
      textError: t('AddQuestionView.addQuestionViewComponentTitleEmptyValidate'),
      isVisible: false,
      isError: isBlank(props.questionUpdate?.data.title)
    }
  }, [])

  const [titleValidate, setTitleValidate] = useState<InputTextValidate>(defaultValidate)

  const onTitleChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setTitleValidate({
          ...titleValidate,
          isError: true,
          textError: t('AddQuestionView.addQuestionViewComponentTitleEmptyValidate')
        })
      } else if (isContainSpecialCharacter(value)) {
        setTitleValidate({
          ...titleValidate,
          isError: true,
          textError: t('AddQuestionView.addQuestionViewComponentTitleContainsSpecialCharacterValidate')
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setTitleValidate({
          ...titleValidate,
          isError: true,
          textError: t('AddQuestionView.addQuestionViewComponentTitleOver255CharacterValidate')
        })
      } else {
        setTitleValidate({
          ...titleValidate,
          isError: false
        })
      }

      setQuestion({
        ...question,
        title: value,
      })
    },
    [titleValidate]
  )

  const onBtnCompleteAddQuestionPress = () => {
    if (!titleValidate.isError) {
      let choices: Choice[] = []

      if (question.choices) {
        choices = question.choices.filter(question => question.content.trim().length > 1)
        if ((question.type !== SHORT_ANSWER && props.questionUpdate?.data.type !== SHORT_ANSWER) && choices.length === 0) {
          Alert.alert(t('AddQuestionView.addChoiceValidateErrorTitle'), t('AddQuestionView.addChoiceValidateErrorContent') )
          return
        }
      }

      if (props.questionUpdate) {
        dispatch(updateQuestion({
          index: props.questionUpdate.index,
          question: {
            ...question,
            choices: choices
          }
        }))
      } else {
        props.onCompleteSaveQuestion({
          ...question,
          choices: choices
        })
      }

      props.onDismiss()
      setQuestion(defaultQuestion)
    } else if (titleValidate.isError) {
      setTitleValidate({ ...titleValidate, isVisible: true })
    }
  }

  useEffect(() => {
    let choices: Choice[] = []

    if (props.type && props.type.value !== SHORT_ANSWER) {
      choices = [{ content: "" }, { content: "" }, { content: "" }]
    }

    setQuestion({
      ...defaultQuestion,
      type: props.type?.value ?? "",
      choices: [...choices]
    })
  }, [props.type])

  const header = useMemo(() => {
    if (props.type) {
      return props.type.name
    } else {
      if (props.questionUpdate?.data) {
        return questionType.get(props.questionUpdate.data.type ?? '')
      }
    }
    return ""
  }, [props.questionUpdate, props.type])

  return (
    <View style={styles.body}>
      <Portal>
        <Modal
          visible={Boolean(props.type) || Boolean(props.questionUpdate)}
          onDismiss={props.onDismiss}
          contentContainerStyle={styles.containerStyle}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>{header}</Text>
            <IconButton
              icon='close'
              iconColor='#ff003e'
              rippleColor={'#fff'}
              size={22}
              style={styles.btnClose}
              onPress={props.onDismiss}
            />
          </View>
          <ScrollView style={styles.modalBody}>
            <TextInputWithTitle
              onFocus={() => setTitleValidate({ ...titleValidate, isVisible: true })}
              defaultValue={props.questionUpdate?.data ? props.questionUpdate.data.title : ''}
              placeholder={t('AddQuestionView.addQuestionViewComponentTitleInputPlaceholder')}
              onChangeText={(value) => onTitleChangeText(value)}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={titleValidate.textError}
              isError={titleValidate.isError}
              isVisible={titleValidate.isVisible}
            />

            {
              ((props.type && props.type.value !== SHORT_ANSWER) || question.type !== SHORT_ANSWER)
              && <AddQuestionChoice
                onDeleteChoice={(index) => {
                  let tempChoices = [...question.choices ?? []]
                  tempChoices.splice(index, 1)
                  setQuestion({
                    ...question,
                    choices: tempChoices
                  })
                }}
                question={question}
                onAddChoice={() => {
                  setQuestion({
                    ...question,
                    choices: [...question.choices ?? [], { content: "" }]
                  })
                }}
                onChoiceContentTextChange={(index, value) => {
                  let choices = [...question.choices ?? []]
                  choices[index] = {
                    ...choices[index],
                    content: value
                  }
                  console.log(JSON.stringify(choices))

                  setQuestion({
                    ...question,
                    choices: choices
                  })
                }}
              />
            }
            <View style={styles.modalFooter}>
              <ButtonFullWith
                iconName='plus'
                title={t('AddQuestionView.addQuestionViewComponentButtonComplete')}
                onPress={() => onBtnCompleteAddQuestionPress()}
              />
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
