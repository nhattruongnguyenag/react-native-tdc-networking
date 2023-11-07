import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Tooltip from 'react-native-walkthrough-tooltip'
import { Pressable } from 'react-native'
import { ChoiceItemResult } from '../../types/response/SurveyResult'
import { LayoutChangeEvent } from 'react-native'
import { ChartData } from './OptionSurveyQuesionResult'

interface BarItemProps {
  tooltipVisible: boolean
  width?: number
  barChartFlex: number
  data: ChartData
  ref?: React.LegacyRef<View> | undefined
  onLayout?: (event: LayoutChangeEvent) => void
  onItemPress?: () => void
}

export default function BarItem(props: BarItemProps) {
  return (
    <Tooltip
      closeOnBackgroundInteraction
      closeOnContentInteraction
      contentStyle={{ backgroundColor: '#555' }}
      topAdjustment={25}
      backgroundColor={'#ffffff00'}
      showChildInTooltip={false}
      isVisible={props.tooltipVisible}
      content={<Text style={{ color: '#fff' }}>{props.data.name + ' (' + props.data.votes + ' lượt bình chọn)'}</Text>}
      onClose={() => props.onItemPress && props.onItemPress()}
      placement='top'
    >
      <Pressable
        onPress={() => {
          props.onItemPress && props.onItemPress()
        }}
        style={[styles.barChartItemContainer, { backgroundColor: props.data.color }]}
      >
        <View ref={props.ref} style={[styles.bar, { flex: props.barChartFlex }]} />
        <View style={[styles.barLabelWrapper, { flex: 1 - props.barChartFlex }]}></View>
      </Pressable>
    </Tooltip>
  )
}

const styles = StyleSheet.create({
  barChartItemContainer: {
    flexDirection: 'row',
    marginTop: 25
  },
  bar: {
    height: 20
  },
  barLabel: {
    marginHorizontal: 10
  },
  barLabelWrapper: {
    backgroundColor: '#eee'
  }
})
