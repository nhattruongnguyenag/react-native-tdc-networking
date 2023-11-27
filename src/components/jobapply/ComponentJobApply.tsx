import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { useJobApplyUpdateMutation } from '../../redux/Service'
import { COLOR_WHITE } from '../../constants/Color'
import { ScrollView } from 'react-native-gesture-handler'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

const dataType = [
  { label: 'received', value: '1' },
  { label: 'in_progress', value: '2' },
  { label: 'not_meet_standard_quality', value: '3' },
  { label: 'interview', value: '4' },
  { label: 'not_meet_standard_quality', value: '5' },
  { label: 'accept', value: '6' }
]

export default function ComponentJobApply() {
  const route = useRoute<RouteProp<RootStackParamList, 'CHANGE_STATUS_JOB_APPLY_SCREEN'>>()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [jobApplyUpdateRequest, jobApplyUpdateResponse] = useJobApplyUpdateMutation()
  const status = route.params?.status
  const [value, setValue] = useState(status)
  const handleChangeStatusJob = () => {
    jobApplyUpdateRequest({
      profileId: route.params?.profileId,
      status: value ?? undefined
    })
  }

  useEffect(() => {
    console.log(jobApplyUpdateResponse.isSuccess)
    if (jobApplyUpdateResponse.isSuccess || jobApplyUpdateResponse.data) {
      console.log(jobApplyUpdateResponse.data)
      Alert.alert('Thông báo', 'Đổi trạng thái thành công')
      navigation.goBack()
    }
  }, [jobApplyUpdateResponse])

  return (
    <ScrollView style={{ backgroundColor: COLOR_WHITE }}>
      <View style={styles.group}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.txt}>Đổi trạng thái hồ sơ</Text>
        </View>
        <Dropdown
          placeholder={value}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={dataType}
          labelField='label'
          valueField='value'
          value={value}
          onChange={(item) => {
            setValue(item.label)
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={[styles.btnContinute, { marginRight: 5 }]} onPress={() => navigation.goBack()}>
            <Text style={styles.txtRegister}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnContinute, { marginLeft: 5 }]} onPress={() => handleChangeStatusJob()}>
            <Text style={styles.txtRegister}>Thay đổi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  group: {
    marginHorizontal: 10,
    marginVertical: '50%',
    backgroundColor: COLOR_WHITE
  },
  txt: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18
  },
  dropdown: {
    height: 50,
    borderColor: '#97A1B0',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10
  },

  placeholderStyle: {
    fontSize: 18
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#000000'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000000'
  },
  icon: {
    fontSize: 20,
    position: 'absolute',
    padding: 50,
    right: -20
  },
  icon1: {
    fontSize: 20
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 28
  },

  btnContinute: {
    width: 100,
    height: 45,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10
  },
  txtRegister: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
