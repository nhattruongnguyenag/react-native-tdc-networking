import { FlatList, ScrollView, StyleSheet, View, RefreshControl, Text } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizePost from '../components/post/CustomizePost'
import { TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../constants/StringVietnamese'
import { deletePostAPI, postAPI, savePostAPI } from '../api/CallApi'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../sockets/SocketClient'
import { LikeAction } from '../types/LikeActions'
import { API_URL_DELETE_POST, API_URL_FACULTY_POST, API_URL_SAVE_POST } from '../constants/Path'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import SkeletonPost from '../components/SkeletonPost'
import CustomizeCreatePostToolbar from '../components/CustomizeCreatePostToolbar'
import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST } from '../constants/Variables'
import { CREATE_NORMAL_POST_SCREEN, CREATE_RECRUITMENT_SCREEN, CREATE_SURVEY_SCREEN, PROFILE_SCREEN } from '../constants/Screen'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import CustomizeSelectFacultyToolbar from '../components/CustomizeSelectFacultyToolbar'
import { WINDOW_HEIGHT } from '../utils/SystemDimensions'
import { ToastMessenger } from '../utils/ToastMessenger'
import { useTranslation } from 'react-multi-lang'
import { useGetFacultyPostsQuery } from '../redux/Service'

let stompClient: Client
export default function FacultyDashboardScreen() {
  const t = useTranslation();
  const isFocused = useIsFocused();
  const [isCalled, setIsCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePost, userLogin } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const [code, setCode] = useState("");
  const dispatch = useAppDispatch();
  const [facultyPost, setFacultyPost] = useState([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, isFetching } = useGetFacultyPostsQuery(
    {
      faculty: code,
      id: userLogin?.id ?? 0
    },
    {
      pollingInterval: 2000
    }
  );


  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setFacultyPost([]);
      setFacultyPost(data.data);
      setIsCalled(true);
    }
  }, [data])

  useEffect(() => {
    setCode((userLogin?.roleCodes.includes(TYPE_POST_STUDENT) || userLogin?.roleCodes.includes(TYPE_POST_FACULTY)) ? userLogin.facultyGroupCode : '');
  }, [userLogin]);

  useEffect(() => {
    if (facultyPost.length > 0 || isCalled) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [facultyPost, isCalled])

  const getDataFacultyApi = useCallback(async () => {
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
  }, [userLogin, data])

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

  const like = useCallback((likeData: LikeAction) => {
    stompClient.send(`/app/posts/group/${code}/like`, {}, JSON.stringify(likeData))
  }, [code])

  const handleClickToCreateButtonEvent = (type: string) => {
    if (type === TYPE_NORMAL_POST) {
      navigation.navigate(CREATE_NORMAL_POST_SCREEN, { group: userLogin?.facultyGroupId ?? 0 });
    } else if (type === TYPE_RECRUITMENT_POST) {
      navigation.navigate(CREATE_RECRUITMENT_SCREEN);
    } else {
      navigation.navigate(CREATE_SURVEY_SCREEN);
    }
  }
  // passed
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
    ToastMessenger(status, 201, t("ToastMessenger.toastMessengerTextTitle"), t("ToastMessenger.toastMessengerTextWarning"));
  }

  const handleSelectFacultyEvent = useCallback((_code: string) => {
    setCode(_code);
  }, [])

  const renderItem = (item: any) => {
    // return item.active === 1 ? (
    //   <CustomizePost
    //     id={item.id}
    //     userId={item.user['id']}
    //     name={item.user['name']}
    //     avatar={item.user['image']}
    //     typeAuthor={item.user['roleCodes']}
    //     available={null}
    //     timeCreatePost={item.createdAt}
    //     content={item.content}
    //     type={item.type}
    //     likes={item.likes}
    //     comments={item.comment}
    //     commentQty={item.commentQuantity}
    //     images={item.images}
    //     role={item.user['roleCodes']}
    //     likeAction={likeAction}
    //     location={item.location ?? null}
    //     title={item.title ?? null}
    //     expiration={item.expiration ?? null}
    //     salary={item.salary ?? null}
    //     employmentType={item.employmentType ?? null}
    //     description={item.description ?? null}
    //     isSave={item.isSave}
    //     group={code}
    //     handleUnSave={handleSavePost}
    //     handleDelete={handleDeletePost} />
    // ) : (null)

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
  }

  return (
    userLogin?.roleCodes !== TYPE_POST_BUSINESS ? <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl
          refreshing={false}
          onRefresh={() => getDataFacultyApi()}
        />}
      >
        {
          userLogin?.roleCodes.includes(TYPE_POST_FACULTY) ? <View style={styles.toolbarCreatePost}>
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
        flag={t("SelectFaculty.selectFacultyPlaceholder")}
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
                <Text>{t("FacultyDashboard.facultyDashboardNotifyNotHavePost")}</Text>
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