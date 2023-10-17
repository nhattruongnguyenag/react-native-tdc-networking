import { StyleSheet, Text, View, Image, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { COLOR_BLUE_BANNER, COLOR_WHITE, COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizePost from '../components/post/CustomizePost'
import { NAME_GROUP, TYPE_POST_STUDENT } from '../constants/StringVietnamese'
import { postAPI } from '../api/CallApi'
import { formatDateTime } from '../utils/FormatTime'
import { handleDataClassification } from '../utils/DataClassfications'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../sockets/SocketClient'
import { LikeAction } from '../types/LikeActions'
import { API_URL_POST } from '../constants/Path'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { updatePostWhenHaveChangeComment } from '../redux/Slice'

// man hinh hien thi danh sach bai viet thao luan cua sinh vien
let stompClient: Client
export default function StudentDiscussionDashboardScreen() {

  // Variable
  const { updatePost } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const dispatch = useAppDispatch()
  const [refreshing, setRefreshing] = useState(false);
  const [studentsPost, setStudentPost] = useState([]);

  // Function 
  // Api
  const callAPI = async () => {
    try {
      const temp = await postAPI(API_URL_POST);
      const result = handleDataClassification(temp, TYPE_POST_STUDENT);
      setStudentPost(result);
    } catch (error) {
      console.log(error);
    }
  }

  // Socket
  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      stompClient.subscribe(`/topic/posts/${TYPE_POST_STUDENT}`, onMessageReceived)
      stompClient.send(`/app/posts/${TYPE_POST_STUDENT}/listen`)
    }
    const onMessageReceived = (payload: any) => {
      setStudentPost(JSON.parse(payload.body))
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, [])

  const likeAction = (obj: LikeAction) => {
    obj.code = TYPE_POST_STUDENT;
    like(obj);
  }


  useEffect(() => {
    callAPI()
    dispatch(updatePostWhenHaveChangeComment(false))
  }, [updatePost])


  const like = useCallback((likeData: LikeAction) => {
    console.log(JSON.stringify(likeData));
    stompClient.send(`/app/posts/${likeData.code}/like`, {}, JSON.stringify(likeData))
  }, [])

  const renderItem = (item: any) => {
    return <CustomizePost
      id={item.id}
      userId={item.user['id']}
      name={item.user['name']}
      avatar={item.user['image']}
      typeAuthor={null}
      available={null}
      timeCreatePost={formatDateTime(item.createdAt)}
      content={item.content}
      type={null}
      likes={item.likes}
      comments={item.comment}
      commentQty={item.commentQuantity}
      images={item.images}
      role={1}
      likeAction={likeAction}
    />
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={callAPI}
          />
        }
      >
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
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={studentsPost}
          renderItem={({ item }) => renderItem(item)}
        />
      </ScrollView>
    </View >
  )
}

const styles = StyleSheet.create({
  imageBanner: {
    width: '100%',
    height: 180,
    resizeMode: 'cover'
  },
  container: {
    backgroundColor: COLOR_BOTTOM_AVATAR
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
