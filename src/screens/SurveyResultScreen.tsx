import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useCallback, useState } from 'react'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import { IconButton, List } from 'react-native-paper'
import { SurveyItemResult } from '../types/response/SurveyResult'
import axios from 'axios'
import Divider from '../components/Divider'
import { Dimensions } from "react-native";

import { ScrollView } from 'react-native-gesture-handler'
import HoriontalBarChart from '../components/HoriontalBarChart'
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from '../components/survey/AddQuestionView'

export default function SurveyResultScreen() {
    const [surveyResult, setSurveyResult] = useState<SurveyItemResult[]>([])

    axios.get<SurveyItemResult[]>("https://mocki.io/v1/0d344e5c-abc8-43ae-9267-26dc4c3aa3ac")
        .then(data => setSurveyResult(data.data))

    const accordionContent = useCallback((item: SurveyItemResult) => {
        if (item.type === ONE_CHOICE_QUESTION || item.type === MULTI_CHOICE_QUESTION) {
            return <HoriontalBarChart
                data={item} />
        }

        return (
            <FlatList
                data={item.answers}
                renderItem={({ item, index }) => (
                    <List.Item title={item} />
                )} />
        )
    }, [surveyResult])
    return (
        <ScrollView style={styles.body}>
            <List.AccordionGroup>
                <FlatList
                    data={surveyResult}
                    renderItem={({ item, index }) => (
                        <Fragment>
                            <List.Accordion
                                key={index}
                                titleNumberOfLines={5}
                                title={item.title}
                                id={index}>
                                {
                                    accordionContent(item)
                                }
                            </List.Accordion>
                            <Divider />
                        </Fragment>
                    )} />
            </List.AccordionGroup>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff'
    }
})