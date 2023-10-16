import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { Button } from 'react-native-paper'

// man hinh dang bai viet tuyen dung
export default function CreateRecruitmentScreen() {
  useEffect(() => {}, [])

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView>
        <TextInputWithTitle
          title='Tiêu đề'
          placeholder='Nhập tiêu đề...'
          onChangeText={(value) => console.log(value)}
        />

        <TextInputWithTitle title='Hình thức làm việc' placeholder='Hình thức làm việc...' />

        <TextInputWithTitle title='Thời hạn ứng tuyển' placeholder='Thời hạn ứng tuyển...' />

        <TextInputWithTitle title='Địa điểm làm việc' placeholder='Địa điểm làm việc...' />

        <TextInputWithTitle title='Mô tả công việc' placeholder='Mô tả công việc...' />

        <TextInputWithTitle title='Yêu cầu' placeholder='Yêu cầu...' />

        <TextInputWithTitle title='Quyền lợi' placeholder='Quyền lợi...' />

        <Button
          icon='plus'
          mode='contained'
          buttonColor={'#0065FF'}
          style={styles.buttonCreateRecruitment}
          onPress={() => console.log('Pressed')}
        >
          <Text style={styles.buttonCreateRecruitmentTitle}>Hoàn tất</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flex: 1,
    padding: 5
  },
  buttonCreateRecruitment: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 25,
    marginBottom: 20,
    paddingVertical: 5
  },
  buttonCreateRecruitmentTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
