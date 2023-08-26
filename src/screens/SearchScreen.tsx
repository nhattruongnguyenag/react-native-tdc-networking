import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../styles/GlobalStyles'
import { Divider } from 'react-native-paper'
import TaskSectionList from '../components/TaskSectionList'
import TaskFlatList from '../components/TaskSearchResultList'

export default function SearchScreen() {
  return (
    <ScrollView style={GlobalStyles.body}>
      <Text style={styles.resultTitle}>Search Result</Text>
      <Divider />
      <TaskFlatList style={{ marginTop: 10 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  resultTitle: {
    margin: 10,
    fontSize: 16
  }
})
