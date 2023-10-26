import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import React from 'react'
import { COLOR_BLACK, COLOR_BLUE_BANNER, COLOR_GREY, COLOR_SUCCESS, COLOR_WHITE } from '../../constants/Color'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { formatVietNamCurrency } from '../../utils/FormatCurrency'
import { formatDateTime, numberDayPassed } from '../../utils/FormatTime'
import CustomizeBodyPost from '../CustomizeBodyPost'
import { TEXT_JOIN_SURVEY, TEXT_SURVEY, TEXT_SURVEY_CONTENT, TEXT_SURVEY_TITLE } from '../../constants/StringVietnamese'
import DefaultAvatar from '../DefaultAvatar'

export interface RecruitmentPostType {
    id: number,
    createdAt: string,
    image: string,
    name: string,
    type: string,
    title: string,
    description: string,
    handleClickBtnSeeDetailEvent: (id: number) => void
    handleClickIntoAvatarAndNameAndMenuEvent: (id: number) => void
}
// Constant
const ICON_SIZE = 15;
export default function CustomizeSurveyPost(props: RecruitmentPostType) {

    return (
        <>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity
                        onPress={() => props.handleClickIntoAvatarAndNameAndMenuEvent(0)}>
                        {
                            props.image != null ?
                                <Image style={styles.avatar} source={{ uri: SERVER_ADDRESS + `api/images/${props.image}` }} />
                                :
                                <DefaultAvatar size={43} identifer={props.name[0]} />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.rightContainerTopTitle}>
                        <Text style={styles.name}>{props.name}{' '}<View><Text style={[styles.itemType, styles.textTypePost]}>{TEXT_SURVEY}</Text></View></Text>
                        <View style={styles.menu}>
                            <TouchableOpacity
                                onPress={() => props.handleClickIntoAvatarAndNameAndMenuEvent(1)}>
                                <EntypoIcon name='dots-three-vertical' size={ICON_SIZE} color={COLOR_BLACK} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rightContainerBottom}>
                        <View style={[styles.rowAndCenter, styles.item]}>
                            <AntDesignIcon name='clockcircleo' size={ICON_SIZE} color={COLOR_GREY} /><Text style={styles.address}>{' '}{props.createdAt}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View>
                    <Text style={styles.title}>{props.title}</Text>
                    <CustomizeBodyPost content={props.description} />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => props.handleClickBtnSeeDetailEvent(props.id)}>
                        <View style={styles.bottomButton}>
                            <Text style={styles.txtBtn}>{TEXT_JOIN_SURVEY}</Text>
                            <AntDesignIcon name='right' size={ICON_SIZE} color={COLOR_WHITE} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 10,
        backgroundColor: COLOR_WHITE
    },
    leftContainer: {
        width: '15%',
    },
    rightContainer: {
        width: '85%',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    name: {
        fontWeight: 'bold',
        color: COLOR_BLACK,
        fontSize: 16,
        width: '95%',
    },
    menu: {
        width: '5%',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    textTypePost: {
        backgroundColor: COLOR_SUCCESS,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    itemType: {
        color: COLOR_WHITE,
        fontWeight: '300',
        fontSize: 14,
    },
    rightContainerBottom: {
        width: '95%',
    },
    rightContainerBottom3Info: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomButton: {
        flexDirection: 'row',
        backgroundColor: COLOR_BLUE_BANNER,
        padding: 8,
        alignItems: 'center',
        marginVertical: 5,
        width: '40%',
        borderRadius: 5,
        marginTop: 15,
    },
    item: {
        marginVertical: 2,
        color: COLOR_BLACK,
        fontWeight: "bold",
    },
    address: {
        color: COLOR_GREY
    },
    rightContainerTopTitle: {
        flexDirection: 'row',
    },
    contentContainer: {
    },
    title: {
        color: COLOR_BLACK,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 15
    },
    txtBtn: {
        color: COLOR_WHITE,
        paddingRight: 5,
    }
})