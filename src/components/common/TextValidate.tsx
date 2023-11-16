import { StyleProp, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextStyle } from 'react-native'
import { COLOR_DANGER, COLOR_SUCCESS } from '../../constants/Color'

interface TextValidateProps {
  textError: string
  isError: boolean
  isVisible: boolean
  customStyle?: StyleProp<TextStyle>
}

export default function TextValidate(props: TextValidateProps) {
  return (
    <Text
      style={[
        styles.textError,
        props.customStyle,
        {
          color: props.isError ? COLOR_DANGER : COLOR_SUCCESS,
          display: props.isVisible ? 'flex' : 'none'
        }
      ]}
    >
      {props.isError ? props.textError : ''}
    </Text>
  )
}

const styles = StyleSheet.create({
  textError: {
    fontSize: 16,
    marginTop: 10
  }
})
