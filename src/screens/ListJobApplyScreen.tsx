import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { COLOR_BLACK, COLOR_GREY, COLOR_SUCCESS, COLOR_WHITE } from '../constants/Color'
import { Image } from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../App'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import DefaultAvatar from '../components/common/DefaultAvatar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { DETAIL_JOB_APPLY } from '../constants/Screen'
import Loading from '../components/common/Loading'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { formatDateTime } from '../utils/FormatTime'
import { t } from 'react-multi-lang'
import { useGetProfileApplyQuery, useJobApplyUpdateMutation } from '../redux/Service'
import { Dropdown } from 'react-native-element-dropdown'
import { Modal, PaperProvider, Portal } from 'react-native-paper'
import RNFS from 'react-native-fs'

interface JobApplyResponseData {
  status: string
  isOpen: boolean
}
const defaultModal: JobApplyResponseData = {
  status: 'received',
  isOpen: false
}
export default function ListJobApplyScreen() {
  const dataType = [
    { label: t('ListJobApplyComponent.textReceived'), value: 'received' },
    { label: t('ListJobApplyComponent.textIn_progress'), value: 'in_progress' },
    { label: t('ListJobApplyComponent.textNot_meet_standard_quality'), value: 'not_meet_standard_quality' },
    { label: t('ListJobApplyComponent.textInterview'), value: 'interview' },
    {
      label: t('ListJobApplyComponent.textInterview_not_meet_standard_quality'),
      value: 'interview_not_meet_standard_quality'
    },
    { label: t('ListJobApplyComponent.textAccept'), value: 'accept' }
  ]
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<RouteProp<RootStackParamList, 'LIST_JOB_APPLY_SCREEN'>>()
  const postId = route.params?.postId ?? 0
  const [value, setValue] = useState('received')
  const [item, setItem] = useState(t('ListJobApplyComponent.textReceived'))
  const [modalVisible, setModalVisible] = useState<JobApplyResponseData>(defaultModal)
  const [jobApplyUpdateRequest, jobApplyUpdateResponse] = useJobApplyUpdateMutation()
  const { data, isLoading } = useGetProfileApplyQuery(postId, {
    pollingInterval: 1000
  })
  const openModal = (status: string) => {
    setModalVisible({
      status: status,
      isOpen: true
    })
  }

  const closeModal = () => {
    setModalVisible({
      status: 'received',
      isOpen: false
    })
  }

  const handleGetDetailJobApply = (cvId: number) => {
    navigation.navigate(DETAIL_JOB_APPLY, { cvId: cvId })
  }

  const handleChangeStatusJob = (profileId: number) => {
    jobApplyUpdateRequest({
      profileId: profileId,
      status: modalVisible.status
    })
    setModalVisible({
      status: 'received',
      isOpen: false
    })
  }
  useEffect(() => {
    if (jobApplyUpdateResponse.isSuccess || jobApplyUpdateResponse.data) {
      Alert.alert(t('ListJobApplyComponent.textNotification'), t('ListJobApplyComponent.textChangeSucces'))
    }
  }, [jobApplyUpdateResponse])

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 100,
    height: 230
  }

  return (
    <Fragment>
      <PaperProvider>
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
          <Loading title={t('ListJobApplyComponent.titleLoader')} />
        ) : (
          <ScrollView style={{ backgroundColor: '#fff' }}>
            <SafeAreaView style={{ marginVertical: 10 }}>
              {data?.data.length == 0 ? (
                <Text style={styles.textListNull}>{t('ListJobApplyComponent.listEmpty')}</Text>
              ) : (
                data?.data.map(
                  (item, index) =>
                    item.status === value && (
                      <View style={styles.form} key={index}>
                        <View style={styles.group}>
                          <View style={{ flex: 3 }}>
                            {item.studentAvatar == '' ? (
                              <DefaultAvatar
                                size={80}
                                identifer={item.studentName[0].replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                              />
                            ) : (
                              <Image
                                source={{ uri: SERVER_ADDRESS + `api/images/${item.studentAvatar}` }}
                                style={styles.img}
                              />
                            )}
                          </View>
                          <View style={styles.item}>
                            <Text style={styles.txt}>
                              {item.studentName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                            </Text>
                            <View>
                              <View style={styles.itemChild}>
                                <Text style={styles.txt}>{item.jobTitle}</Text>
                              </View>
                              <View style={styles.itemChild}>
                                <Icon name='phone-alt' style={styles.iconItem}></Icon>
                                {item.phone != '' ? (
                                  <Text style={styles.lbl}>{item.phone}</Text>
                                ) : (
                                  <Text style={styles.lbl}>{t('ListJobApplyComponent.updateNull')}</Text>
                                )}
                              </View>

                              <View style={styles.itemChild}>
                                <Icon name='envelope' style={styles.iconItem}></Icon>
                                <Text style={styles.lbl}>{item.email}</Text>
                              </View>
                              <View style={styles.itemChild}>
                                <AntDesignIcon name='clockcircleo' style={styles.iconItem}></AntDesignIcon>
                                <Text style={styles.lbl}>{formatDateTime(item.createdAt)}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={styles.bottomBtn}>
                          <TouchableOpacity onPress={() => handleGetDetailJobApply(item.id)}>
                            <View style={[styles.itemChild, { flexDirection: 'row', alignItems: 'center' }]}>
                              <Icon name='file-pdf' style={[styles.iconItem, { color: COLOR_SUCCESS }]}></Icon>
                              <Text style={[styles.lbl, { color: COLOR_SUCCESS }]}>
                                {t('ListJobApplyComponent.seeDetailCV')}
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => openModal(item.status)}>
                            <Text style={[styles.lbl, { color: COLOR_SUCCESS, marginLeft: 15 }]}>
                              {t('ListJobApplyComponent.textChangeStatus')}
                            </Text>
                          </TouchableOpacity>

                          <Portal>
                            <Modal
                              visible={modalVisible.isOpen}
                              onDismiss={closeModal}
                              contentContainerStyle={containerStyle}
                            >
                              <View style={styles.headerModal}>
                                <Text style={styles.txtModal}>{t('ListJobApplyComponent.textChangeStatus')}</Text>
                              </View>
                              <View style={styles.container}>
                                <Dropdown
                                  style={styles.dropdown}
                                  placeholderStyle={styles.placeholderStyle}
                                  selectedTextStyle={styles.selectedTextStyle}
                                  iconStyle={styles.iconStyle}
                                  data={dataType}
                                  labelField='label'
                                  valueField='value'
                                  placeholder={modalVisible.status}
                                  value={modalVisible.status}
                                  onChange={(item) => {
                                    setModalVisible({
                                      status: item.value,
                                      isOpen: true
                                    })
                                  }}
                                />
                              </View>
                              <View style={styles.btnBottom}>
                                <TouchableOpacity
                                  style={[styles.btnItem, { marginRight: 5, backgroundColor: '#ff8c00' }]}
                                >
                                  <Text style={styles.txtBottom} onPress={closeModal}>
                                    {t('ListJobApplyComponent.textCancel')}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btnItem, { marginRight: 5 }]}>
                                  <Text style={styles.txtBottom} onPress={() => handleChangeStatusJob(item.id)}>
                                    {t('ListJobApplyComponent.textChange')}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </Modal>
                          </Portal>
                        </View>
                      </View>
                    )
                )
              )}
            </SafeAreaView>
          </ScrollView>
        )}
      </PaperProvider>
    </Fragment>
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
  bottomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  btnBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  headerModal: {
    borderBottomWidth: 0.7
  },
  txtModal: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 5,
    paddingLeft: 15
  },
  container: {
    backgroundColor: 'white',
    padding: 14
  },

  btnItem: {
    padding: 5,
    backgroundColor: '#1e90ff',
    borderRadius: 10
  },
  txtBottom: {
    color: COLOR_WHITE,
    fontWeight: 'bold',
    fontSize: 18
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  icon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR_SUCCESS,
    marginHorizontal: 5
  },
  txtHeader: {
    fontWeight: 'bold',
    color: COLOR_SUCCESS,
    fontSize: 20
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 100
  },
  group: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  item: {
    flex: 8
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 16,
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
  bottom: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  itemChild: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
