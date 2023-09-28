import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CustomizeBusinessPost = () => {
  return (
    <View>
      {/* Header */}
      <View style={styles.wrapHeader}>
        <Image
          style={styles.headerAvatar}
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png' }} />
        <View style={styles.headerCenter}>
          <View style={styles.headerCenterTop}>
            <Text style={styles.headerBusinessName}>Google VN</Text>
            <Icon2 name='checkcircle' size={15} color={"blue"} />
            <View style={styles.headerCenterType}><Text style={styles.headerTxt}>Doanh nghiệp</Text></View>
          </View>
          <View style={styles.headerCenterTop}>
            <Text style={styles.headerCenterTimePost}>27/07/2023 9:09 - tuyển dụng</Text>
            <View style={styles.headerCenterType}><Text style={styles.headerTxt}>Khả dụng</Text></View>
          </View>
        </View>
        <TouchableOpacity>
          <Icon1 name="dots-three-vertical" size={15} color="black" />
        </TouchableOpacity>
      </View>
      {/* Body */}
      {/* Bottom */}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerAvatar: {
    width: 43,
    height: 43,
  },
  headerBusinessName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  headerCenterTop: {
    flexDirection: 'row'
  },
  headerCenterType: {
    backgroundColor: '#D9D9D9',
    width: 70,
    height: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerCenterTimePost: {
    fontWeight: 'normal',
    fontSize: 13,
    color: 'black'
  },
  headerTxt: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black'
  }
})
export default CustomizeBusinessPost