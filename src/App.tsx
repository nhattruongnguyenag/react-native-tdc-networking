/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

import SplashScreen from 'react-native-splash-screen'

type SectionProps = PropsWithChildren<{
  title: string
}>

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black
          }
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark
          }
        ]}
      >
        {children}
      </Text>
    </View>
  )
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>Hello world !!!</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  }
})

export default App
