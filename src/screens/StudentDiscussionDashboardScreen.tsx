import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import CustomizeStudentPost from '../components/CustomizeStudentPost'
import { COLOR_GREY, COLOR_BLUE_BANNER, COLOR_WHITE } from '../constants/Color'
import { commentData, likeData, imageData } from '../components/DataBase'

// Constant
const NAME_GROUP = 'Group by TDC - Trường Cao Đẳng Công Nghệ Thủ Đức'

// man hinh hien thi danh sach bai viet thao luan cua sinh vien
export default function StudentDiscussionDashboardScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Image banner */}
        <Image
          style={styles.imageBanner}
          source={{ uri: 'https://a.cdn-hotels.com/gdcs/production69/d31/7e6c2166-24ef-4fa4-893a-39b403ff02cd.jpg' }} />
        {/* Name group */}
        <View style={styles.lineBellowBanner}>
          <Text style={styles.nameOfStudentGroup}>
            {NAME_GROUP}
          </Text>
        </View>
        <CustomizeStudentPost
          id={1}
          name={'Nguyễn Hà My'}
          avatar={'https://a.cdn-hotels.com/gdcs/production69/d31/7e6c2166-24ef-4fa4-893a-39b403ff02cd.jpg'}
          timeCreatePost={'27/07/2023 9:09'}
          content={'Chào mọi người! Sau đây em xin tự giới thiệu về bản thân mình. Em tên là Mạnh Tiểu Vũ. Em sinh ra và lớn lên tại Hà Nội. Hiện nay em đang theo họcChào mọi người! Sau đây em xin tự giới thiệu về bản thân mình. Em tên là Mạnh Tiểu Vũ. Em sinh ra và lớn lên tại Hà Nội. Hiện nay em đang theo họcChào mọi người! Sau đây em xin tự giới thiệu về bản thân mình. Em tên là Mạnh Tiểu Vũ. Em sinh ra và lớn lên tại Hà Nội. Hiện nay em đang theo họcChào mọi người! Sau đây em xin tự giới thiệu về bản thân mình. Em tên là Mạnh Tiểu Vũ. Em sinh ra và lớn lên tại Hà Nội. Hiện nay em đang theo họctại trường Trung học Cơ sở Hoàng Hoa Thám. Em là học sinh lớp CD23CD23TT11.'}
          images={imageData}
          likes={likeData}
          comments={commentData}
          isComment={false}
          isLike={false}
          role={1} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  imageBanner: {
    width: '100%',
    height: 180,
    resizeMode: 'cover'
  },
  container: {
    backgroundColor: COLOR_GREY
  },
  lineBellowBanner: {
    width: '100%',
    height: 40,
    backgroundColor: COLOR_BLUE_BANNER,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameOfStudentGroup: {
    color: COLOR_WHITE
  }
})
