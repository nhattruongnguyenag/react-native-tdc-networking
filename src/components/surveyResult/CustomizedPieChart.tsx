import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit'
import { ChartData } from './OptionSurveyQuesionResult'
import { FlatList } from 'react-native-gesture-handler'
import BarNoteItem from './BarNoteItem'
import CustomizedPieNoteItem from './CustomizedPieNoteItem'

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgb(26, 255, 146)`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
}

interface CustomizedPieChartProps {
  data: ChartData[]
  accessor: string
}

export default function CustomizedPieChart(props: CustomizedPieChartProps) {
  return (
    <View style={styles.container}>
      <PieChart
        width={250}
        height={250}
        chartConfig={chartConfig}
        data={props.data}
        accessor={props.accessor}
        backgroundColor={'transparent'}
        paddingLeft={'20'}
        center={[40, 0]}
        hasLegend={false}
        hidePointsAtIndex={[0]}
      />

      <View style={styles.chartNote}>
        <FlatList
          data={props.data}
          renderItem={({ item, index }) => <CustomizedPieNoteItem data={props.data} index={index} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  chartNote: {
    marginStart: 40,
    marginRight: 10
  }
})
