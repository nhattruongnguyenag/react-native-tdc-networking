import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'
import React from 'react'

interface TextInputWithTitleProps {
  title?: string
  placeholder?: string
  onChangeText?: (value: string) => void
  multiline?: boolean
  textInputStyle?: StyleProp<TextStyle>
  numberOfLine?: number
  onFocus?: () => void
  onBlur?: () => void
  value?: string
}

export default function TextInputWithTitle(props: TextInputWithTitleProps) {
  return (
    <View style={styles.group}>
      <Text style={[styles.txt, { display: props.title ? 'flex' : 'none' }]}>{props.title}</Text>
      <TextInput
        value={props.value}
        onBlur={() => props.onBlur && props.onBlur()}
        onFocus={() => props.onFocus && props.onFocus()}
        numberOfLines={props.numberOfLine ? props.numberOfLine : 1}
        multiline={props.multiline ? props.multiline : false}
        placeholder={props.placeholder}
        style={[styles.ip, props.textInputStyle]}
        onChangeText={(value) => props.onChangeText && props.onChangeText(value)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  group: {
    marginTop: 20,
    marginHorizontal: 10
  },
  txt: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16
  },
  ip: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#97A1B0',
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10
  }
})
