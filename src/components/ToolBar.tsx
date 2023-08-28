import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import GlobalStyles from '../styles/GlobalStyles'
export default function ToolBar() {
  const navigation = useNavigation<DrawerNavigationProp<any>>()

  const onSearchBtnPressHanling = () => {
    navigation.navigate('Search')
  }

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action
        icon={'menu'}
        color={'#fff'}
        onPress={() => {
          navigation.openDrawer()
        }}
      />
      <Appbar.Content title='Todo App' titleStyle={[GlobalStyles.textWhite, GlobalStyles.title]} />
      <Appbar.Action
        icon='magnify'
        size={25}
        color={'#fff'}
        onPress={() => {
          onSearchBtnPressHanling()
        }}
      />
      <Appbar.Action icon={'cog'} size={22} color={'#fff'} onPress={() => {}} />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0088ff',
    height: 60
  },
  appbarContent: {
    color: '#fff'
  },
  appbarAction: {
    alignItems: 'center'
  }
})
