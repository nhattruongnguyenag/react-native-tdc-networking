import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { COLOR_BLACK, COLOR_GREY } from '../constants/Color'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { formatVietNamCurrency } from '../utils/FormatCurrency'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'

export default function RecruitmentDetailScreen({ route }: any) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { idPost } = route.params
  const [dataRecruitmentDetail, setDataRecruitmentDetail] = useState({
    createdAt: '',
    salary: '',
    expiration: '',
    location: '',
    employmentType: '',
    benefit: '',
    description: '',
    requirement: ''
  })
  useEffect(() => {
    if (idPost) {
      axios
        .get(SERVER_ADDRESS + `api/posts/recruitment/${idPost}`)
        .then((recruitment) => {
          setDataRecruitmentDetail(recruitment.data.data)
          console.log(dataRecruitmentDetail)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  const onSubmit = () => {
    Alert.alert('Thông báo', 'Nộp đơn úng tuyển thành công')
    navigation.goBack()
  }
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.group}>
          <View style={styles.item}>
            <Text style={styles.txt}>Hình thức làm việc</Text>
            <View style={styles.iconRecuitment}>
              <Icon name='briefcase' size={16} color={COLOR_GREY} />
              <Text style={{ color: COLOR_BLACK }}>{' '}{dataRecruitmentDetail.employmentType}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt}>Lương</Text>
            <View style={styles.iconRecuitment}>
              <FontAwesome6Icon name='money-bill-1' size={16} color={COLOR_GREY} />
              <Text style={{ color: COLOR_BLACK }}>
                {' '}
                {formatVietNamCurrency(dataRecruitmentDetail.salary)} $/M{ }
              </Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt}>Vị trí tuyển dụng</Text>
            <View style={styles.iconRecuitment}>
              <FontAwesome6Icon name='ranking-star' size={16} color={COLOR_GREY} />
              <Text style={{ color: COLOR_BLACK }}> Trưởng phòng</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt}>Thời hạn ứng tuyển</Text>
            <View style={styles.iconRecuitment}>
              <AntDesignIcon name='clockcircleo' size={16} color={COLOR_GREY} />
              <Text style={{ color: COLOR_BLACK }}> {dataRecruitmentDetail.expiration}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt}>Địa chỉ làm việc</Text>
            <View style={styles.iconRecuitment}>
              <Icon name='map-marker-alt' size={16} color={COLOR_GREY} />
              <Text style={{ color: COLOR_BLACK }}> {dataRecruitmentDetail.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.group1}>
          <View>
            <Text style={styles.headerWelfare}>Phúc lợi</Text>
          </View>
          <View style={styles.welfare}>
            <Text style={styles.welfareTxt}>{dataRecruitmentDetail.benefit}</Text>
          </View>
        </View>

        <View style={styles.group1}>
          <View>
            <Text style={styles.headerWelfare}>Mô tả công việc</Text>
          </View>
          <View>
            <View style={styles.description}>
              <Icon name='circle' style={styles.icon} />
              <Text style={{ color: COLOR_BLACK }}>{dataRecruitmentDetail.description}</Text>
            </View>
          </View>
        </View>

        <View style={styles.group1}>
          <View>
            <Text style={styles.headerWelfare}>Yêu cầu công việc</Text>
          </View>
          <View>
            <View style={styles.description}>
              <Icon name='circle' style={styles.icon} />
              <Text style={{ color: COLOR_BLACK }}>{dataRecruitmentDetail.requirement}</Text>
            </View>
          </View>
        </View>

        <View style={styles.group1}>
          <View>
            <Text style={styles.headerWelfare}>Thông tin khác</Text>
          </View>
          <View>
            <View style={styles.description}>
              <Icon name='circle' style={styles.icon} />
              <Text style={{ color: COLOR_BLACK }}>Không có</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <View>
        <TouchableOpacity style={styles.btnRecruitment} onPress={() => onSubmit()}>
          <Text style={styles.txtRecruitment}>Nộp đơn ứng tuyển</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  welfareTxt: {
    backgroundColor: '#3cb371',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 5,
    marginRight: 5
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
    marginLeft: 10
  },
  icon: {
    fontSize: 5,
    backgroundColor: COLOR_BLACK,
    borderRadius: 10,
    top: 7,
    marginRight: 5
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
    flexDirection: 'row', alignItems: 'center', marginTop: 2
  }
})
