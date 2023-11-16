import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface DefaultAvatarProps {
  size?: number
  identifer?: string
}

export default function DefaultAvatar(props: DefaultAvatarProps) {
  return (
    <View
      style={{
        borderRadius: 999,
        backgroundColor: '#f0f0f0',
        width: props.size ? props.size : 60,
        height: props.size ? props.size : 60,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ fontSize: props.size ? (props.size > 50 ? 18 : 14) : 18 }}>{props.identifer}</Text>
    </View>
  )
}
