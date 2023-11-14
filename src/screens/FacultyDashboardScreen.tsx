import { FlatList, ScrollView, StyleSheet, View, RefreshControl, Text } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizePost from '../components/post/CustomizePost'
import { TEXT_NOTIFICATION_SCOPE_OF_ACCOUNT, TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../constants/StringVietnamese'
import { postAPI } from '../api/CallApi'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../sockets/SocketClient'
import { LikeAction } from '../types/LikeActions'
import { API_URL_FACULTY_POST } from '../constants/Path'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { updatePostWhenHaveChangeComment } from '../redux/Slice'
import SkeletonPost from '../components/SkeletonPost'
import CustomizeCreatePostToolbar from '../components/CustomizeCreatePostToolbar'
import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST } from '../constants/Variables'
import { CREATE_NORMAL_POST_SCREEN, CREATE_RECRUITMENT_SCREEN, CREATE_SURVEY_SCREEN, PROFILE_SCREEN } from '../constants/Screen'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { useIsFocused } from '@react-navigation/native';

let stompClient: Client
export default function FacultyDashboardScreen() {

  const isFocused = useIsFocused();
  const [isCalled, setIsCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePost, userLogin } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const code = (userLogin?.roleCodes.includes(TYPE_POST_STUDENT) || userLogin?.roleCodes.includes(TYPE_POST_FACULTY)) ? userLogin.facultyGroupCode : '';
  const dispatch = useAppDispatch()
  const [facultyPost, setFacultyPost] = useState([])
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    if (facultyPost.length > 0 || isCalled) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [facultyPost, isCalled])

  useEffect(() => {
    getDataFacultyApi();
  }, [isFocused])

  const getDataFacultyApi = async () => {
    try {
      const data = await postAPI(API_URL_FACULTY_POST + code + '&userLogin=' + userLogin?.id)
      setFacultyPost(data.data)
    } catch (error) {
      console.log(error)
    }
    setIsCalled(true)
  }

  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      stompClient.subscribe(`/topic/posts/group/${code}`, onMessageReceived)
      stompClient.send(`/app/posts/group/${code}/listen/${userLogin?.id}`)
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
    stompClient.send(`/app/posts/group/${code}/like`, {}, JSON.stringify(likeData))
  }, [])

  const handleClickToCreateButtonEvent = (type: string) => {
    if (type === TYPE_NORMAL_POST) {
      navigation.navigate(CREATE_NORMAL_POST_SCREEN, { group: userLogin?.facultyGroupId ?? 0 });
    } else if (type === TYPE_RECRUITMENT_POST) {
      navigation.navigate(CREATE_RECRUITMENT_SCREEN);
    } else {
      navigation.navigate(CREATE_SURVEY_SCREEN);
    }
  }

  const handleClickIntoAvatar = () => {
    navigation.navigate(PROFILE_SCREEN, { userId: userLogin?.id ?? 0, group: code })
  }

  const handleUnSave = () => { }

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
        isSave={item.isSave}
        group={code}
        handleUnSave={handleUnSave}
      />
    )
  }

  return (
    userLogin?.roleCodes !== TYPE_POST_BUSINESS ? <View style={styles.container}>
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
          (userLogin?.roleCodes.includes(TYPE_POST_FACULTY) || userLogin?.roleCodes.includes(TYPE_POST_STUDENT)) ? <View style={styles.toolbarCreatePost}>
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
    </View> : <View style={styles.containerNotification}>
      <Text>{TEXT_NOTIFICATION_SCOPE_OF_ACCOUNT}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BOTTOM_AVATAR
  },
  toolbarCreatePost: {
    marginBottom: 20,
  },
  containerNotification: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
