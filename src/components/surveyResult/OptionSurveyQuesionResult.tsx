import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { SurveyItemResult } from '../../types/response/SurveyResult'
import HoriontalBarChart from './HoriontalBarChart'
import CustomizedPieChart from './CustomizedPieChart'

const randomColor = require('randomcolor')

interface OptionSurveyQuesionResultProps {
  data: SurveyItemResult
}

export interface ChartData {
  name: string
  votes: number
  color: string
  legendFontColor: string
  legendFontSize: number
}

export default function OptionSurveyQuesionResult(props: OptionSurveyQuesionResultProps) {
  const randomColors = useMemo<string[]>(() => {
    if (props.data) {
      return props.data.choices.map((item) => randomColor())
    }

    return []
  }, [])

  const chartData = useMemo<ChartData[]>(() => {
    return props.data.choices.map((item, index) => {
      return {
        name: item.content,
        votes: item.votes,
        color: randomColors[index],
        legendFontColor: randomColors[index],
        legendFontSize: 16
      }
    })
  }, [])

  return (
    <View>
      <HoriontalBarChart data={chartData} />
      <CustomizedPieChart accessor={'votes'} data={chartData} />
    </View>
  )
}
