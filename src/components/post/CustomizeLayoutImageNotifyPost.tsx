import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOR_BLACK, COLOR_IMAGE_ERROR } from '../../constants/Color'

//  Constant
const TEXT_IMAGE_ERROR = `Count't Load Activity`
const CustomizeLayoutImageNotify = () => {
  console.log('====================================');
  console.log("CustomizeLayoutImageNotify");
  console.log('====================================');
  return (
    <View style={styles.container}>
      <Ionicons name='refresh-outline' size={30} color={COLOR_BLACK} />
      <Text>{TEXT_IMAGE_ERROR}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_IMAGE_ERROR
  }
})
export default CustomizeLayoutImageNotify
