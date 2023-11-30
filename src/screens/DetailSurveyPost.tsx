import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useMemo, useState } from 'react'
import Loading from '../components/common/Loading';
import { ScrollView } from 'react-native-gesture-handler';
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from '../components/survey/AddQuestionModal';
import MultiChoiceQuestion from '../components/survey/MultiChoiceQuestion';
import { CONDUCT_MODE } from '../constants/Variables';
import OneChoiceQuestion from '../components/survey/OneChoiceQuestion';
import TextValidate from '../components/common/TextValidate';
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion';
import { InputTextValidate, isNotBlank } from '../utils/ValidateUtils';
import { useAppSelector } from '../redux/Hook';
import { useTranslation } from 'react-multi-lang';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { useAddSurveyConductAnswerMutation, useGetQuestionsFromSurveyPostQuery } from '../redux/Service';
import { SurveyConductRequest } from '../types/request/SurveyConductRequest';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function DetailSurveyPost() {
    const t = useTranslation()
    const route = useRoute<RouteProp<RootStackParamList, 'SURVEY_CONDUCT_SCREEN'>>();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
    const [validates, setValidates] = useState<InputTextValidate[]>([]);
    const [surveyConductRequestAPI, surveyConductRequestResult] = useAddSurveyConductAnswerMutation();

    const [surveyConductRequest, setSurveyConductRequest] = useState<SurveyConductRequest>({
        user_id: userLogin?.id ?? -1,
        answers: []
    })

    const postId = route.params?.surveyPostId ?? -1;
    const userId = userLogin?.id ?? -1;

    const { data, isLoading, isSuccess } = useGetQuestionsFromSurveyPostQuery({ postId: postId, userLogin: userId }, { refetchOnFocus: true, refetchOnMountOrArgChange: true })


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
                                            mode={[CONDUCT_MODE]}
                                            conductMode
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
                                            mode={[CONDUCT_MODE]}
                                            conductMode
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
                                            mode={[CONDUCT_MODE]}
                                            conductMode
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