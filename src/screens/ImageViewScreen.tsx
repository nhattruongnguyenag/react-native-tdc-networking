import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ImageView from 'react-native-image-viewing'

export default function ImageViewScreen() {
  const images = [
    {
      uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4'
    },
    {
      uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34'
    },
    {
      uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111'
    }
  ]

  const [visible, setIsVisible] = useState(true)

  return (
    <ImageView
      images={images}
      imageIndex={0}
      visible={true}
      onRequestClose={() => setIsVisible(false)}
      animationType={'slide'}
      presentationStyle={'overFullScreen'}
      doubleTapToZoomEnabled={true}
    />
  )
}

const styles = StyleSheet.create({})
