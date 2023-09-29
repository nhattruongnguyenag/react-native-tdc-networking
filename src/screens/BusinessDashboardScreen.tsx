import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomizeBusinessPost from '../components/CustomizeBusinessPost'
import { COLOR_GREY } from '../constants/Color'
// man hinh hien thi bai viet doanh nghiep
export default function BusinessDashboardScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <CustomizeBusinessPost
          name={'Google VN'}
          avatar={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'}
          typeAuthor={'Doanh Nghiệp'}
          available={true}
          timeCreatePost={'27/07/2023 9:09'}
          content={' danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới bút danh Collodi'}
          images={null}
          type={'tuyển dụng'}
          likes={10}
          isLike={true}
          comments={55}
          isComment={false}
          allComments={null}
          allLikes={null}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_GREY
  }
})
