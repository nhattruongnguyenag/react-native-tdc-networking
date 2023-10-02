import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IconButton from '../buttons/IconButton'

interface ToolbarWithBackPressProps {
  title: string
}

export default function ToolbarWithBackPress({ title }: ToolbarWithBackPressProps) {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()
  return (
    <View style={styles.toolbarBody}>
      <IconButton
        iconSize={18}
        iconName='chevron-left'
        iconColor='#000'
        onPress={() => navigation.goBack()}
        inactiveBackgroundColor='#ffffff00'
        activeBackgroundColor='#ffffff1a'
        customStyle={styles.backBtnStyle}
      />

      <Text style={styles.toolbarTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  toolbarBody: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#fff',
    elevation: 5
  },
  toolbarTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  },
  backBtnStyle: {
    position: 'absolute',
    left: 10,
    zIndex: 99
  }
})
