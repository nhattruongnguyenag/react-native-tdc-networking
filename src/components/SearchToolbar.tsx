import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Appbar } from 'react-native-paper'
import GlobalStyles from '../styles/GlobalStyles'
import TextInputWithLeftIcon from './TextInputWithLeftIcon'

export default function SearchToolbar() {
  const navigation = useNavigation<DrawerNavigationProp<any>>()

  return (
    <Appbar.Header style={[GlobalStyles.toolbarHeader, { padding: 20 }]}>
      <Appbar.BackAction
        color='#fff'
        onPress={() => {
          navigation.goBack()
        }}
      />
      <TextInputWithLeftIcon />
      <Appbar.Action icon={'cog'} size={22} color={'#fff'} onPress={() => {}} />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({

})
