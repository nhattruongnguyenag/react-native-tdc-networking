import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomizeBusinessPost from '../components/CustomizeBusinessPost'
import { COLOR_GREY } from '../constants/Color'
import { likeData, imageData, commentData } from '../components/DataBase'
import CustomizeModalImage from '../components/modal/CustomizeModalImage'
import { useAppSelector } from '../redux/Hook'
import CustomizeModalComments from '../components/modal/CustomizeModalComments'
import CustomizeModalUserReacted from '../components/modal/CustomizeModalUserReacted'
// man hinh hien thi bai viet doanh nghiep

export default function BusinessDashboardScreen() {
  const { isOpenModalImage, isOpenModalComments, isOpenModalUserReaction } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  return (
    <View style={styles.container}>
      {
        isOpenModalImage && <CustomizeModalImage />
      }
      {
        isOpenModalUserReaction && <CustomizeModalUserReacted />
      }
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <CustomizeBusinessPost
          id={1}
          name={'Google VN'}
          avatar={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'}
          typeAuthor={'Doanh Nghiệp'}
          available={true}
          timeCreatePost={'27/07/2023 9:09'}
          content={' danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới bút danh Collodi'}
          type={'tuyển dụng'}
          isLike={true}
          isComment={true}
          likes={likeData}
          comments={commentData}
          images={imageData}
          role={0}
        />
        <CustomizeBusinessPost
          id={1}
          name={'Google VN'}
          avatar={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'}
          typeAuthor={'Doanh Nghiệp'}
          available={true}
          timeCreatePost={'27/07/2023 9:09'}
          content={' danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới bút danh Collodi'}
          type={'tuyển dụng'}
          isLike={true}
          isComment={false}
          likes={likeData}
          comments={commentData}
          images={imageData}
          role={0}
        />
      </ScrollView>
      {
        isOpenModalComments && <CustomizeModalComments />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_GREY,
  }
})
