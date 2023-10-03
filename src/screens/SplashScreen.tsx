import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'


// man hinh splash
export default function SplashScreen() {
  useEffect(() => {
    setTimeout(() => {

    }, 10000)
  })

  return (
    <View>
      <Image
        style={{ width: '100%', height: '100%'}}
        source={require('../assets/splash/splash.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
