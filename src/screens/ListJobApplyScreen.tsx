import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { COLOR_BLACK, COLOR_GREY, COLOR_SUCCESS, COLOR_WHITE } from '../constants/Color'
import { Image } from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { RootStackParamList } from '../App'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import DefaultAvatar from '../components/common/DefaultAvatar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { DETAIL_JOB_APPLY } from '../constants/Screen'
import Loading from '../components/common/Loading'
import {
  TEXT_NOTIFICATION_LIST_EMPTY,
  TEXT_NOTIFICATION_UPDATE_NULL,
  TEXT_SEE_CV,
  TEXT_TITLE_LOADER
} from '../constants/StringVietnamese'

export default function ListJobApplyScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [listJob, setListJob] = useState([
    {
      id: 0,
      user: {
        image: '',
        name: '',
        phone: '',
        email: ''
      },
      cvUrl: ''
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const route = useRoute<RouteProp<RootStackParamList, 'LIST_JOB_APPLY_SCREEN'>>()
  const postId = route.params?.postId ?? 0

  useEffect(() => {
    if (postId) {
      setIsLoading(true)
      axios
        .get(SERVER_ADDRESS + 'api/job/post/' + postId)
        .then((response) => {
          setIsLoading(false)
          if (response.data.data == '') {
            Alert.alert(TEXT_NOTIFICATION_LIST_EMPTY)
          }
          setListJob(response.data.data)
        })
        .catch((error) => {
          setIsLoading(false)
          console.log(error)
        })
    }
  }, [postId])

  const handleGetDetailJobApply = (cvId: number) => {
    navigation.navigate(DETAIL_JOB_APPLY, { cvId: cvId })
  }
  return (
    <Fragment>
      {isLoading ? (
        <Loading title={TEXT_TITLE_LOADER} />
      ) : (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <SafeAreaView style={{ marginVertical: 10}}>
              {listJob.map((item, index) => (
                <>
                  {item.user.name == '' ? (
                    ''
                  ) : (
                    <View style={styles.form} key={index}>
                      <View>
                        <View style={styles.group}>
                          <View style={{ flex: 3 }}>
                            {item.user.image == '' ? (
                              <DefaultAvatar
                                size={80}
                                identifer={item.user.name[0].replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                              />
                            ) : (
                              <Image
                                source={{ uri: SERVER_ADDRESS + `api/images/${item.user.image}` }}
                                style={styles.img}
                              />
                            )}
                          </View>
                          <View style={styles.item}>
                            <Text style={styles.txt}>
                              {item.user.name.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                            </Text>
                            <View>
                              <View style={styles.itemChild}>
                                <Icon name='phone-alt' style={styles.iconItem}></Icon>
                                {item.user.phone != null ? (
                                  <Text style={styles.lbl}>{item.user.phone}</Text>
                                ) : (
                                  <Text style={styles.lbl}>{TEXT_NOTIFICATION_UPDATE_NULL}</Text>
                                )}
                              </View>

                              <View style={styles.itemChild}>
                                <Icon name='envelope' style={styles.iconItem}></Icon>
                                <Text style={styles.lbl}>{item.user.email}</Text>
                              </View>
                              <TouchableOpacity onPress={() => handleGetDetailJobApply(item.id)}>
                                <View style={[styles.itemChild, { flexDirection: 'row', alignItems: 'center' }]}>
                                  <Icon name='file-pdf' style={[styles.iconItem, { color: COLOR_SUCCESS }]}></Icon>
                                  <Text style={[styles.lbl, { color: COLOR_SUCCESS }]}>{TEXT_SEE_CV}</Text>
                                  <Icon
                                    name='angle-double-right'
                                    style={[styles.iconItem, { color: COLOR_SUCCESS, marginLeft: 5 }]}
                                  ></Icon>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                </>
              ))}
            </SafeAreaView>
        </ScrollView>
      )}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  icon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR_SUCCESS,
    marginHorizontal: 5
  },
  txtHeader: {
    fontWeight: 'bold',
    color: COLOR_SUCCESS,
    fontSize: 20
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 100
  },
  group: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  item: {
    flex: 8
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLOR_BLACK
  },
  form: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLOR_WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6.27,
    elevation: 10,
  },
  lbl: {
    fontSize: 16,
    color: COLOR_GREY,
    fontWeight: 'bold'
  },
  iconItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR_GREY,
    marginRight: 10
  },
  bottom: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  itemChild: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
