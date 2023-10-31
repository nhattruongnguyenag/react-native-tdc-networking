import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'

interface RadioInputWithTitleProps {
  label?: string
  value?: string
}

export default function RadioInputWithTitle(props: RadioInputWithTitleProps) {
  return (
    <View style={styles.radioInputBody}>
      <RadioButton value={props.value ?? ''} />
      <Text style={styles.radioInputTitle}>{props.label ?? ''}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  radioInputBody: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#000'
  },
  radioInputTitle: {
    fontSize: 16
  }
})
