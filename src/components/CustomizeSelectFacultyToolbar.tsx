import { View, StyleSheet, Text } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import axios from 'axios'
import { COLOR_WHITE } from '../constants/Color'
import { useTranslation } from 'react-multi-lang'
import { getFacultyTranslated } from '../utils/GetFacultyTranslated '


interface DataItem {
    id: number
    facultyGroupCode: number
    oldName: string
    name: string
}

interface SelectFacultyToolbarType {
    flag: boolean
    handleSelectFacultyEvent: (code: string) => void
}

const CustomizeSelectFacultyToolbar = (props: SelectFacultyToolbarType) => {
    const t = useTranslation();
    const [dataRequest, setDataRequest] = useState<DataItem[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const response = axios
                .get(SERVER_ADDRESS + 'api/faculty')
                .then((response) => {
                    const simpleData: DataItem[] = response.data.data.map(({ id, name, facultyGroupCode, oldName }: DataItem) => ({ id, name, facultyGroupCode, oldName: name }))
                    setDataRequest(simpleData)
                })
                .catch((error) => {
                })
        }
        fetchData();
    }, [])

    const translateAllFaculty = (dataNeedTranslate: DataItem[]) => {
        const facultiesHadTranslated: DataItem[] = dataNeedTranslate.map((item: DataItem) => {
            item.name = getFacultyTranslated(item.oldName, t);
            return item;
        })
        return facultiesHadTranslated;
    }
    
    return (
        <View>
            <View style={styles.group}>
                <Dropdown
                    style={[styles.dropdown, { borderColor: '#97A1B0' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={translateAllFaculty(dataRequest)}
                    search
                    labelField={'name'}
                    valueField='id'
                    placeholder={t("SelectFaculty.selectFacultyPlaceholder")}
                    searchPlaceholder={t("SelectFaculty.selectFacultyTextSearch")}
                    onChange={(item: any) => {
                        props.handleSelectFacultyEvent(item.facultyGroupCode)
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


export default memo(CustomizeSelectFacultyToolbar)