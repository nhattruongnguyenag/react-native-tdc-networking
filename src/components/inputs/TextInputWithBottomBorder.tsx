import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useMemo } from 'react'
import { IconButton } from 'react-native-paper'
import { ChoiceProps } from '../../types/Question'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { addChoice, deleteChoice, updateChoice } from '../../redux/Slice'

interface TextInputWithBottomBorderProps {
  defaultValue?: string
  placeholder?: string
  icon?: string
  iconColor?: string
  onActionButtonPress?: () => void
  onTextChange?: (value: string) => void
}

export default function TextInputWithBottomBorder(props: TextInputWithBottomBorderProps) {
  const dispatch = useAppDispatch()

  return (
    <TextInput
      defaultValue={props.defaultValue}
      multiline
      placeholder={props.placeholder}
      style={styles.ip}
      onChangeText={(value) => props.onTextChange && props.onTextChange(value)}
    />
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
