import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { COLOR_BLACK, COLOR_GREY } from '../constants/Color'
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { formatVietNamCurrency } from '../utils/FormatCurrency'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import { RootStackParamList } from '../App'
import { JOB_APPLY_SCREEN } from '../constants/Screen'
import { formatDateTime } from '../utils/FormatTime'
import { useAppSelector } from '../redux/Hook'
import Loading from '../components/common/Loading'
import { useTranslation } from 'react-multi-lang'

export default function RecruitmentDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'RECRUITMENT_DETAIL_SCREEN'>>()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const postId = route.params?.postId ?? 0
  const [data, setData] = useState({
    createdAt: '',
    salary: '',
    expiration: '',
    location: '',
    employmentType: '',
    benefit: '',
    description: '',
    requirement: '',
    title: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState([data.benefit])
  const [description, setDescription] = useState([data.description])
  const [requirement, setRequirement] = useState([data.requirement])
  useEffect(() => {
    if (postId) {
      setIsLoading(true)
      axios
        .get(SERVER_ADDRESS + `api/posts/recruitment?postId=${postId}&&userLogin=${userLogin?.id}`)
        .then((recruitment) => {
          setIsLoading(false)
          setData(recruitment.data.data)
        })
        .catch((error) => {
          setIsLoading(false)
          console.log(error)
        })
    }
  }, [postId])

  const onSubmit = () => {
    navigation.navigate(JOB_APPLY_SCREEN, { recruitmentPostId: postId })
  }

  useEffect(() => {
    setResult(data.benefit.split(','))
    setDescription(data.description.split(','))
    setRequirement(data.requirement.split(','))
  }, [data.benefit, data.description, data.requirement])

  const t = useTranslation()
  return (
    <>
      {isLoading ? (
        <Loading title={t('RecuitmentPostDetailComponent.titleLoader')} />
      ) : (
        <ScrollView style={{backgroundColor:'#fff'}}>
          <>
            {data.title == '' ? (
              ''
            ) : (
              <>
                <SafeAreaView style={styles.container}>
                  <View style={styles.group}>
                    <View style={styles.item}>
                      <Text style={styles.txt}>{t('RecuitmentPostDetailComponent.titleJob')}</Text>
                      <View style={styles.iconRecuitment}>
                        <FontAwesome6Icon name='ranking-star' size={16} color={COLOR_GREY} />
                        <Text style={{ color: COLOR_BLACK }}>{data.title}</Text>
                      </View>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.txt}>{t('RecuitmentPostDetailComponent.employeType')}</Text>
                      <View style={styles.iconRecuitment}>
                        <Icon name='briefcase' size={16} color={COLOR_GREY} />
                        <Text style={{ color: COLOR_BLACK }}> {data.employmentType}</Text>
                      </View>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.txt}>{t('RecuitmentPostDetailComponent.salary')}</Text>
                      <View style={styles.iconRecuitment}>
                        <FontAwesome6Icon name='money-bill-1' size={16} color={COLOR_GREY} />
                        <Text style={{ color: COLOR_BLACK }}>
                          {' '}
                          {formatVietNamCurrency(data.salary)} {t('RecuitmentPostDetailComponent.salaryUnitMonth')}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.item}>
                      <Text style={styles.txt}>{t('RecuitmentPostDetailComponent.expiration')}</Text>
                      <View style={styles.iconRecuitment}>
                        <AntDesignIcon name='clockcircleo' size={16} color={COLOR_GREY} />
                        <Text style={{ color: COLOR_BLACK }}> {formatDateTime(data.expiration)}</Text>
                      </View>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.txt}>{t('RecuitmentPostDetailComponent.location')}</Text>
                      <View style={styles.iconRecuitment}>
                        <Icon name='map-marker-alt' size={16} color={COLOR_GREY} />
                        <Text style={{ color: COLOR_BLACK }}> {data.location}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.group1}>
                    <View>
                      <Text style={styles.headerWelfare}>{t('RecuitmentPostDetailComponent.benefit')}</Text>
                    </View>
                    <View style={styles.welfare}>
                      {result
                        .filter((item) => item !== '')
                        .map((item, index) => (
                          <Text style={styles.welfareTxt} key={index}>
                            {item}
                          </Text>
                        ))}
                    </View>
                  </View>

                  <View style={styles.group1}>
                    <View>
                      <Text style={styles.headerWelfare}>{t('RecuitmentPostDetailComponent.descriptionJob')}</Text>
                    </View>
                    <View>
                      {description
                        .filter((item) => item !== '')
                        .map((item, index) => (
                          <View style={styles.description} key={index}>
                            <Icon name='circle' style={styles.icon} />
                            <Text style={{ color: COLOR_BLACK }}>
                              {item.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </View>

                  <View style={styles.group1}>
                    <View>
                      <Text style={styles.headerWelfare}>{t('RecuitmentPostDetailComponent.requipmentJob')}</Text>
                    </View>
                    <View>
                      {requirement
                        .filter((item) => item !== '')
                        .map((item, index) => (
                          <View style={styles.description} key={index}>
                            <Icon name='circle' style={styles.icon} />
                            <Text style={{ color: COLOR_BLACK }}>
                              {item.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </View>
                </SafeAreaView>

                <View>
                  <TouchableOpacity style={styles.btnRecruitment} onPress={() => onSubmit()}>
                    <Text style={styles.txtRecruitment}>{t('RecuitmentPostDetailComponent.btnApplyJob')}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        </ScrollView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
  txtHeader: {
    color: COLOR_BLACK,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  group: {
    backgroundColor: '#F1F9FC',
    paddingVertical: 10,
    flex: 1
  },
  item: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 1,
    borderRadius: 10,
    borderBottomWidth: 1
  },
  txt: {
    color: COLOR_BLACK,
    fontWeight: 'bold',
    fontSize: 16
  },
  welfare: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10
  },
  welfareTxt: {
    backgroundColor: '#3cb371',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 5,
    marginRight: 5,
  },
  headerWelfare: {
    fontSize: 16,
    color: COLOR_BLACK,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5
  },
  group1: {
    marginHorizontal: 10,
    paddingVertical: 10,
    flex: 1
  },
  description: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 10
  },
  icon: {
    fontSize: 5,
    backgroundColor: COLOR_BLACK,
    borderRadius: 10,
    top: 7,
    margin: 5
  },
  btnRecruitment: {
    backgroundColor: '#3cb371',
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  txtRecruitment: {
    color: '#ffff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  iconRecuitment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2
  }
})
