import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizeModalImage from '../components/modal/CustomizeModalImage'
import { useAppSelector } from '../redux/Hook'
import CustomizeModalComments from '../components/modal/CustomizeModalComments'
import CustomizeModalUserReacted from '../components/modal/CustomizeModalUserReacted'
import CustomizePost from '../components/post/CustomizePost'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useIsFocused } from '@react-navigation/native'
import { formatDateTime } from '../utils/FormatTime'
import { TYPE_POST_BUSINESS } from '../constants/StringVietnamese'
import { postAPI } from '../api/CallApi'
import { handleDataClassification } from '../utils/DataClassfications'
// man hinh hien thi bai viet doanh nghiep

export default function BusinessDashboardScreen() {

  // Variable

  const apiUrlPost = SERVER_ADDRESS + 'api/posts';
  const { isOpenModalImage, isOpenModalComments, isOpenModalUserReaction } = useAppSelector((state: { TDCSocialNetworkReducer: any }) => state.TDCSocialNetworkReducer)
  const [businessPost, setBusinessPost] = useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);

  // Function 

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        callAPI();
      }
      fetchData();
    }
  }, [isFocused])

  // Api

  const callAPI = async () => {
    console.log('call api');
    try {
      const temp = await postAPI(apiUrlPost);
      const result = handleDataClassification(temp, TYPE_POST_BUSINESS);
      setBusinessPost(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const renderItem = (item: any) => {
    return <CustomizePost
      id={item.id}
      userId={item.user['id']}
      name={item.user['name']}
      avatar={item.user['image']}
      typeAuthor={'Doanh Nghiệp'}
      available={null}
      timeCreatePost={formatDateTime(item.createdAt)}
      content={item.content}
      type={null}
      likes={item.likes}
      comments={item.comment}
      images={item.images}
      role={0}
    />
  }

  return (
    <View style={styles.container}>
      {
        isOpenModalImage && <CustomizeModalImage />
      }
      {
        isOpenModalUserReaction && <CustomizeModalUserReacted />
      }
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => callAPI()}
        data={businessPost}
        renderItem={({ item }) => renderItem(item)}
      />
      {
        isOpenModalComments && <CustomizeModalComments />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BOTTOM_AVATAR,
  }
})
