import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ListPostSavedScreen = () => {
  return (
    <View style={styles.searchScreen}>

      <View style={styles.operation}>
        <Text>Hello</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  searchScreen: {
    backgroundColor: 'white',
    flex: 1
  },
  operation: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    marginBottom: 50,

    backgroundColor: 'red'
  },
})

export default ListPostSavedScreen