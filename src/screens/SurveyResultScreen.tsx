import axios from 'axios'
import React, { Fragment, useCallback, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import Divider from '../components/Divider'
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from '../components/survey/AddQuestionView'
import OptionSurveyResult from '../components/surveyResult/OptionSurveyQuesionResult'
import { Data } from '../types/Data'
import { SurveyItemResult } from '../types/response/SurveyResult'

export default function SurveyResultScreen() {
  const [surveyResult, setSurveyResult] = useState<SurveyItemResult[]>([])

  axios
    .get<Data<SurveyItemResult[]>>('https://mocki.io/v1/f3a30a40-46da-4196-a2a6-ff71d2e625a6')
    .then((response) => setSurveyResult(response.data.data))

  const accordionContent = useCallback(
    (item: SurveyItemResult) => {
      if (item.type === ONE_CHOICE_QUESTION || item.type === MULTI_CHOICE_QUESTION) {
        return <OptionSurveyResult data={item} />
      }

      return <FlatList data={item.answers} renderItem={({ item, index }) => <List.Item title={item} />} />
    },
    [surveyResult]
  )

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
                titleStyle={{ fontSize: 17 }}
                id={index}
              >
                {accordionContent(item)}
              </List.Accordion>
              <Divider />
            </Fragment>
          )}
        />
      </List.AccordionGroup>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff'
  }
})
