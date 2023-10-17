import { StyleSheet, Text, View, Image, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { COLOR_BLUE_BANNER, COLOR_WHITE, COLOR_BOTTOM_AVATAR } from '../constants/Color'
import { userIdTest } from '../components/DataBase'
import CustomizePost from '../components/post/CustomizePost'
import { useIsFocused } from '@react-navigation/native'
import { useAppSelector } from '../redux/Hook'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { NAME_GROUP, TYPE_POST_STUDENT } from '../constants/StringVietnamese'
import { postAPI } from '../api/CallApi'
import { formatDateTime } from '../utils/FormatTime'
import { handleDataClassification } from '../utils/DataClassfications'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../sockets/SocketClient'
import { LikeAction } from '../types/LikeActions'

// man hinh hien thi danh sach bai viet thao luan cua sinh vien
let stompClient: Client
export default function StudentDiscussionDashboardScreen() {

  // Variable

  const [refreshing, setRefreshing] = useState(false);
  const apiUrlLike = SERVER_ADDRESS + 'api/posts/like';
  const apiUrlPost = SERVER_ADDRESS + 'api/posts';
  const [studentsPost, setStudentPost] = useState([]);

  // Function 
  // Api
  const callAPI = async () => {
    console.log('call api');
    try {
      const temp = await postAPI(apiUrlPost);
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
      console.log('lay du lieu');
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
