import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from '../components/survey/AddQuestionView'
import MultiChoiceQuestion from '../components/survey/MultiChoiceQuestion'
import OneChoiceQuestion from '../components/survey/OneChoiceQuestion'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'
import { TOP_TAB_NAVIGATOR } from '../constants/Screen'
import { useAppSelector } from '../redux/Hook'
import { useAddSurveyPostMutation } from '../redux/Service'

export default function ReviewSurveyPostScreen() {
  const t = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const [addSurvey, addSurveyResult] = useAddSurveyPostMutation();

  useEffect(() => {
    if (addSurveyResult.data) {
      if (addSurveyResult.data.status === 201 || 200) {
        Alert.alert(t('ReviewSurveyPostScreen.reviewSurveyScreenSaveSuccessTitle'), t('ReviewSurveyPostScreen.reviewSurveyScreenSaveSuccessContent'));
        navigation.navigate(TOP_TAB_NAVIGATOR);
      } else {
        Alert.alert(t('ReviewSurveyPostScreen.reviewSurveyScreenSaveFailTitle'), t('ReviewSurveyPostScreen.reviewSurveyScreenSaveFailContent'));
      }
    }
  }, [addSurveyResult]);

  const onBtnPublishPostPress = () => {
    console.log(JSON.stringify(surveyPostRequest));
    if (surveyPostRequest) {
      addSurvey(surveyPostRequest);
    }
  };

  const onBtnBackPress = useCallback(() => {
    navigation.pop();
  }, []);

  return (
    <ScrollView style={styles.body}>
      <Text style={styles.surveyTitle}>{surveyPostRequest?.title}</Text>

      <Text style={styles.surveyDesc}>{surveyPostRequest?.description}</Text>

      <Text style={styles.textTitle}>{t('ReviewSurveyPostScreen.reviewSurveyScreenButtonComplete')}</Text>

      <View style={styles.questionWrapper}>
        {surveyPostRequest?.questions.map((item, index) => {
          if (item.type === MULTI_CHOICE_QUESTION) {
            return <MultiChoiceQuestion key={index} reviewMode data={item} index={index} isDisableDeleteBtn />;
          } else if (item.type === ONE_CHOICE_QUESTION) {
            return <OneChoiceQuestion key={index} reviewMode data={item} index={index} isDisableDeleteBtn />;
          } else {
            return <ShortAnswerQuestion key={index} reviewMode data={item} index={index} isDisableDeleteBtn />;
          }
        })}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <ButtonFullWith
          textColor='#000'
          btnStyle={{ marginRight: 10, width: 140, backgroundColor: '#eee' }}
          onPress={onBtnBackPress}
          iconName='arrow-left-thin'
          title={t('ReviewSurveyPostScreen.reviewSurveyScreenButtonGoBack')}
        />

        <ButtonFullWith
          btnStyle={{ marginLeft: 10, width: 140 }}
          onPress={onBtnPublishPostPress}
          iconName='plus'
          title={t('ReviewSurveyPostScreen.reviewSurveyScreenButtonComplete')}
        />
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5
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
