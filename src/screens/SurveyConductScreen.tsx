import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../App'
import { useGetQuestionsFromSurveyPostQuery } from '../redux/Service'
import MultiChoiceQuestion from '../components/survey/MultiChoiceQuestion'
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from '../components/survey/AddQuestionView'
import OneChoiceQuestion from '../components/survey/OneChoiceQuestion'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export default function SurveyConductScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'SURVEY_CONDUCT_SCREEN'>>()
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const { data, isFetching, isSuccess } = useGetQuestionsFromSurveyPostQuery(route.params?.surveyPostId ?? -1, { pollingInterval: 1000 })

    const onBtnPublishPostPress = () => {

    }

    const onBtnBackPress = () => {
        navigation.goBack()
    }

    return (
        <ScrollView style={styles.body}>
            <View style={styles.questionWrapper}>
                {data?.data.questions.map((item, index) => {
                    if (item.type === MULTI_CHOICE_QUESTION) {
                        return <MultiChoiceQuestion
                            data={item}
                            index={index}
                            isDisableDeleteBtn
                        />
                    } else if (item.type === ONE_CHOICE_QUESTION) {
                        return <OneChoiceQuestion
                            data={item}
                            index={index}
                            isDisableDeleteBtn
                        />
                    } else {
                        return <ShortAnswerQuestion
                            data={item}
                            index={index}
                            isDisableDeleteBtn
                            isEnableTextInput />
                    }
                })}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <ButtonFullWith
                    btnStyle={{ marginRight: 10, width: 140 }}
                    onPress={onBtnBackPress}
                    iconName='arrow-left-thin'
                    title='Quay lại'
                />

                <ButtonFullWith
                    btnStyle={{ marginLeft: 10, width: 140 }}
                    onPress={onBtnPublishPostPress}
                    iconName='plus'
                    title='Hoàn tất'
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingTop: 10
    },
    textInputStyle: {
        textAlignVertical: 'top',
        paddingTop: 15,
        marginBottom: 10
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#0065FF',
        marginTop: 15,
        marginHorizontal: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4
    },
    questionWrapper: {
        paddingHorizontal: 5
    },
    surveyTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
        marginStart: 5,
        marginTop: 15
    },
    surveyDesc: {
        marginStart: 5,
        marginTop: 10,
        fontSize: 16
    }
})