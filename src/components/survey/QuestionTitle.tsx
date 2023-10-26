import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useAppDispatch } from '../../redux/Hook'
import { deleteQuestion } from '../../redux/Slice'

interface QuestionTitleProps {
  title: string
  index: number
  isDisableBtnDelete?: boolean
}

export default function QuestionTitle(props: QuestionTitleProps) {
  const dispatch = useAppDispatch()

  const onBtnDeletePress = () => {
    dispatch(deleteQuestion(props.index))
  }

  return (
    <View style={styles.body}>
      <Text style={styles.questionTitle}>{props.title}</Text>
      <IconButton
        icon='delete'
        iconColor='#f70000'
        size={25}
        style={[styles.btnDelete, { display: Boolean(props.isDisableBtnDelete) ? 'none' : 'flex' }]}
        onPress={() => {
          onBtnDeletePress()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  questionTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  btnDelete: {
    marginStart: 'auto',
    marginEnd: 0
  }
})
