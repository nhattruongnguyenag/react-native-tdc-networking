import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { SEACRH } from '../../constants/Screen'
export default function ToolBar() {
  const navigation = useNavigation<DrawerNavigationProp<any>>()

  const onSearchBtnPressHanling = () => {
    navigation.navigate(SEACRH)
  }

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action
        icon={'menu'}
        onPress={() => {
          navigation.openDrawer()
        }}
      />
      <Appbar.Content title='TDC Social Network' titleStyle={{color: '#0065FF', fontWeight: 'bold', fontSize: 20, fontFamily: ''}} />
      <Appbar.Action
        icon='magnify'
        size={30}
        onPress={() => {
          onSearchBtnPressHanling()
        }}
      />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 40
  },
  appbarContent: {
    color: '#fff'
  },
  appbarAction: {
    alignItems: 'center'
  }
})
