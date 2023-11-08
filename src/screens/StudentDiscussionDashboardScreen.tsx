import { StyleSheet, Text, View, Image, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { COLOR_BLUE_BANNER, COLOR_WHITE, COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizePost from '../components/post/CustomizePost'
import { NAME_GROUP, TYPE_POST_STUDENT } from '../constants/StringVietnamese'
import { postAPI } from '../api/CallApi'
import { handleDataClassification } from '../utils/DataClassfications'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../sockets/SocketClient'
import { LikeAction } from '../types/LikeActions'
import { API_URL_POST, API_URL_STUDENT_POST } from '../constants/Path'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { updatePostWhenHaveChangeComment } from '../redux/Slice'
import SkeletonPost from '../components/SkeletonPost'
import CustomizeCreatePostToolbar from '../components/CustomizeCreatePostToolbar'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST } from '../constants/Variables'
import { CREATE_NORMAL_POST_SCREEN, CREATE_RECRUITMENT_SCREEN, CREATE_SURVEY_SCREEN, PROFILE_SCREEN } from '../constants/Screen'
import { useIsFocused } from '@react-navigation/native';

// man hinh hien thi danh sach bai viet thao luan cua sinh vien
let stompClient: Client
export default function StudentDiscussionDashboardScreen() {
  // Variable
  const isFocused = useIsFocused();
  const code = 'group_tdc';
  const [isCalled, setIsCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePost, userLogin } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const dispatch = useAppDispatch()
  const [refreshing, setRefreshing] = useState(false)
  const [studentsPost, setStudentPost] = useState([])
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Function 
  useEffect(() => {
    if (studentsPost.length > 0 || isCalled) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [studentsPost])

  // Api
  const getDataStudentApi = async () => {
    try {
      const data = await postAPI(API_URL_STUDENT_POST + userLogin?.id)
      setStudentPost(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Socket
  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      stompClient.subscribe(`/topic/posts/group/${code}`, onMessageReceived)
      stompClient.send(`/app/posts/group/${code}/listen/${userLogin?.id}`)
    }
    const onMessageReceived = (payload: any) => {
      setStudentPost(JSON.parse(payload.body))
      setIsCalled(true)
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, [])

  const likeAction = (obj: LikeAction) => {
    obj.code = TYPE_POST_STUDENT
    like(obj)
  }

  useEffect(() => {
    getDataStudentApi()
    dispatch(updatePostWhenHaveChangeComment(false))
  }, [updatePost, isFocused])

  const like = useCallback((likeData: LikeAction) => {
    stompClient.send(`/app/posts/group/${code}/like`, {}, JSON.stringify(likeData))
  }, [])


  const handleClickToCreateButtonEvent = (type: string) => {
    if (type === TYPE_NORMAL_POST) {
      navigation.navigate(CREATE_NORMAL_POST_SCREEN, { group: 1 });
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
          refreshing={refreshing}
          onRefresh={() => getDataStudentApi()} />}
      >
        {/* Image banner */}
        <Image
          style={styles.imageBanner}
          source={{ uri: 'https://a.cdn-hotels.com/gdcs/production69/d31/7e6c2166-24ef-4fa4-893a-39b403ff02cd.jpg' }}
        />

        {/* Name group */}
        <View style={styles.lineBellowBanner}>
          <Text style={styles.nameOfStudentGroup}>{NAME_GROUP}</Text>
        </View>
        {/* Create post */}
        {
          userLogin?.roleCodes === TYPE_POST_STUDENT ?
            <View style={styles.toolbarCreatePost}>
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
          data={studentsPost}
          renderItem={({ item }) => renderItem(item)}
        />
      </ScrollView>
    </View>
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
  },
  toolbarCreatePost: {
    marginBottom: 20,
  }
})
