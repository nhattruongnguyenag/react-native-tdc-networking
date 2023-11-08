import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { COLOR_BLACK, COLOR_GREY, COLOR_SUCCESS, COLOR_WHITE } from '../constants/Color'
import { Image } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import axios from 'axios'
import { RootStackParamList } from '../App'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import DefaultAvatar from '../components/DefaultAvatar'

export default function ListJobApplyScreen() {
  const [listJob, setListJob] = useState([
    {
      id: 0,
      user: {
        image: '',
        name: '',
        phone: '',
        address: '',
        email: ''
      }
    }
  ])
  const route = useRoute<RouteProp<RootStackParamList, 'LIST_JOB_APPLY_SCREEN'>>()
  const postId = route.params?.postId ?? 0
  useEffect(() => {
    if (postId) {
      axios
        .get(SERVER_ADDRESS + 'api/job/post/' + postId)
        .then((response) => {
          setListJob(response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [postId])

  const handleGetDetailJobApply = (cvId: number) => {
    console.log('CV được chọn' + cvId)
  }
  return (
    <SafeAreaView style={{ marginVertical: 10 }}>
      <ScrollView>
        {listJob.map((item, index) => (
          <View style={styles.form} key={index}>
            <View>
              <View style={styles.group}>
                <View style={{ flex: 3 }}>
                  {item.user.image == '' ? (
                    <DefaultAvatar size={80} identifer={item.user.name[0]} />
                  ) : (
                    <Image source={{ uri: SERVER_ADDRESS + `api/images/${item.user.image}` }} style={styles.img} />
                  )}
                </View>
                <View style={styles.item}>
                  <Text style={styles.txt}>{item.user.name}</Text>
                  <View>
                    {item.user.phone != '' ? (
                      <View style={styles.itemChild}>
                        <Icon name='phone-alt' style={styles.iconItem}></Icon>
                        <Text style={styles.lbl}>{item.user.phone}</Text>
                      </View>
                    ) : (
                      ''
                    )}
                    <View style={styles.itemChild}>
                      <Icon name='envelope' style={styles.iconItem}></Icon>
                      <Text style={styles.lbl}>{item.user.email}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleGetDetailJobApply(item.id)}>
                      <View style={[styles.itemChild, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Icon name='file-pdf' style={[styles.iconItem, { color: COLOR_SUCCESS }]}></Icon>
                        <Text style={[styles.lbl, { color: COLOR_SUCCESS }]}>Xem chi tiết cv</Text>
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
        ))}
      </ScrollView>
    </SafeAreaView>
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
    flex: 7
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
    backgroundColor: COLOR_WHITE
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
