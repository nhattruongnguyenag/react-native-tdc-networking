import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { COLOR_BLACK } from '../constants/Color'

export default function RecruitmentDetailScreen() {
  return (
    <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity style={{ left: -100 }}>
          <Icon name='chevron-left' size={20} color={'#000'} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.txtHeader}>Chi tiết tuyển dụng</Text>
        </View>
      </View>

      <SafeAreaView style={styles.container}>
        <View style={styles.group}>
          <View style={styles.item}>
            <Text style={styles.txt}>Ngày cập nhật</Text>
            <Text>10/10/2010</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt}>Hình thức</Text>
            <Text>Nhân viên chính thức</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt}>Lương</Text>
            <Text>Lương thỏa thuận</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt}>Kinh nghiệm</Text>
            <Text>1 năm kinh nghiệm</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt}>Cấp bậc</Text>
            <Text>Trưởng phòng</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt}>Hạn nộp</Text>
            <Text>11/11/2010</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.txt}>Địa chỉ</Text>
            <Text>TP Hồ Chí Minh</Text>
          </View>
        </View>

        <View style={styles.group1}>
          <View>
            <Text style={styles.headerWelfare}>Phúc lợi</Text>
          </View>
          <View style={styles.welfare}>
            <Text style={styles.welfareTxt}>Chế độ bảo hiểm</Text>
            <Text style={styles.welfareTxt}>Lương tháng 13</Text>
            <Text style={styles.welfareTxt}>Trợ cấp đi lại</Text>
            <Text style={styles.welfareTxt}>Môi trường thân thiện</Text>
          </View>
        </View>

        <View style={styles.group1}>
          <View>
            <Text style={styles.headerWelfare}>Mô tả</Text>
          </View>
          <View>
            <View style={styles.description}>
              <Icon name='circle' style={styles.icon} />
              <Text style={{ color: COLOR_BLACK }}>Quản lý điện toán ryherydh dfghfghfg dfhgfdh</Text>
            </View>
            <View style={styles.description}>
              <Icon name='circle' style={styles.icon} />
              <Text style={{ color: COLOR_BLACK }}>Quản lý điện toán ryherydh dfghfghfg dfhgfdh</Text>
            </View>
            <View style={styles.description}>
              <Icon name='circle' style={styles.icon} />
              <Text style={{ color: COLOR_BLACK }}>Quản lý điện toán ryherydh dfghfghfg dfhgfdh</Text>
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
              <Text style={{ color: COLOR_BLACK }}>Quản lý điện toán ryherydh dfghfghfg dfhgfdh</Text>
            </View>
            <View style={styles.description}>
              <Icon name='circle' style={styles.icon} />
              <Text style={{ color: COLOR_BLACK }}>Quản lý điện toán ryherydh dfghfghfg dfhgfdh</Text>
            </View>
            <View style={styles.description}>
              <Icon name='circle' style={styles.icon} />
              <Text style={{ color: COLOR_BLACK }}>Quản lý điện toán ryherydh dfghfghfg dfhgfdh</Text>
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
              <Text style={{ color: COLOR_BLACK }}>Quản lý điện toán ryherydh dfghfghfg dfhgfdh</Text>
            </View>
            <View style={styles.description}>
              <Icon name='circle' style={styles.icon} />
              <Text style={{ color: COLOR_BLACK }}>Quản lý điện toán ryherydh dfghfghfg dfhgfdh</Text>
            </View>
            <View style={styles.description}>
              <Icon name='circle' style={styles.icon} />
              <Text style={{ color: COLOR_BLACK }}>Quản lý điện toán ryherydh dfghfghfg dfhgfdh</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <View>
        <TouchableOpacity style={styles.btnRecruitment}>
          <Text style={styles.txtRecruitment}>Nộp đơn ứng tuyển</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20
  },
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
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10
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
    marginBottom:5
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
    fontWeight: 'bold',
  }
})
