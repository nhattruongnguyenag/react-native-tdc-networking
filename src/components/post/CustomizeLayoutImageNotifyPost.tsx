import { View, Text, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOR_BLACK, COLOR_IMAGE_ERROR } from '../../constants/Color'
import { useTranslation } from 'react-multi-lang'

const CustomizeLayoutImageNotify = () => {
  const t = useTranslation();
  return (
    <View style={styles.container}>
      <Ionicons name='refresh-outline' size={30} color={COLOR_BLACK} />
      <Text>{t("ImageError.couldNotLoadActivity")}</Text>
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
export default memo(CustomizeLayoutImageNotify)
