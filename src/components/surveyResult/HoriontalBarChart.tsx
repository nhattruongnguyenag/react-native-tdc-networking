import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Text } from 'react-native'
import { FlatList, StyleSheet, View } from 'react-native'
import { SurveyItemResult } from '../../types/response/SurveyResult'
import { WINDOW_WIDTH } from '../../utils/SystemDimensions'
import BarNoteItem from './BarNoteItem'
import BarItem from './BarItem'
import { ChartData } from './OptionSurveyQuesionResult'
const randomColor = require('randomcolor')

interface HoriontalBarChartProps {
  data: ChartData[]
}

export default function HoriontalBarChart(props: HoriontalBarChartProps) {
  const itemsVisible = useMemo<boolean[]>(() => {
    return props.data.map((item) => false)
  }, [])

  const maxNumberVote = useMemo(() => {
    return Math.max(...props.data.map((item) => item.votes))
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={({ item, index }) => <Text style={styles.yLabel}>{item.votes}</Text>}
      ></FlatList>
      <View style={styles.chartContainer}>
        <FlatList
          style={styles.barChartContainer}
          data={props.data}
          renderItem={({ item, index }) => {
            return (
              <BarItem
                onItemPress={() => {
                  itemsVisible[index] = !itemsVisible[index]
                }}
                tooltipVisible={itemsVisible[index]}
                key={index.toString()}
                barChartFlex={item.votes / maxNumberVote}
                data={item}
              />
            )
          }}
        />
        <View style={styles.chartNote}>
          <Text style={styles.chartNoteTitle}>Phương án</Text>
          <FlatList
            data={props.data}
            renderItem={({ item, index }) => <BarNoteItem title={item.name} color={item.color} />}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    marginStart: 15
  },
  chartContainer: {
    flex: 1,
    marginRight: 10
  },
  barChartContainer: {
    borderLeftWidth: 1,
    paddingBottom: 25
  },
  yLabel: {
    height: 20,
    marginTop: 25,
    marginRight: 5,
    textAlign: 'right',
    minWidth: 30
  },
  chartNote: {
    marginTop: 10
  },
  chartNoteTitle: {
    marginBottom: -5,
    fontSize: 15,
    fontWeight: 'bold'
  }
})
