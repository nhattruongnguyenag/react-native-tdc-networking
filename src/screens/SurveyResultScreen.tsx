import { RouteProp, useRoute } from '@react-navigation/native'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { RootStackParamList } from '../App'
import Divider from '../components/Divider'
import Loading from '../components/Loading'
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from '../components/survey/AddQuestionView'
import OptionSurveyResult from '../components/surveyResult/OptionSurveyQuesionResult'
import SurveyResultSkeleton from '../components/surveyResult/SurveyResultSkeleton'
import { COLOR_WHITE } from '../constants/Color'
import { useGetSurveyResultQuery } from '../redux/Service'
import { SurveyItemResult } from '../types/response/SurveyResult'

export default function SurveyResultScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'SURVEY_RESULT_SCREEN'>>()
  const surveyPostId = route.params?.surveyPostId ?? -1
  const { data, isLoading, isFetching } = useGetSurveyResultQuery(surveyPostId, {
    pollingInterval: 1000
  })

  const accordionContent = useCallback(
    (item: SurveyItemResult) => {

      if (item.type === ONE_CHOICE_QUESTION || item.type === MULTI_CHOICE_QUESTION) {
        if (item.choices.reduce((curr, next) => curr + next.votes, 0) === 0) {
          return <List.Item title={'Chưa có lượt bình chọn nào'} />
        } else {
          return <OptionSurveyResult data={item} />
        }
      }
      return item.answers.length === 0 ?
        <List.Item title={'Chưa có câu trả lời'} />
        :
        <Fragment>
          <List.Item title={`${item.answers.length} câu trả lời`} />
          <FlatList data={item.answers} renderItem={({ item, index }) => <List.Item title={item} />} />
        </Fragment>
    },
    [data, isFetching]
  )

  return (
    <Fragment>
      {
        isLoading ?
          <Loading title={'Đang tải dữ liệu'} />
          :
          <ScrollView style={styles.body}>
            <List.AccordionGroup>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={data?.data}
                renderItem={({ item, index }) => (
                  <Fragment>
                    <List.Accordion
                      key={index}
                      titleNumberOfLines={5}
                      title={item.title}
                      titleStyle={{ fontSize: 17 }}
                      id={index}>
                      {accordionContent(item)}
                    </List.Accordion>
                    <Divider />
                  </Fragment>
                )}
              />
            </List.AccordionGroup>
          </ScrollView>
      }
    </Fragment>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1
  }
})
