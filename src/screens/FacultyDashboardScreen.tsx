import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizePost from '../components/post/CustomizePost'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useIsFocused } from '@react-navigation/native'
import { TYPE_POST_FACULTY } from '../constants/StringVietnamese'
import { postAPI } from '../api/CallApi'
import { formatDateTime } from '../utils/FormatTime'
import { handleDataClassification } from '../utils/DataClassfications'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../sockets/SocketClient'
import { LikeAction } from '../types/LikeActions'

// man hinh hien thi danh sach bai viet cua khoa
let stompClient: Client
export default function FacultyDashboardScreen() {

  // Variable
  const apiUrlPost = SERVER_ADDRESS + 'api/posts';
  const [facultyPost, setFacultyPost] = useState([]);

  // Function 
  // Api
  const callAPI = async () => {
    console.log('call api');
    try {
      const temp = await postAPI(apiUrlPost);
      const result = handleDataClassification(temp, TYPE_POST_FACULTY);
      setFacultyPost(result);
    } catch (error) {
      console.log(error);
    }
  }


  // Socket
  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      stompClient.subscribe(`/topic/posts/${TYPE_POST_FACULTY}`, onMessageReceived)
      stompClient.send(`/app/posts/${TYPE_POST_FACULTY}/listen`)
    }
    const onMessageReceived = (payload: any) => {
      console.log('lay du lieu');
      setFacultyPost(JSON.parse(payload.body))
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, [])


  const likeAction = (obj: LikeAction) => {
    obj.code = TYPE_POST_FACULTY;
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
      role={2}
      likeAction={likeAction}
    />

  }
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => callAPI()}
        data={facultyPost}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BOTTOM_AVATAR
  }
})
