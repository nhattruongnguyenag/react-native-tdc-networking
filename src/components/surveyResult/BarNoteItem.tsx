import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface BarNoteItemProps {
  title: string
  color: string
}

export default function BarNoteItem(props: BarNoteItemProps) {
  return (
    <View style={styles.body}>
      <View style={[styles.itemColor, { backgroundColor: props.color }]}></View>
      <View style={styles.itemTitle}>
        <Text style={{ textAlign: 'justify' }}>{props.title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  itemColor: {
    marginTop: 4,
    width: 20,
    height: 20,
    borderRadius: 2
  },
  itemTitle: {
    marginStart: 5,
    padding: 2,
    flexShrink: 1
  }
})
