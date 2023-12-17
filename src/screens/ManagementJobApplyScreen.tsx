import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { COLOR_BLACK, COLOR_GREY, COLOR_SUCCESS, COLOR_WHITE } from '../constants/Color'
import { formatDateTime } from '../utils/FormatTime'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useAppSelector } from '../redux/Hook'
import { DETAIL_JOB_APPLY, JOB_APPLY_SCREEN } from '../constants/Screen'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { useGetJobProfileQuery } from '../redux/Service'
import Loading from '../components/common/Loading'
import DefaultAvatar from '../components/common/DefaultAvatar'
import { Dropdown } from 'react-native-element-dropdown'
import { t } from 'react-multi-lang'

export default function ManagementJobApplyScreen() {
  const dataType = [
    { label: t('ManageJobApply.textReceived'), value: 'received' },
    { label: t('ManageJobApply.textIn_progress'), value: 'in_progress' },
    { label: t('ManageJobApply.textNot_meet_standard_quality'), value: 'not_meet_standard_quality' },
    { label: t('ManageJobApply.textInterview'), value: 'interview' },
    {
      label: t('ManageJobApply.textInterview_not_meet_standard_quality'),
      value: 'interview_not_meet_standard_quality'
    },
    { label: t('ManageJobApply.textAccept'), value: 'accept' }
  ]

  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { data, isLoading } = useGetJobProfileQuery(userLogin?.id, {
    pollingInterval: 1000
  })
  const [value, setValue] = useState('received')
  const [item, setItem] = useState(t('ManageJobApply.textReceived'))

  const handleGetDetailJobApply = (cvId: number) => {
    navigation.navigate(DETAIL_JOB_APPLY, { cvId: cvId })
  }
  const handleUpdateCv = (profileId: number, cvUrl: string) => {
    navigation.navigate(JOB_APPLY_SCREEN, { profileId: profileId, cvUrl: cvUrl })
  }
  const handleDeleteCv = (profileId: number) => {
    axios
      .delete(SERVER_ADDRESS + `api/job/profile/${profileId}`)
      .then((response) => {
        Alert.alert(t('ManageJobApply.textNotification'), t('ManageJobApply.textDeleteSucces'))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLOR_WHITE }}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={dataType}
          labelField='label'
          valueField='value'
          placeholder={item}
          value={item}
          onChange={(item) => {
            setValue(item.value)
            setItem(item.label)
          }}
        />
      </SafeAreaView>

      {isLoading ? (
        <Loading title={t('ManageJobApply.textLoader')} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLOR_WHITE }}>
          <>
            {data?.data.length == 0 ? (
              <Text style={styles.textListNull}>{t('ManageJobApply.textListJobNull')}</Text>
            ) : (
              data?.data.map(
                (data, index) =>
                  data.status === value && (
                    <View style={styles.form} key={index}>
                      <View style={styles.group}>
                        <View style={{ flex: 3 }}>
                          {data.companyAvatar == '' ? (
                            <DefaultAvatar
                              size={80}
                              identifer={data.companyName[0].replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                            />
                          ) : (
                            <Image
                              source={{ uri: SERVER_ADDRESS + `api/images/${data.companyAvatar}` }}
                              style={styles.img}
                            />
                          )}
                        </View>
                        <View style={styles.item}>
                          <Text style={styles.txt}>{data.jobTitle}</Text>
                          <Text style={styles.txt}>{data.companyName}</Text>

                          <View style={styles.itemChild}>
                            <AntDesignIcon name='clockcircleo' size={16} color={COLOR_GREY} />
                            <Text style={{ marginLeft: 10, color: COLOR_BLACK, fontWeight: 'bold' }}>
                              {formatDateTime(data.createdAt)}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.btnBottom}>
                        <TouchableOpacity>
                          <Text style={styles.txtBtnBottom} onPress={() => handleGetDetailJobApply(data.id)}>
                            {t('ManageJobApply.textSeeCv')}
                          </Text>
                        </TouchableOpacity>
                        {data.status !== 'accept' && (
                          <TouchableOpacity>
                            <Text style={styles.txtBtnBottom} onPress={() => handleDeleteCv(data.id)}>
                              {t('ManageJobApply.textDelete')}
                            </Text>
                          </TouchableOpacity>
                        )}
                        {data.status === 'received' && (
                          <TouchableOpacity>
                            <Text style={styles.txtBtnBottom} onPress={() => handleUpdateCv(data.id, data.cvUrl)}>
                              {t('ManageJobApply.textChangeProfile')}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )
              )
            )}
          </>
        </ScrollView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  textListNull: {
    marginVertical: '50%',
    marginHorizontal: '25%',
    width: 'auto',
    fontSize: 20,
    fontWeight: 'bold'
  },
  header: {
    borderBottomWidth: 0.7
  },
  txtHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 5,
    paddingLeft: 15
  },

  btnType: {
    marginHorizontal: 10,
    marginVertical: 20
  },
  txtType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  group: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 100
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLOR_BLACK
  },
  form: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLOR_WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 6.27,
    elevation: 10
  },
  lbl: {
    fontSize: 16,
    color: COLOR_GREY,
    fontWeight: 'bold'
  },
  iconItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR_GREY,
    marginRight: 10
  },
  itemChild: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    flex: 8
  },
  btnBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  txtBtnBottom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR_SUCCESS,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10
  },
  dropdown: {
    height: 50,
    backgroundColor: COLOR_WHITE,
    paddingLeft: 10,
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 6.27,
    elevation: 5
  },

  placeholderStyle: {
    fontSize: 16,
    color: COLOR_BLACK
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLOR_BLACK
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 28
  }
})
