import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomizeFacultyPost from '../components/CustomizeFacultyPost'
import { scanFile } from 'react-native-fs'
import { COLOR_GREY } from '../constants/Color'

// man hinh hien thi danh sach bai viet cua khoa
export default function FacultyDashboardScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
      <CustomizeFacultyPost
        name={'Khoa Công nghệ thông tin - Cao đẳng công nghệ thủ đức '}
        avatar={'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/301962485_751587722861858_878365837081963762_n.png?_nc_cat=100&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=QxBjD1jObKYAX_7nuhV&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfDx6asvntgVBenxTiZeWy12t1EoOjXnvB6h0N2dc0IfDA&oe=651A9D76'}
        timeCreatePost={'27/07/2023 9:09'}
        content={' danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới bút danh Collodi'}
        images={null}
        likes={10}
        isLike={true}
        comments={55}
        isComment={false}
        allComments={null}
        allLikes={null} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_GREY
  }
})
