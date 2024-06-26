import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { useEffect, useState, useCallback } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import Icon1 from 'react-native-vector-icons/Entypo'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu'
import axios from 'axios'
import { Client, Frame, Message } from 'stompjs'
import { getStompClient } from '../sockets/SocketClient'
import UserItem from "../components/items/UserItem";
import PostNormalItem from '../components/items/PostNormalItem'
import { LABEL_POST_BUSINESS, LABEL_POST_FACULTY, LABEL_POST_NORMAL, LABEL_POST_RECRUITMENT, LABEL_POST_STUDENT, LABEL_POST_SURVEY, TEXT_SEARCH, TEXT_SUBJECT_POST, TEXT_SUBJECT_USER, TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_NORMAL, TYPE_POST_RECRUITMENT, TYPE_POST_STUDENT, TYPE_POST_SURVEY } from '../constants/StringVietnamese'
import CustomizePost from '../components/post/CustomizePost'
import { LikeAction } from '../types/LikeActions'
import { setDefaultLanguage } from '../redux/Slice'
import { useTranslation } from 'react-multi-lang'
import { LikeSearch } from '../types/LikeSearch'
import { ActivityIndicator } from 'react-native-paper'


let stompClient: Client


const { height, width } = Dimensions.get('screen')
// man hinh tim kiem
export default function SearchScreen() {




  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  //Danh sach tim kiem
  const [masterData, setMasterData] = useState([])
  //Kieu du lieu
  const [search, setSearch] = useState('')
  const [subjects, setSubjects] = useState('user')
  const [type, setType] = useState(TYPE_POST_STUDENT)
  const [qty, setQty] = useState(0)
  let URL = `${SERVER_ADDRESS}api/find/post`
  const t = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  //Xu ly dropdown
  const [value, setValue] = useState(null)
  const [label, setLabel] = useState(t('SearchComponent.user'))
  const [label2, setLabel2] = useState(`- - ${t('SearchComponent.student')} - -`)
  const [items, setItems] = useState([
    {
      label: t('SearchComponent.user'),
      value: 'user',
      children: [
        { label: `- - ${t('SearchComponent.student')} - -`, value: TYPE_POST_STUDENT },
        { label: `- - ${t('SearchComponent.business')} - -`, value: TYPE_POST_BUSINESS },
        { label: `- - ${t('SearchComponent.faculty')} - -`, value: TYPE_POST_FACULTY }
      ]
    },
    {
      label: t('SearchComponent.post'),
      value: 'post',
      children: [
        { label: `- - ${t('SearchComponent.normal')} - -`, value: TYPE_POST_NORMAL },
        { label: `- - ${t('SearchComponent.survey')} - -`, value: TYPE_POST_SURVEY },
        { label: `- - ${t('SearchComponent.recruitment')} - -`, value: TYPE_POST_RECRUITMENT }
      ]
    }
  ])



  const onMessageFindUserReceived = (payload: any) => {
    //kiem tra subjects
    if (subjects == 'user') {
      setIsLoading(false);
      setMasterData(JSON.parse(payload.body))
    }
  }

  const onMessageFindPostReceived = (payload: any) => {
    setIsLoading(false);
    setMasterData(JSON.parse(payload.body))
  }

  useEffect(() => {

    stompClient = getStompClient()
    const onConnected = () => {
      if (stompClient.connected) {
        stompClient.subscribe(`/topic/find/user`, onMessageFindUserReceived)
        stompClient.subscribe(`/topic/find/post`, onMessageFindPostReceived)
      }
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, [])

  //Search
  const handleSearch = () => {
    setIsLoading(true)
    if (stompClient.connected) {
      if (subjects == 'user') {
        stompClient.send(`/app/find/user/follow`, {}, JSON.stringify({
          userId: userLogin?.id,
          type: type,
          name: search,
          userFollowId: null
        }))
      }
      else {
        stompClient.send(`/app/find/post/unsave`, {}, JSON.stringify({
          userId: userLogin?.id,
          type: type,
          search: search,
          postId: null
        }))
      }
    }
  }

  //Follow
  const handleFollow = (userFollowId: number) => {
    stompClient.send(
      `/app/find/user/follow`,
      {},
      JSON.stringify({
        userId: userLogin?.id,
        type: type,
        name: search,
        userFollowId: userFollowId
      })
    )
  }

  const likeAction = (obj: LikeAction) => {
    const likeData: Omit<LikeSearch, 'code'> = {
      postId: obj.postId,
      userId: obj.userId,
      type: type,
      search: search
    }
    like(likeData)
  }

  const like = useCallback((likeData: Omit<LikeSearch, 'code'>) => {
    console.log(likeData)
    stompClient.send(`/app/find/post/like`, {}, JSON.stringify(likeData))
  }, [subjects])


  const handleUnSave = (idPost: number) => {
    stompClient.send(`/app/find/post/unsave`, {}, JSON.stringify({
      userId: userLogin?.id,
      type: type,
      search: search,
      postId: idPost
    }))
  }

  const handleDelete = () => { }


  const checkType = () => {

    switch (subjects) {
      case 'user':
        return masterData.map((item: any, index) => <UserItem id={item.id} image={item.image} name={item.name} isFollow={item.isFollow} group={item.group} handleFollow={handleFollow} />)
        break
      case 'post':
        return (
          <>
            {masterData != null &&
              masterData.map((item: any) => (
                <CustomizePost
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
              ))}
          </>
        )
        break
      default:
        console.log('...')
    }
  }
  return (
    <View style={styles.searchScreen}>
      <View style={styles.operation}>
        <TextInput
          style={styles.search}
          placeholder={t('SearchComponent.search')}
          placeholderTextColor='#000000'
          value={search}
          onChangeText={(txt) => setSearch(txt)}
        ></TextInput>
        <View style={styles.select}>
          <View style={styles.drop}>
            <Dropdown
              style={styles.dropDown}
              data={items}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={label}
              value={value}
              onChange={item => {
                setMasterData([])
                setQty(0)
                setLabel(item.label)
                setSubjects(item.value)
                setType(item.label === t('SearchComponent.post') ? items[1].children[0].value : items[0].children[0].value)
                setLabel2(item.label === t('SearchComponent.post') ? items[1].children[0].label : items[0].children[0].label)
              }}

            />
            <Dropdown
              style={[styles.dropDown2]}
              data={label === t('SearchComponent.post') ? items[1].children : items[0].children}
              value={value}
              placeholder={label2}
              labelField='label'
              valueField='value'
              onChange={(item) => {
                setType(item.value)
              }}
            />
          </View>
          <TouchableOpacity style={styles.btnSearch} onPress={handleSearch}>
            <Text>
              <Icon name='search' size={25} color='#ffffff' />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <MenuProvider>
        <ScrollView>
          {isLoading ?
            <ActivityIndicator color={'#000000'} style={[{ display: isLoading ? 'flex' : 'none' }, { marginTop: 100 }]} />
            :
            checkType()
          }
        </ScrollView>
      </MenuProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  // 
  menuText: {
    fontSize: 15
  },
  menuOption: {
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
    // width: 130,
    marginLeft: -15,
    paddingTop: 10,
    paddingBottom: 10
  },
  searchScreen: {
    backgroundColor: 'white',
    flex: 1
  },
  operation: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    marginBottom: 50,
    height: 90
  },
  search: {
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    height: 45,
    paddingLeft: 10
  },
  select: {
    flexDirection: 'row',
    paddingTop: 5
  },
  qty: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000000',
    marginLeft: 15,
    marginBottom: 10
  },
  dropDown: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: 'white',
    height: 35,
    justifyContent: 'center',
    paddingLeft: 35,
    borderWidth: 1,
    borderColor: '#070375'
  },
  dropDown2: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: 'white',
    height: 35,
    justifyContent: 'center',
    textAlign: 'center',
    paddingLeft: 20,
    marginTop: 3,
    borderWidth: 1,
    borderColor: '#070375'
  },
  drop: {
    flex: 5,
    color: 'white'
  },
  btnSearch: {
    flex: 1,
    backgroundColor: '#0065ff',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 5
  },
  itemPost1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
    // borderBottomWidth: 0.9,
    // borderBottomColor: 'gray',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 0.9,
    borderBottomColor: 'gray'
  },
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    paddingVertical: 20,
    borderColor: '#0065ff',
    borderWidth: 1
  },
  name: {
    paddingRight: 10,
    paddingLeft: 10,
    width: '62%',
    fontSize: 17,
    color: '#5A5F5C',
    fontWeight: 'bold'
  },
  follow: {
    height: 30,
    // marginRight: 12,
    borderRadius: 5,
    backgroundColor: '#0065ff',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonFollow: {
    backgroundColor: '#f3f9ff'
  }
})
