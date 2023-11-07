import { FlatList, ScrollView, StyleSheet, View, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizePost from '../components/post/CustomizePost'
import { TYPE_POST_FACULTY } from '../constants/StringVietnamese'
import { postAPI } from '../api/CallApi'
import { handleDataClassification } from '../utils/DataClassfications'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../sockets/SocketClient'
import { LikeAction } from '../types/LikeActions'
import { API_URL_POST } from '../constants/Path'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { updatePostWhenHaveChangeComment } from '../redux/Slice'
import SkeletonPost from '../components/SkeletonPost'
import CustomizeCreatePostToolbar from '../components/CustomizeCreatePostToolbar'
import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST } from '../constants/Variables'
import { CREATE_NORMAL_POST_SCREEN, CREATE_RECRUITMENT_SCREEN, CREATE_SURVEY_SCREEN, PROFILE_SCREEN } from '../constants/Screen'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

// man hinh hien thi danh sach bai viet cua khoa
let stompClient: Client
export default function FacultyDashboardScreen() {
  // Variable
  const [isCalled, setIsCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePost, userLogin } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const dispatch = useAppDispatch()
  const [facultyPost, setFacultyPost] = useState([])
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  // Function

  useEffect(() => {
    if (facultyPost.length > 0 || isCalled) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [facultyPost])

  // Api
  const getDataFacultyApi = async () => {
    try {
      const temp = await postAPI(API_URL_POST)
      const result = handleDataClassification(temp, TYPE_POST_FACULTY)
      setFacultyPost(result)
    } catch (error) {
      console.log(error)
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
      setFacultyPost(JSON.parse(payload.body))
      setIsCalled(true)
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, [])

  const likeAction = (obj: LikeAction) => {
    obj.code = TYPE_POST_FACULTY
    like(obj)
  }

  useEffect(() => {
    getDataFacultyApi()
    dispatch(updatePostWhenHaveChangeComment(false))
  }, [updatePost])

  const like = useCallback((likeData: LikeAction) => {
    stompClient.send(`/app/posts/${likeData.code}/like`, {}, JSON.stringify(likeData))
  }, [])

  const handleClickToCreateButtonEvent = (type: string) => {
    if (type === TYPE_NORMAL_POST) {
      navigation.navigate(CREATE_NORMAL_POST_SCREEN);
    } else if (type === TYPE_RECRUITMENT_POST) {
      navigation.navigate(CREATE_RECRUITMENT_SCREEN);
    } else {
      navigation.navigate(CREATE_SURVEY_SCREEN);
    }
  }

  const handleClickIntoAvatar = () => {
    navigation.navigate(PROFILE_SCREEN, { userId: userLogin?.id ?? 0 })
  }

  const renderItem = (item: any) => {
    return (
      <CustomizePost
        id={item.id}
        userId={item.user['id']}
        name={item.user['name']}
        avatar={item.user['image']}
        typeAuthor={null}
        available={null}
        timeCreatePost={item.createdAt}
        content={item.content}
        type={item.type}
        likes={item.likes}
        comments={item.comment}
        commentQty={item.commentQuantity}
        images={item.images}
        role={item.user['roleCodes']}
        likeAction={likeAction}
        location={item.location ?? null}
        title={item.title ?? null}
        expiration={item.expiration ?? null}
        salary={item.salary ?? null}
        employmentType={item.employmentType ?? null}
        description={item.description ?? null}
      />
    )
  }

  return (
    <View style={styles.container}>
      {
        isLoading && <SkeletonPost />
      }
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl
          refreshing={false}
          onRefresh={() => getDataFacultyApi()}
        />}
      >
        {/* Create post area */}
        {
          userLogin?.roleCodes === TYPE_POST_FACULTY ? <View style={styles.toolbarCreatePost}>
            <CustomizeCreatePostToolbar
              role={userLogin?.roleCodes ?? ''}
              handleClickToCreateButtonEvent={handleClickToCreateButtonEvent}
              handleClickIntoAvatar={handleClickIntoAvatar}
              image={userLogin?.image ?? null}
              name={userLogin?.name ?? ''}
            />
          </View> : null
        }

        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={facultyPost}
          renderItem={({ item }) => renderItem(item)}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BOTTOM_AVATAR
  },
  toolbarCreatePost: {
    marginBottom: 20,
  }
})
