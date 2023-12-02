import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { useJobApplyUpdateMutation } from '../../redux/Service'
import { COLOR_WHITE } from '../../constants/Color'
import { ScrollView } from 'react-native-gesture-handler'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { t } from 'react-multi-lang'

export default function ComponentJobApply() {
  const dataType = [
    { label: t('ChangeStatusJobApply.textReceived'), value: 'received' },
    { label: t('ChangeStatusJobApply.textIn_progress'), value: 'in_progress' },
    { label: t('ChangeStatusJobApply.textNot_meet_standard_quality'), value: 'not_meet_standard_quality' },
    { label: t('ChangeStatusJobApply.textInterview'), value: 'interview' },
    {
      label: t('ChangeStatusJobApply.textInterview_not_meet_standard_quality'),
      value: 'interview_not_meet_standard_quality'
    },
    { label: t('ChangeStatusJobApply.textAccept'), value: 'accept' }
  ]
  const route = useRoute<RouteProp<RootStackParamList, 'CHANGE_STATUS_JOB_APPLY_SCREEN'>>()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [jobApplyUpdateRequest, jobApplyUpdateResponse] = useJobApplyUpdateMutation()
  const status = route.params?.status
  const [value, setValue] = useState(status)
  const [item, setItem] = useState(status)
  const handleChangeStatusJob = () => {
    jobApplyUpdateRequest({
      profileId: route.params?.profileId,
      status: value ?? undefined
    })
  }

  useEffect(() => {
    console.log(jobApplyUpdateResponse.isSuccess)
    if (jobApplyUpdateResponse.isSuccess || jobApplyUpdateResponse.data) {
      Alert.alert(t('ChangeStatusJobApply.textNotification'), t('ChangeStatusJobApply.textChangeSucces'))
      navigation.goBack()
    }
  }, [jobApplyUpdateResponse])

  return (
    <ScrollView style={{ backgroundColor: COLOR_WHITE }}>
      <View style={styles.group}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.txt}>{t('ChangeStatusJobApply.textChangeStatus')}</Text>
        </View>
        <Dropdown
          placeholder={item}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={dataType}
          labelField='label'
          valueField='value'
          value={item}
          onChange={(item) => {
            setValue(item.value)
            setItem(item.label)
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={[styles.btnContinute, { marginRight: 5 }]} onPress={() => navigation.goBack()}>
            <Text style={styles.txtRegister}>{t('ChangeStatusJobApply.textDelete')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnContinute, { marginLeft: 5 }]} onPress={() => handleChangeStatusJob()}>
            <Text style={styles.txtRegister}>{t('ChangeStatusJobApply.textChange')}</Text>
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
