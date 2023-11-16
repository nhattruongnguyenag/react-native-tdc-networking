import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useState } from 'react'
import Tooltip from 'react-native-walkthrough-tooltip'
import { Pressable } from 'react-native'
import { ChoiceItemResult } from '../../types/response/SurveyResult'
import { LayoutChangeEvent } from 'react-native'
import { ChartData } from './OptionSurveyQuesionResult'
import { BAR_ITEM_COMPONENT_NUMBER_OF_VOTE } from '../../constants/StringVietnamese'

interface BarItemProps {
  width?: number
  barChartFlex: number
  data: ChartData
  ref?: React.LegacyRef<View> | undefined
}

function BarItem(props: BarItemProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  return (
    <Tooltip
      closeOnBackgroundInteraction
      closeOnContentInteraction
      contentStyle={{ backgroundColor: '#555' }}
      topAdjustment={25}
      backgroundColor={'#ffffff00'}
      showChildInTooltip={false}
      isVisible={tooltipVisible}
      content={<Text style={{ color: '#fff' }}>{props.data.name + ' (' + props.data.votes + BAR_ITEM_COMPONENT_NUMBER_OF_VOTE + ')'}</Text>}
      onClose={() => setTooltipVisible(false)}
      placement='top'
    >
      <Pressable
        onPress={() => {
          setTooltipVisible(true)
          console.log(props.data.color)
        }}
        style={[styles.barChartItemContainer, { backgroundColor: props.data.color + (tooltipVisible ? 'b3' : 'ff') }]}
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

export default memo(BarItem)