import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { ViewStyle } from 'react-native'

interface ButtonFullWithProps {
  title?: string
  onPress?: () => void
  contentStyle?: StyleProp<ViewStyle>
  iconName?: string
  btnStyle?: StyleProp<ViewStyle>
  textColor?: string
  disable?: boolean
}

export default function ButtonFullWith(props: ButtonFullWithProps) {
  return (
    <Button
      disabled={Boolean(props.disable)}
      contentStyle={[props.contentStyle]}
      icon={props.iconName}
      mode='elevated'
      buttonColor={'#0065FF'}
      textColor={props.textColor ? props.textColor : '#fff'}
      style={[styles.buttonCreateRecruitment, props.btnStyle]}
      onPress={() => props.onPress && props.onPress()}
    >
      <Text style={[styles.buttonCreateRecruitmentTitle]}>{props.title}</Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  buttonCreateRecruitment: {
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 30,
    marginHorizontal: 5
  },
  buttonCreateRecruitmentTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
