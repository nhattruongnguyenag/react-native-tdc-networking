import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { ChartData } from './OptionSurveyQuesionResult'

interface CustomizedPieNoteItemProps {
  data: ChartData[]
  index: number
}

export default function CustomizedPieNoteItem(props: CustomizedPieNoteItemProps) {
  const totalVotes = useMemo<number>(() => {
    return props.data.reduce((pre, cur) => {
      return pre + cur.votes
    }, 0)
  }, [])

  const getVotesPercent = (votes: number) => {
    return ((votes / totalVotes) * 100).toFixed(2) + ' %'
  }

  return (
    <View style={styles.body}>
      <View style={[styles.itemColor, { backgroundColor: props.data[props.index].color }]}></View>
      <View style={styles.itemTitle}>
        <Text style={{ textAlign: 'justify', color: props.data[props.index].color }}>
          {getVotesPercent(props.data[props.index].votes)} - {props.data[props.index].name}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  itemColor: {
    marginTop: 6,
    width: 20,
    height: 20,
    borderRadius: 999
  },
  itemTitle: {
    marginStart: 5,
    padding: 2,
    flexShrink: 1
  }
})
