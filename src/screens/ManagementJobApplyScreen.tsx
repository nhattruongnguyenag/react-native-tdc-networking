import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
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

const dataType = [
  { name: 'Đang chờ', value: '1' },
  { name: 'Không đủ điều kiện', value: '2' },
  { name: 'Đủ điều kiện', value: '3' },
  { name: 'Gọi phỏng vấn', value: '4' },
  { name: 'Nhận việc', value: '5' }
]

export default function ManagementJobApplyScreen() {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [dataJob, setDataJob] = useState([
    {
      id: 0,
      companyName: '',
      jobTitle: '',
      createdAt: '',
      companyAvatar: '',
      cvUrl: ''
    }
  ])
  const [check, setCheck] = useState(false)
  const handleClickType = (flag: string) => {
    switch (flag) {
      case 'Đang chờ':
        handleShowJobWaiting()
        break
      case 'Không đủ điều kiện':
        handleShowJobUnconditional()
        break
      case 'Đủ điều kiện':
        handleShowJobEligible()
        break
      case 'Gọi phỏng vấn':
        handleShowJobInterview()
        break
      case 'Nhận việc':
        handleShowJobAccept()
        break
      default:
        return ''
    }
  }

  const handleShowJobWaiting = () => {
    axios
      .get(SERVER_ADDRESS + `api/job/user/${userLogin?.id}`)
      .then((response) => {
        console.log(JSON.stringify(response.data.data))
        setDataJob(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
    console.log('Đang chờ')
  }
  const handleShowJobUnconditional = () => {
    console.log('Không đủ điều kiện')
  }
  const handleShowJobEligible = () => {
    console.log('Đủ điều kiện')
  }
  const handleShowJobInterview = () => {
    console.log('Gọi phỏng vấn')
  }
  const handleShowJobAccept = () => {
    console.log('Nhận việc')
  }
  const handleGetDetailJobApply = (cvId: number) => {
    navigation.navigate(DETAIL_JOB_APPLY, { cvId: cvId })
  }
  const handleUpdateCv = (profileId: number) => {
    navigation.navigate(JOB_APPLY_SCREEN, { recruitmentPostId: profileId })
  }
  const handleDeleteCv = (profileId: number) => {
    axios
      .delete(SERVER_ADDRESS + `api/job/profile/${profileId}`)
      .then((response) => {
        console.log(response.status)
        setCheck(true)
        Alert.alert('Thông báo', 'Hủy hồ sơ thành công')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    if (check) {
      handleShowJobWaiting()
    }
  }, [check])
  useEffect(() => {
    handleShowJobWaiting()
  }, [])

  return (
    <View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dataType.map((data) => (
            <TouchableOpacity style={styles.btnType} onPress={() => handleClickType(data.name)}>
              <Text style={styles.txtType}>{data.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false}>
          {dataJob.map((data, index) => (
            <View style={styles.form} key={index}>
              <View style={styles.group}>
                <View style={{ flex: 3 }}>
                  <Image source={require('../assets/login/login.png')} style={styles.img}></Image>
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
                    Xem cv
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.txtBtnBottom} onPress={() => handleUpdateCv(data.id)}>
                    Chỉnh sửa cv
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.txtBtnBottom} onPress={() => handleDeleteCv(data.id)}>
                    Hủy hồ sơ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapMenu: {
    width: '5%',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  menuOption: {
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
    width: 160,
    marginLeft: -15,
    paddingTop: 10,
    paddingBottom: 10
  },
  body: {
    backgroundColor: '#fff'
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
    alignItems: 'center'
  },
  txtBtnBottom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR_SUCCESS,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10
  },
  borderCheck: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000'
  }
})
