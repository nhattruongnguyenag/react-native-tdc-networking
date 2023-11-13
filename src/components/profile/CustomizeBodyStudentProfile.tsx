import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLOR_BLACK, COLOR_BTN_BLUE, COLOR_GREY_FEEBLE, COLOR_WHITE } from '../../constants/Color'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconFeather from 'react-native-vector-icons/Feather'
import { CALL_ACTION, FOLLOW_ACTION, MENU_CLICK_ACTION, MESSENGER_ACTION } from '../../constants/Variables'

interface StudentProfileType {
    handleClickButtonEvent: (flag: number) => void,
    position: string,
    phone: string,
    email: string,
    numberPost: number,
    name: string
}
export default function CustomizeBodyStudentProfile(props: Readonly<StudentProfileType>) {
    return (
        <View style={styles.containerInfo}>
            {/* Name */}
            <Text style={[styles.name, styles.paddingVertical]}>{props.name}</Text>
            {/* Btn action */}
            <View style={[styles.buttonContainer, styles.paddingBottom]}>
                <TouchableOpacity
                    onPress={() => props.handleClickButtonEvent(MESSENGER_ACTION)}
                    style={[styles.buttonAction,
                    styles.marginRightBtnAction]}
                >
                    <IconFontisto name='messenger' size={20} color={COLOR_WHITE} />
                    <Text style={styles.txtContentBtn}>
                        Gửi tin nhắn
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.handleClickButtonEvent(CALL_ACTION)}
                    style={[styles.buttonAction,
                    styles.marginRightBtnAction]}
                >
                    <IconEntypo name='phone' size={20} color={COLOR_WHITE} />
                    <Text style={styles.txtContentBtn}>
                        Gọi điện
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.handleClickButtonEvent(FOLLOW_ACTION)}
                    style={[styles.buttonAction,
                    styles.marginRightBtnAction]}
                >
                    <IconIonicons name='person-add' size={20} color={COLOR_WHITE} />
                    <Text style={styles.txtContentBtn}>
                        Theo dõi
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.handleClickButtonEvent(MENU_CLICK_ACTION)}
                    style={[
                        styles.marginRightBtnAction, styles.btnOption]}
                >
                    <IconEntypo name='dots-three-horizontal' size={20} color={COLOR_BLACK} />
                </TouchableOpacity>
            </View>
            {/* Info */}
            <View>
                <View style={styles.infoContainer}>
                    <IconIonicons
                        style={styles.iconInfo}
                        name='bag-remove-outline' size={20} color={COLOR_BLACK} />
                    <Text style={styles.textInfo}>Chức vụ: Sinh viên</Text>
                </View>
                <View style={styles.infoContainer}>
                    <IconFeather
                        style={styles.iconInfo}
                        name='phone-call' size={20} color={COLOR_BLACK} />
                    <Text style={styles.textInfo}>Điện thoại: {props.phone}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <IconFontisto
                        style={styles.iconInfo}
                        name='email' size={20} color={COLOR_BLACK} />
                    <Text style={styles.textInfo}>Email: {props.email}</Text>
                </View>
            </View>
            {/* Number post */}
            <Text style={[styles.paddingVertical]}>Bài viết ({props.numberPost})</Text>
            {/* Post */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_WHITE
    },
    imageBackground: {
        aspectRatio: 2 / 1,
        objectFit: 'cover'
    },
    imageAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        position: 'absolute',
        bottom: 10,
        left: 10,
        borderWidth: 2,
        borderColor: COLOR_WHITE,
        objectFit: 'cover'
    },
    containerInfo: {
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    name: {
        color: COLOR_BLACK,
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonAction: {
        backgroundColor: COLOR_BTN_BLUE,
        alignSelf: 'flex-start',
        paddingHorizontal: 5,
        paddingVertical: 6,
        borderRadius: 7,
        flexDirection: 'row',
    },
    txtContentBtn: {
        color: COLOR_WHITE,
        paddingLeft: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    paddingVertical: {
        paddingVertical: 7,
        color: COLOR_BLACK,
        fontWeight: 'bold'
    },
    paddingBottom: {
        paddingBottom: 7
    },
    itemInfo: {
        paddingVertical: 1,
    },
    marginRightBtnAction: {
        marginRight: 15,
    },
    infoContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        paddingVertical: 3,
    },
    iconInfo: {
        marginRight: 5,
        width: '5%',
    },
    textInfo: {
        color: COLOR_BLACK,
        width: '95%',
    },
    btnOption: {
        backgroundColor: COLOR_GREY_FEEBLE,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 7,
        flexDirection: 'row',
    },
})