import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { Button, IconButton } from 'react-native-paper'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

interface QuestionType {
  icon: string
  name: string
  value: string
}
const questionTypes: QuestionType[] = [
  {
    icon: 'envelope-open-text',
    name: 'Trả lời ngắn',
    value: '1'
  },
  {
    icon: 'check-circle',
    name: 'Trắc nghiệm',
    value: '2'
  },
  {
    icon: 'check-square',
    name: 'Nhiều lựa chọn',
    value: '3'
  }
]

export default function AddQuestionView() {
  const renderItem = (item: QuestionType) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 10 }}>
        <Text style={{ margin: 5, fontSize: 16 }}>{item.name}</Text>
        <FontAwesome5Icon name={item.icon} size={16} style={{ marginStart: 'auto', marginEnd: 10 }} />
      </View>
    )
  }

  return (
    <View style={styles.body}>
      <Dropdown
        style={styles.dropdown}
        data={questionTypes}
        search
        labelField='name'
        valueField='value'
        placeholder='--- Chọn loại câu hỏi ---'
        searchPlaceholder='Tìm kiếm...'
        onChange={(item) => {}}
        renderItem={renderItem}
      />

      <Button icon='plus' mode='elevated' style={{ backgroundColor: '#0065FF' }} onPress={() => {}} textColor='#fff'>
        <Text style={{ fontSize: 16 }}>Thêm</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  dropdown: {
    flex: 1,
    borderColor: '#97A1B0',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginStart: 5,
    marginEnd: 10
  },
  btnPlus: {
    marginStart: 'auto'
  }
})
