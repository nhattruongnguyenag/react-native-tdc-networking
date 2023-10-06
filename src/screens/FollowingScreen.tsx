import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';

const images = [
  'https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408-825x465.jpg',
  'https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408-825x465.jpg',
  'https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408-825x465.jpg',
]

const { width, height } = Dimensions.get('screen');
export default function FollowingScreen() {
  const onchange = (nativeEvent: any) => {

  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          pagingEnabled
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    width: width,
    height: height * 0.25
  }
})