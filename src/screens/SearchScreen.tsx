import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Divider } from 'react-native-paper'
import TaskSearchResultList from '../components/TaskSearchResultList'
import GlobalStyles from '../styles/GlobalStyles'

export default function SearchScreen() {
  return (
    <ScrollView style={GlobalStyles.body}>
      <Text style={styles.resultTitle}>Search Result</Text>
      <Divider />
      <TaskSearchResultList style={{ marginTop: 10 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  resultTitle: {
    margin: 10,
    fontSize: 16
  }
})
