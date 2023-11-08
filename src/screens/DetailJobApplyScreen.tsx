import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import PDF from 'react-native-pdf';
import { FileUploadRequest } from '../types/request/FileUploadRequest';


interface SourceInteface{
  uri: string
  cache: boolean
}

const DetailJobApplyScreen = () => {
  const [sourcePDF , setSource]= useState<SourceInteface>({
    uri: '',
    cache: true
  })
  useEffect(() => {
      axios
      .get(`${SERVER_ADDRESS}api/job/1`)
      .then((response) => {
        console.log(response.data.data.cvUrl);
        setSource({ uri: `${SERVER_ADDRESS}api/files/${response.data.data.cvUrl}`, cache: true })
      })
  }, [])
  

  return (
    <View style={styles.detailJobAppyScreen}>
      <PDF
        trustAllCerts={false}
        source={sourcePDF}
        style={{ flex: 1 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    detailJobAppyScreen: {
    backgroundColor: 'white',
    flex: 1
  },
})

export default DetailJobApplyScreen