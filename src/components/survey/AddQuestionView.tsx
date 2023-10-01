import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { Button, IconButton } from 'react-native-paper'

const questionTypes = [
    { name: 'Trả lời ngắn', value: '1' },
    { name: 'Câu hỏi nhiều đáp án một lựa chọn', value: '2' },
    { name: 'Câu hỏi nhiều đáp án nhiều lựa chọn', value: '3' },
]

export default function AddQuestionView() {
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
                onChange={(item) => {
                }}
            />

            <Button icon="plus"
                mode="elevated"
                style={{backgroundColor: '#0065FF'}}
                onPress={() => {}}
                textColor="#fff">
                <Text style={{fontSize: 16}}>Thêm</Text>
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