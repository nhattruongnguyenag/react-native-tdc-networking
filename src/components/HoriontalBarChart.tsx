import React, { useEffect, useMemo, useState } from 'react'
import { Text } from 'react-native'
import { FlatList, StyleSheet, View } from 'react-native'
import { SurveyItemResult } from '../types/response/SurveyResult'
import { WINDOW_WIDTH } from '../utils/SystemDimensions'
import BarItem from './survey-result/BarItem'
const randomColor = require('randomcolor')


interface HoriontalBarChartProps {
    data: SurveyItemResult
}

export default function HoriontalBarChart(props: HoriontalBarChartProps) {
    const [itemsVisible, setItemsVisible] = useState<boolean[]>([])
    const barColors = useMemo<string[]>(() => {
        if (props.data) {
            return props.data.choices.map((item) => randomColor())
        }

        return []
    }, [])

    const maxNumberVote = useMemo(() => {
        if (props.data) {
            return Math.max(...props.data.choices.map(item => item.vote))
        }

        return 0
    }, [])

    useEffect(() => {
        if (props.data && itemsVisible.length === 0) {
            setItemsVisible(props.data.choices.map(item => false))
        }
    }, [props.data])

    const [maxWidth, setMaxWidth] = useState(300)

    return (
        <View style={styles.container}>
            <FlatList
                data={props.data.choices}
                renderItem={({ item, index }) => <Text style={styles.yLabel}>{item.vote}</Text>}>
            </FlatList>
            <FlatList
                style={styles.barChartContainer}
                data={props.data.choices}
                renderItem={({ item, index }) => {
                    return (
                        <BarItem
                            barColor={barColors[index]}
                            onItemPress={() => {
                                const tempItemsVisible = [...itemsVisible]
                                tempItemsVisible[index] = !tempItemsVisible[index]
                                setItemsVisible(tempItemsVisible)
                            }}
                            tooltipVisible={itemsVisible[index]}
                            key={index.toString()}
                            barChartFlex={item.vote / maxNumberVote}
                            data={item}
                        />
                    )
                }} />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    barChartContainer: {
        flex: 1,
        borderLeftWidth: 1,
        paddingBottom: 25,
        marginRight: 10
    },
    yLabel: {
        height: 20,
        width: 50,
        marginTop: 25,
        marginRight: 5,
        textAlign: 'right'
    }
})