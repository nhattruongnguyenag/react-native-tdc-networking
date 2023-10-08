import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer'
import { CREATE_SURVEY_SCREEN } from '../../constants/Screen'
import DrawerHeader from './DrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome6'
import Divider from '../Divider'

export default function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerHeader />
      <Divider />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})
