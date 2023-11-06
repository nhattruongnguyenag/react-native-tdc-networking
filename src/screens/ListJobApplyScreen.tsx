import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { COLOR_BLACK, COLOR_GREY, COLOR_SUCCESS, COLOR_WHITE } from '../constants/Color'
import { Image } from 'react-native'

export default function ListJobApplyScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Icon name='skyatlas' style={styles.icon}></Icon>
          <Text style={styles.txtHeader}>Ứng viên</Text>
          <Icon name='skyatlas' style={styles.icon}></Icon>
        </View>
        <TouchableOpacity>
          <View style={styles.form}>
            <View>
              <View style={styles.group}>
                <View style={{ flex: 3 }}>
                  <Image source={require('../assets/login/login.png')} style={styles.img} />
                </View>
                <View style={styles.item}>
                  <Text style={styles.txt}>Nguyễn Thị Diệu</Text>
                  <View>
                    <View style={styles.itemChild}>
                      <Icon name='phone-alt' style={styles.iconItem}></Icon>
                      <Text style={styles.lbl}>2345346457</Text>
                    </View>
                    <View style={styles.itemChild}>
                      <Icon name='envelope' style={styles.iconItem}></Icon>
                      <Text style={styles.lbl}>abc@gmail.com</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.check}>
                  <Text style={styles.txtCheck}>Đã xem</Text>
                </View>
              </View>
              <View style={styles.bottom}>
                <View style={styles.itemChild}>
                  <Icon name='map-marker-alt' style={styles.iconItem}></Icon>
                  <Text style={styles.lbl}>TP Hồ Chí Minh</Text>
                </View>
                <View style={styles.itemChild}>
                  <Icon name='briefcase' style={styles.iconItem}></Icon>
                  <Text style={styles.lbl}>Công nghệ thông tin</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.form,{backgroundColor:'#e0ffff'}]}>
            <View>
              <View style={styles.group}>
                <View style={{ flex: 3 }}>
                  <Image source={require('../assets/login/login.png')} style={styles.img} />
                </View>
                <View style={styles.item}>
                  <Text style={styles.txt}>Nguyễn Thị Diệu</Text>
                  <View>
                    <View style={styles.itemChild}>
                      <Icon name='phone-alt' style={styles.iconItem}></Icon>
                      <Text style={styles.lbl}>2345346457</Text>
                    </View>
                    <View style={styles.itemChild}>
                      <Icon name='envelope' style={styles.iconItem}></Icon>
                      <Text style={styles.lbl}>abc@gmail.com</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.check, {backgroundColor:'#32cd32'}]}>
                  <Text style={styles.txtCheck}>Chưa xem</Text>
                </View>
              </View>
              <View style={styles.bottom}>
                <View style={styles.itemChild}>
                  <Icon name='map-marker-alt' style={styles.iconItem}></Icon>
                  <Text style={styles.lbl}>TP Hồ Chí Minh</Text>
                </View>
                <View style={styles.itemChild}>
                  <Icon name='briefcase' style={styles.iconItem}></Icon>
                  <Text style={styles.lbl}>Công nghệ thông tin</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:5
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
    justifyContent: 'space-around',
    borderBottomColor: COLOR_GREY,
    borderBottomWidth: 1
  },
  item: {
    flex: 6
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
  check: {
    flex: 2,
    backgroundColor: '#f08080',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  txtCheck:{
    color:COLOR_WHITE,
    fontWeight:'bold'
  },
  bottom: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  itemChild:{
    flexDirection: 'row', alignItems: 'center' 
  }
})
