import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface MessageSectionTitleProps {
  title?: string
  visible?: boolean
}

export default function MessageSectionTitle(props: MessageSectionTitleProps) {
  return (
    <View style={[styles.body, { display: Boolean(props.visible) ? 'flex' : 'none' }]}>
      <Text>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
    paddingHorizontal: 30,
    marginStart: 'auto',
    marginEnd: 'auto',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 25,
    padding: 2,
    borderRadius: 999
  }
})
