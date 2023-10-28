import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'

interface RadioInputWithTitleProps {
  label?: string
  value?: string
  onPress?: () => void
}

export default function RadioInputWithTitle(props: RadioInputWithTitleProps) {
  return (
    <View style={styles.radioInputBody}>
      <RadioButton
        value={props.value ?? ''} />
      <Pressable
        onPress={() => props.onPress && props.onPress()}>
        <Text style={styles.radioInputTitle}>{props.label ?? ''}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  radioInputBody: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#000',
    marginTop: 5
  },
  radioInputTitle: {
    fontSize: 16
  }
})
