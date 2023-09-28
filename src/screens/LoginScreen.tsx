import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

// man hinh dang nhap
export default function LoginScreen() {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          <Image
            style={styles.imageLogin}
            source={require('../assets/login/login.png')}></Image>
        </View>
        <View>
          <View>
            <Text style={styles.txtLogin}>Login</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.group}>
              <Icon style={styles.icon} name="at" />
              <TextInput
                placeholder="Email ID"
                style={styles.txtIP}></TextInput>
            </View>
            <View style={styles.group}>
              <View>
                <Icon style={styles.icon} name="lock" />
                <TextInput
                  secureTextEntry={true}
                  placeholder="Password"
                  style={styles.txtIP}></TextInput>
              </View>
              <View>
                <TouchableOpacity>
                  <Text style={styles.txtFogot}>Forgots?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.btnLogin}>
            <Text style={styles.txtB}>Login</Text>
          </TouchableOpacity>
          <View
            style={styles.txt}>
            <Text>Don't have account? </Text>
            <TouchableOpacity>
              <Text style={{color: '#0065FF', fontWeight: 'bold'}}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  imageLogin: {
    width: 370,
    height: 280,
    marginBottom: 15,
  },
  txtLogin: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 15,
  },
  form: {},
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#97A1B0',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  txtIP: {
    fontSize: 18,
    paddingLeft: 30,
  },
  icon: {
    fontSize: 20,
    position: 'absolute',
    top: 16,
  },
  txtFogot: {
    color: '#0065FF',
    fontSize: 18,
  },
  btnLogin: {
    marginTop: 30,
    fontSize: 30,
    backgroundColor: 'blue',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  txtB: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  txt:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  }
})
