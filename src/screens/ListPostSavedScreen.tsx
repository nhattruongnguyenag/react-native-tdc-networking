import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { Post } from '../types/Post';
import SavePostListView from '../components/listviews/SavePostListView';
import { Client, Frame } from 'stompjs';
import { useAppSelector } from '../redux/Hook';
import { LikeAction } from '../types/LikeActions';
import { getStompClient } from '../sockets/SocketClient';
import { RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomizePost from '../components/post/CustomizePost';
import { TEXT_SEARCH, TYPE_POST_BUSINESS } from '../constants/StringVietnamese';
import { useTranslation } from 'react-multi-lang';
import { useGetListPostSavedQuery } from '../redux/Service';

let stompClient: Client
const ListPostSavedScreen = () => {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [search, setSearch] = useState('')
  const [value, setValue] = useState(null)
  const t = useTranslation()
  const [data, setData] = useState<Post[]>()

  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      stompClient.subscribe(`/topic/posts/save`, onMessageReceived)
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
    axios.get(`${SERVER_ADDRESS}api/posts/user/save/${userLogin?.id}`).then((response) => {
      setData(response.data.data)
    })
  }, [])

  const likeAction = (obj: LikeAction) => {
    like(obj)
  }

  const like = useCallback(async (likeData: LikeAction) => {
    stompClient.send(`/app/posts/save/user/like`,
      {}, JSON.stringify(likeData))
  }, [])

  const handleUnSave = (post_id: number) => {
    stompClient.send(
      `/app/posts/save/user/unsave`,
      {},
      JSON.stringify({
        postId: post_id,
        userId: userLogin?.id
      })
    )
  }
  const handleDelete = (post_id: number) => {
  }

  return (
    <View style={styles.searchScreen}>
      <View style={styles.search}>
        <TextInput
          value={search}
          style={styles.txt_input} placeholder={t('SavedPostListComponent.search')}
          onChangeText={(i) => setSearch(i)}
        />
        <Icon style={styles.btn_search} name='search' size={22} color='#000000' />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl
          refreshing={false}
          onRefresh={() => data}
        />}
      >
            {
              data?.map((item: any) => <CustomizePost
                id={item.id}
                userId={item.user['id']}
                name={item.user['name']}
                avatar={item.user['image']}
                typeAuthor={'Doanh Nghiệp'}
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
                group={''}
                handleUnSave={handleUnSave}
                handleDelete={handleDelete}
                active={0} />
              )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    width: '95%',
    height: 40,
    backgroundColor: '#E6E6E6',
    borderRadius: 50,
    justifyContent: 'center',
  },
  txt_input: {
    paddingLeft: 40
  },
  btn_search: {
    position: 'absolute',
    paddingLeft: 10,
    color: '#7A7A7A'
  },
  searchScreen: {
    backgroundColor: 'white',
    flex: 1
  },
  operation: {
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    marginBottom: 20,
  },
  dropDown: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
})

export default ListPostSavedScreen