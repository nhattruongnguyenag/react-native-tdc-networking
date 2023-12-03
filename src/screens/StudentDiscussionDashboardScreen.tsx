import { StyleSheet, Text, View, Image, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { COLOR_BLUE_BANNER, COLOR_WHITE, COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizePost from '../components/post/CustomizePost'
import { deletePostAPI, savePostAPI } from '../api/CallApi'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../sockets/SocketClient'
import { LikeAction } from '../types/LikeActions'
import { API_URL_DELETE_POST, API_URL_SAVE_POST } from '../constants/Path'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import SkeletonPost from '../components/SkeletonPost'
import CustomizeCreatePostToolbar from '../components/CustomizeCreatePostToolbar'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { TYPE_POST_STUDENT, TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST, groupStudent } from '../constants/Variables'
import { CREATE_NORMAL_POST_SCREEN, CREATE_RECRUITMENT_SCREEN, CREATE_SURVEY_SCREEN, PROFILE_SCREEN } from '../constants/Screen'
import { ToastMessenger } from '../utils/ToastMessenger'
import { useTranslation } from 'react-multi-lang'
import { useGetStudentPostsQuery } from '../redux/Service'

let stompClient: Client
export default function StudentDiscussionDashboardScreen() {
  const t = useTranslation();
  const isFocused = useIsFocused();
  const code = groupStudent;
  const [isCalled, setIsCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePost, userLogin } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const dispatch = useAppDispatch()
  const [refreshing, setRefreshing] = useState(false)
  const [studentsPost, setStudentPost] = useState([])
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { data, isFetching } = useGetStudentPostsQuery({
    id: userLogin?.id ?? 0
  }, {
    pollingInterval: 2000
  });

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setStudentPost([]);
      if (data.data !== null) {
        setStudentPost(data.data);
      }
      setIsCalled(true);
    }
  }, [data]);

  useEffect(() => {
    if (studentsPost.length > 0 || isCalled) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [studentsPost, isCalled])

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

  const like = useCallback((likeData: LikeAction) => {
    stompClient.send(`/app/posts/group/${code}/like`, {}, JSON.stringify(likeData))
  }, [code])


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
    navigation.navigate(PROFILE_SCREEN, { userId: userLogin?.id ?? 0, group: code })
  }

  const handleDeletePost = async (id: number) => {
    const status = await deletePostAPI(API_URL_DELETE_POST, id);
    ToastMessenger(status, 200, t("ToastMessenger.toastMessengerTextTitle"), t("ToastMessenger.toastMessengerTextWarning"));
  }

  const handleSavePost = async (id: number) => {
    const data = {
      "userId": userLogin?.id,
      "postId": id
    }
    const status = await savePostAPI(API_URL_SAVE_POST, data);
  }

  const renderItem = useCallback((item: any) => {
    return (
      <CustomizePost
        id={item.id}
        userId={item.user['id']}
        name={item.user['name']}
        avatar={item.user['image']}
        typeAuthor={item.user['roleCodes']}
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
  },[studentsPost])

  return (
    <View style={styles.container}>
      {
        isLoading && <SkeletonPost />
      }

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            // TODO
          }} />}
      >
        {/* Image banner */}
        <Image
          style={styles.imageBanner}
          source={require('../assets/image/TDCBanner.jpg')}
        />

        {/* Name group */}
        <View style={styles.lineBellowBanner}>
          <Text style={styles.nameOfStudentGroup}>{t("StudentDashboard.studentDashboardGroupTitle")}</Text>
        </View>
        {/* Create post */}
        {
          userLogin?.roleCodes.includes(TYPE_POST_STUDENT) ?
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
