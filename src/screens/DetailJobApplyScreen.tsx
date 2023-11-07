import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { Post } from '../types/Post';
import { ScrollView } from 'react-native-gesture-handler';
import PDF from 'react-native-pdf';
import DocumentPicker from 'react-native-document-picker';
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
  // const source = { uri: `${SERVER_ADDRESS}api/files/43_TB 148_HP GDQP HK he (1).pdf`, cache: true };
  useEffect(() => {
      axios
      .get(`${SERVER_ADDRESS}api/job/1`)
      .then((response) => {
        console.log(response.data.data.cvUrl);
        setSource({ uri: `${SERVER_ADDRESS}api/files/${response.data.data.cvUrl}`, cache: true })
      })
  }, [])
  

  return (
    <View style={styles.searchScreen}>

      <PDF
        trustAllCerts={false}
        source={sourcePDF}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`)
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`)
        }}
        onError={(error) => {
          console.log(error)
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`)
        }}
        style={{ flex: 1 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchScreen: {
    backgroundColor: 'white',
    flex: 1
  },
  operation: {
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    marginBottom: 20,
  },
  dropDown: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
})

export default DetailJobApplyScreen