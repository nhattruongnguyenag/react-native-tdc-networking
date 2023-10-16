import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useMemo } from 'react'
import { IconButton } from 'react-native-paper'
import { ChoiceProps } from '../../types/Question'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { addChoice, deleteChoice, updateChoice } from '../../redux/Slice'

interface TextInputWithBottomBorderProps {
  placeholder?: string
  choice: ChoiceProps
  totalChoices: number
}

export default function TextInputWithBottomBorder(props: TextInputWithBottomBorderProps) {
  const dispatch = useAppDispatch()
  const { choices } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  const btnActionIcon = useMemo(() => {
    if (props.choice.index === props.totalChoices - 1) {
      return 'plus'
    }
    return 'delete'
  }, [choices])

  const btnActionIconColor = useMemo(() => {
    if (props.choice.index === props.totalChoices - 1) {
      return '#037fe8'
    }
    return '#f70000'
  }, [choices])

  const onBtnActionPress = () => {
    if (props.choice.index === props.totalChoices - 1) {
      dispatch(addChoice(''))
    } else {
      dispatch(deleteChoice(props.choice.index))
    }
  }

  const onChoiceInputChangeText = (value: string) => {
    props.choice.data = value
    dispatch(updateChoice(props.choice))
  }

  return (
    <View style={styles.body}>
      <TextInput
        multiline
        placeholder={props.placeholder}
        style={styles.ip}
        onChangeText={(value) => onChoiceInputChangeText(value)}
      />
      <IconButton
        icon={btnActionIcon}
        iconColor={btnActionIconColor}
        size={22}
        onPress={() => {
          onBtnActionPress()
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
  ip: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#97A1B0',
    padding: 5,
    flex: 1
  }
})
