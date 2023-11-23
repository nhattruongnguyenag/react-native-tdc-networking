import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import axios from 'axios'
import { COLOR_WHITE } from '../constants/Color'

const CustomizeSelectFacultyToolbar = () => {
    const [value, setValue] = useState('')
    const [dataRequest, setDataRequest] = useState([
        {
            id: '',
            name: '',
            majors: [
                {
                    id: '',
                    name: ''
                }
            ]
        }
    ])

    const handleOnChange = () => {
    }

    useEffect(() => {
        axios
            .get(SERVER_ADDRESS + 'api/faculty')
            .then((response) => {
                setDataRequest(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <View>
            <View style={styles.group}>
                <Dropdown
                    style={[styles.dropdown, { borderColor: '#97A1B0' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataRequest}
                    search
                    labelField='name'
                    valueField='id'
                    placeholder='Chọn khoa...'
                    searchPlaceholder='Tìm kiếm...'
                    value={value}
                    onChange={(item) => {
                        setValue(item.id)
                    }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1e90ff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    txtHeader: {
        color: '#ffffff',
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    form: { marginTop: 10 },
    group: {
        marginTop: 20,
        marginHorizontal: 10
    },
    txt: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16
    },
    ip: {
        fontSize: 16,
        borderWidth: 2,
        borderColor: '#97A1B0',
        paddingLeft: 10,
        borderRadius: 10,
        marginTop: 10
    },

    btnRegister: {
        backgroundColor: '#1e90ff',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    txtRegister: {
        color: '#ffffff',
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10
    },

    dropdown: {
        height: 50,
        borderColor: '#97A1B0',
        borderWidth: 0.5,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: COLOR_WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },

    placeholderStyle: {
        fontSize: 16
    },
    selectedTextStyle: {
        fontSize: 16,
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
    logo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    img: {
        width: 100,
        height: 100,
        marginTop: 10
    },
    btnImg: {
        marginRight: 30
    },
    login: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    textInput: {
        borderColor: '#228b22',
        borderWidth: 2
    }
})


export default CustomizeSelectFacultyToolbar