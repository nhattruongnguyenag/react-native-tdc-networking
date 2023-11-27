import { FlatList, ScrollView, StyleSheet, View, RefreshControl, Text } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizePost from '../components/post/CustomizePost'
import { TEXT_NOTIFICATION_SCOPE_OF_ACCOUNT, TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../constants/StringVietnamese'
import { deletePostAPI, postAPI, savePostAPI } from '../api/CallApi'
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
import CustomizeSelectFacultyToolbar from '../components/CustomizeSelectFacultyToolbar'
import { WINDOW_HEIGHT } from '../utils/SystemDimensions'
import { ToastMessenger } from '../utils/ToastMessenger'
import { SERVER_ADDRESS } from '../constants/SystemConstant'

let stompClient: Client
export default function FacultyDashboardScreen() {

  const isFocused = useIsFocused();
  const [isCalled, setIsCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePost, userLogin } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const [code, setCode] = useState((userLogin?.roleCodes.includes(TYPE_POST_STUDENT) || userLogin?.roleCodes.includes(TYPE_POST_FACULTY)) ? userLogin.facultyGroupCode : '');
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
  }, [isFocused, code])

  const getDataFacultyApi = async () => {
    console.log('====================================');
    console.log(code);
    console.log('====================================');
    if (code.length !== 0) {
      try {
        const data = await postAPI(API_URL_FACULTY_POST + code + '&userLogin=' + userLogin?.id)
        setFacultyPost(data.data)
      } catch (error) {
        console.log(error)
      }
    } else {
      setFacultyPost([]);
    }
    setIsCalled(true);
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

  const handleDeletePost = async (id: number) => {
    const status = await deletePostAPI(SERVER_ADDRESS + 'api/posts/', id);
    ToastMessenger(status, 200, 'Thông báo', 'Xóa bài viết thành công', 'Cảnh báo', 'Lỗi hệ thống vui lòng thử lại sau')
  }

  const handleSavePost = async (id: number) => {
    const data = {
      "userId": userLogin?.id,
      "postId": id
    }
    stompClient.send(`/app/posts/group/${code}/unsave`, {}, JSON.stringify(data))
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
        isSave={item.isSave}
        group={code}
        handleUnSave={handleSavePost}
        handleDelete={handleDeletePost} />
    )
  }

  const handleSelectFacultyEvent = (_code: string) => {
    setCode(_code);
  };



  return (
    userLogin?.roleCodes !== TYPE_POST_BUSINESS ? <View style={styles.container}>
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

        {
          isLoading ? <SkeletonPost /> : <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={facultyPost}
            renderItem={({ item }) => renderItem(item)}
          />
        }
      </ScrollView>
    </View> : <ScrollView
      showsVerticalScrollIndicator={false}>
      <CustomizeSelectFacultyToolbar
        handleSelectFacultyEvent={handleSelectFacultyEvent}
      />
      <View>
        {isLoading ? (
          <View style={styles.businessRolePostShow}>
            <SkeletonPost />
          </View>
        ) : (
          <>
            {facultyPost.length ? (
              <FlatList
                style={styles.businessRolePostShow}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={facultyPost}
                renderItem={({ item }) => renderItem(item)}
              />
            ) : (
              <View style={styles.wrapperWhenDontHaveAnyPost}>
                <Text>Chưa có bất kỳ bài viết nào</Text>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
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
  },
  businessRolePostShow: {
    marginTop: 20,
  },
  wrapperWhenDontHaveAnyPost: {
    height: WINDOW_HEIGHT * 0.6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})