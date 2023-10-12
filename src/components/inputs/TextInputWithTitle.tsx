import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

interface TextInputWithTitleProps {
  title?: string
  placeholder?: string
  onChangeText?: (value: string) => void
}

export default function TextInputWithTitle(props: TextInputWithTitleProps) {
  return (
    <View style={styles.group}>
      <Text style={styles.txt}>{props.title}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.ip}
        onChangeText={(value) => props.onChangeText && props.onChangeText(value)}
      ></TextInput>
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
