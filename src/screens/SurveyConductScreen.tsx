import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { RootStackParamList } from '../App'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import Loading from '../components/common/Loading'
import TextValidate from '../components/common/TextValidate'
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION, SHORT_ANSWER } from '../components/survey/AddQuestionModal'
import MultiChoiceQuestion from '../components/survey/MultiChoiceQuestion'
import OneChoiceQuestion from '../components/survey/OneChoiceQuestion'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'
import { useAppSelector } from '../redux/Hook'
import { useAddSurveyConductAnswerMutation, useGetQuestionsFromSurveyPostQuery } from '../redux/Service'
import { AnswerRequest, SurveyConductRequest } from '../types/request/SurveyConductRequest'
import { InputTextValidate, isNotBlank } from '../utils/ValidateUtils'

const isAllFieldValid = (validates: InputTextValidate[]) => {
    for (let validate of validates) {
        if (validate.isError) {
            return false
        }
    }

    return true
}

export default function SurveyConductScreen() {
    const t = useTranslation()
    const route = useRoute<RouteProp<RootStackParamList, 'SURVEY_CONDUCT_SCREEN'>>();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
    const [validates, setValidates] = useState<InputTextValidate[]>([]);
    const [surveyConductRequestAPI, surveyConductRequestResult] = useAddSurveyConductAnswerMutation();

    const [surveyConductRequest, setSurveyConductRequest] = useState<SurveyConductRequest>({
        user_id: userLogin?.id ?? -1,
        answers: []
    });

    const postId = route.params?.surveyPostId ?? -1;
    const userId = userLogin?.id ?? -1;

    const { data, isLoading, isSuccess } = useGetQuestionsFromSurveyPostQuery({ postId: postId, userLogin: userId });

    const onBtnPublishPostPress = () => {
        if (isAllFieldValid(validates)) {
            surveyConductRequestAPI(surveyConductRequest);
        } else {
            const tempValidates = [...validates];
            for (let validate of tempValidates) {
                if (validate.isError) {
                    validate.isVisible = true;
                }
            }
            setValidates(tempValidates);
        }
    };

    useEffect(() => {
        if (surveyConductRequestResult.isSuccess) {
            Alert.alert(t('SurveyConductScreen.surveyConductScreenSaveSuccessTitle'), t('SurveyConductScreen.surveyConductScreenSaveSuccessContent'));
            navigation.goBack();
        }
    }, [surveyConductRequestResult]);

    const onBtnBackPress = () => {
        navigation.goBack();
    };

    useEffect(() => {
        if (data && isSuccess) {
            let answer: AnswerRequest[] = [];
            let tempValidates: InputTextValidate[] = [];
            for (let question of data.data.questions) {
                answer.push({
                    question_id: question.id,
                    choices_ids: [],
                    content: ''
                });

                let textError = '';

                if (question.type === SHORT_ANSWER) {
                    textError = t('SurveyConductScreen.surveyConductScreenShortAnswerError');
                } else if (question.type === MULTI_CHOICE_QUESTION) {
                    textError = t('SurveyConductScreen.surveyConductScreenMultiQuestionMultiChoice');
                } else if (question.type === ONE_CHOICE_QUESTION) {
                    textError = t('SurveyConductScreen.surveyConductScreenMultiQuestionOneChoice');
                }

                tempValidates.push({
                    textError: textError,
                    isError: Boolean(question.required),
                    isVisible: false
                });
            }

            setSurveyConductRequest({
                ...surveyConductRequest,
                answers: answer
            });

            setValidates(tempValidates);
        }
    }, [data]);

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
                                            conductMode
                                            dataResponse={item}
                                            index={index}
                                            isDisableDeleteBtn
                                            onChangeValue={(choices) => {
                                                if (surveyConductRequest.answers[index]) {
                                                    if (choices.length > 0) {
                                                        surveyConductRequest.answers[index].choices_ids = choices;
                                                        let tempValidates = [...validates];
                                                        tempValidates[index].isError = false;
                                                        tempValidates[index].isVisible = false;
                                                        setValidates(tempValidates);
                                                    } else {
                                                        let tempValidates = [...validates];
                                                        tempValidates[index].isError = true;
                                                        tempValidates[index].isVisible = true;
                                                        setValidates(tempValidates);
                                                    }
                                                }
                                            }}
                                        />

                                        <TextValidate
                                            customStyle={{ marginStart: 7 }}
                                            textError={validates[index] ? validates[index].textError : ''}
                                            isVisible={validates[index] ? validates[index].isVisible : false}
                                            isError={validates[index] ? validates[index].isError : true}
                                        />
                                    </Fragment>
                                );
                            } else if (item.type === ONE_CHOICE_QUESTION) {
                                return (
                                    <Fragment key={index.toString()}>
                                        <OneChoiceQuestion
                                            conductMode
                                            dataResponse={item}
                                            index={index}
                                            isDisableDeleteBtn
                                            onChangeValue={(choices) => {
                                                if (surveyConductRequest.answers[index]) {
                                                    if (choices.length > 0) {
                                                        surveyConductRequest.answers[index].choices_ids = choices;
                                                        let tempValidates = [...validates];
                                                        tempValidates[index].isError = false;
                                                        tempValidates[index].isVisible = false;
                                                        setValidates(tempValidates);
                                                    } else {
                                                        let tempValidates = [...validates];
                                                        tempValidates[index].isError = true;
                                                        tempValidates[index].isVisible = true;
                                                        setValidates(tempValidates);
                                                    }
                                                }
                                            }}
                                        />

                                        <TextValidate
                                            customStyle={{ marginStart: 7 }}
                                            textError={validates[index] ? validates[index].textError : ''}
                                            isVisible={validates[index] ? validates[index].isVisible : false}
                                            isError={validates[index] ? validates[index].isError : true}
                                        />
                                    </Fragment>
                                );
                            } else {
                                return (
                                    <Fragment key={index.toString()}>
                                        <ShortAnswerQuestion
                                            conductMode
                                            onTextChange={(value) => {
                                                if (isNotBlank(value.trim())) {
                                                    surveyConductRequest.answers[index].content = value;
                                                    let tempValidates = [...validates];
                                                    tempValidates[index].isError = false;
                                                    tempValidates[index].isVisible = false;
                                                    setValidates(tempValidates);
                                                } else {
                                                    let tempValidates = [...validates];
                                                    tempValidates[index].isError = true;
                                                    tempValidates[index].isVisible = true;
                                                    setValidates(tempValidates);
                                                }
                                            }}
                                            dataResponse={item}
                                            index={index}
                                            isDisableDeleteBtn
                                            isEnableTextInput
                                        />

                                        <TextValidate
                                            customStyle={{ marginStart: 7 }}
                                            textError={validates[index] ? validates[index].textError : ''}
                                            isVisible={validates[index] ? validates[index].isVisible : false}
                                            isError={validates[index] ? validates[index].isError : true}
                                        />
                                    </Fragment>
                                );
                            }
                        })}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <ButtonFullWith
                            textColor='#000'
                            btnStyle={{ marginRight: 10, width: 140, backgroundColor: '#eee' }}
                            onPress={onBtnBackPress}
                            iconName='arrow-left-thin'
                            title={t('SurveyConductScreen.surveyConductScreenButtonGoBack')}
                        />

                        <ButtonFullWith
                            btnStyle={{ marginLeft: 10, width: 140 }}
                            onPress={onBtnPublishPostPress}
                            iconName='plus'
                            title={t('SurveyConductScreen.surveyConductScreenButtonComplete')}
                        />
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
