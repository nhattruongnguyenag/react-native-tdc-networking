import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Checkbox, RadioButton } from 'react-native-paper'

interface CheckboxInputWithTitleProps {
  label?: string
  onPress?: (check: boolean) => void
}

export default function CheckboxInputWithTitle(props: CheckboxInputWithTitleProps) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    props.onPress && props.onPress(checked)
  }, [checked])

  return (
    <View style={styles.radioInputBody}>
      <Checkbox.Android
        onPress={() => {
          setChecked(!checked)
        }}
        status={checked ? 'checked' : 'unchecked'}
      />
      <Pressable
        onPress={() => {
          setChecked(!checked)
        }}>
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
