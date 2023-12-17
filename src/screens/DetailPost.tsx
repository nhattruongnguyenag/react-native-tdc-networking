import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import CustomizePost from '../components/post/CustomizePost';
import { Client, Frame } from 'stompjs';
import { getStompClient } from '../sockets/SocketClient';
import { POST_LOG } from '../constants/TypeNotification';
import { LikeAction } from '../types/LikeActions';
import { useAppSelector } from '../redux/Hook';
let stompClient: Client
const DetailPost = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DETAIL_POST_SCREEN'>>();
  let post = route.params?.post ?? null
  const [data, setData] = useState<any>()
  const notificationType = route.params?.notificationType ?? ''
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [isSocket, setIsSocket] = useState(false)

  useEffect(() => {
    console.log(post);

  }, [])

  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      if (notificationType != POST_LOG) {
        if (stompClient.connected) {
          stompClient.subscribe(`/topic/posts/${post.id}/detail`, onMessageReceived)
        }
      }
    }
    const onMessageReceived = (payload: any) => {
      setData(JSON.parse(payload.body))



    }
    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, [])

  useEffect(() => {
    console.log('1111111111111111111111111111111111111111111111111111111');
    console.log(data)
  }, [data])
  const likeAction = (obj: LikeAction) => {
    like(obj)
  }

  const like = useCallback((likeData: LikeAction) => {
    setIsSocket(true)
    stompClient.send(`/app/posts/${post.id}/detail/like`, {}, JSON.stringify(likeData))
  }, [])

  const handleUnSave = (idPost: number) => {
    setIsSocket(true)

    stompClient.send(`/app/posts/${post.id}/detail/unsave`, {}, JSON.stringify({
      userId: userLogin?.id,
      postId: idPost
    }))
  }
  const handleDelete = () => { }


  if (isSocket == false) {
    if (post) {
      if (notificationType == POST_LOG) {
        return (
          <View style={styles.post}>
            <Text style={styles.txt}><Text style={styles.txt2}>Bài viết của bạn không được duyệt vì:</Text> "{post.content}"</Text>
          </View>
        )
      }
      return (
        <View style={styles.post}>
          <CustomizePost
            id={post.id}
            userId={post.user.id}
            name={post.user.name}
            avatar={post.user.image}
            typeAuthor={'Doanh Nghiệp'}
            available={null}
            timeCreatePost={post.createdAt}
            content={post.content}
            type={post.type}
            likes={post.likes}
            comments={post.comment}
            commentQty={post.commentQuantity}
            images={post.images}
            role={post.user.roleCodes}
            likeAction={likeAction}
            location={post.location ?? null}
            title={post.title ?? null}
            expiration={post.expiration ?? null}
            salary={post.salary ?? null}
            employmentType={post.employmentType ?? null}
            description={post.description ?? null}
            isSave={post.isSave}
            group={''}
            handleUnSave={handleUnSave}
            handleDelete={handleDelete}
            active={0} />
        </View>
      )
    } else {
      return (
        <View style={styles.post}>
          <Text>Bài viết này không tồn tại</Text>
        </View>
      )
    }

  } else {
    if (data) {

      return (
        <View style={styles.post}>
          <CustomizePost
            id={data.id}
            userId={data.user.id}
            name={data.user.name}
            avatar={data.user.image}
            typeAuthor={'Doanh Nghiệp'}
            available={null}
            timeCreatePost={data.createdAt}
            content={data.content}
            type={data.type}
            likes={data.likes}
            comments={data.comment}
            commentQty={data.commentQuantity}
            images={data.images}
            role={data.user.roleCodes}
            likeAction={likeAction}
            location={data.location ?? null}
            title={data.title ?? null}
            expiration={data.expiration ?? null}
            salary={data.salary ?? null}
            employmentType={data.employmentType ?? null}
            description={data.description ?? null}
            isSave={data.isSave}
            group={''}
            handleUnSave={handleUnSave}
            handleDelete={handleDelete}
            active={0} />
        </View>
      )
    }
  }


  return <></>
}

const styles = StyleSheet.create({
  post: {
    marginTop: 10
  },
  txt: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16
  },
  txt2: {
    fontWeight: 'bold'
  }
})
export default DetailPost