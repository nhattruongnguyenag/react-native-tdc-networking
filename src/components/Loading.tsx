import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

interface LoadingProps {
  title?: string
}

export default function Loading(props: LoadingProps) {
  return (
    <View style={styles.loadingBody}>
      <ActivityIndicator style={{ marginTop: -70 }} animating={true} color={'#0065FF'} />
      <Text style={{ marginTop: 20 }}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
