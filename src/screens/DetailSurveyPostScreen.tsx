import { RouteProp, useRoute } from '@react-navigation/native';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-multi-lang';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParamList } from '../App';
import Loading from '../components/common/Loading';
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from '../components/survey/AddQuestionModal';
import MultiChoiceQuestion from '../components/survey/MultiChoiceQuestion';
import OneChoiceQuestion from '../components/survey/OneChoiceQuestion';
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion';
import { REVIEW_MODE } from '../constants/Variables';
import { useAppSelector } from '../redux/Hook';
import { useGetQuestionsFromSurveyPostQuery } from '../redux/Service';

export default function DetailSurveyPostScreen() {
    const t = useTranslation()
    const route = useRoute<RouteProp<RootStackParamList, 'SURVEY_CONDUCT_SCREEN'>>()
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)

    const postId = route.params?.surveyPostId ?? -1;
    const userId = userLogin?.id ?? -1;

    const { data, isLoading, isSuccess, error } = useGetQuestionsFromSurveyPostQuery({ postId: postId, userLogin: userId }, { refetchOnFocus: true, refetchOnMountOrArgChange: true })

    console.log(error)
    return (
        <Fragment>
            {isLoading ? (
                <Loading title={t('SurveyConductScreen.surveyConductScreenLoaderTitle')} />
            ) : (
                <ScrollView style={styles.body}>
                    <View style={styles.questionWrapper}>
                        {data?.data.questions.map((item, index) => {
                            if (item.type === MULTI_CHOICE_QUESTION) {
                                return (
                                    <Fragment key={index.toString()}>
                                        <MultiChoiceQuestion
                                            mode={[REVIEW_MODE]}
                                            dataResponse={item}
                                            index={index}
                                            isDisableDeleteBtn
                                        />
                                    </Fragment>
                                );
                            } else if (item.type === ONE_CHOICE_QUESTION) {
                                return (
                                    <Fragment key={index.toString()}>
                                        <OneChoiceQuestion
                                            mode={[REVIEW_MODE]}
                                            dataResponse={item}
                                            index={index}
                                            isDisableDeleteBtn
                                        />
                                    </Fragment>
                                );
                            } else {
                                return (
                                    <Fragment key={index.toString()}>
                                        <ShortAnswerQuestion
                                            mode={[REVIEW_MODE]}
                                            dataResponse={item}
                                            index={index}
                                            isDisableDeleteBtn
                                            isEnableTextInput
                                        />
                                    </Fragment>
                                )
                            }
                        })}
                    </View>
                </ScrollView>
            )}
        </Fragment>
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
    }
})