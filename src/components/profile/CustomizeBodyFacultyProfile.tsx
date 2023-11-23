import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLOR_BLACK, COLOR_BTN_BLUE, COLOR_GREY_FEEBLE, COLOR_WHITE } from '../../constants/Color'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { FOLLOW_ACTION, MENU_CLICK_ACTION, MESSENGER_ACTION } from '../../constants/Variables'
import { Student } from '../../types/Student'
import { Faculty } from '../../types/Faculty'
import { Business } from '../../types/Business'
import { TEXT_CHAT, TEXT_FOLLOW, TEXT_PLACEHOLDER_ADDRESS, TEXT_PLACEHOLDER_PHONE, TEXT_SUBJECT_POST, TEXT_UN_FOLLOW, TEXT_WORKING_TIME } from '../../constants/StringVietnamese'


interface FacultyProfileType {
    isFollow: boolean,
    handleClickButtonEvent: (flag: number) => void,
    timeWork: string,
    address: string,
    phone: string,
    email: string,
    name: string,
    numberPost: number,
    isSameUser: boolean,
}


export default function CustomizeBodyFacultyProfile(props: Readonly<FacultyProfileType>) {
    return (
        <View style={styles.containerInfo}>
            {/* Name */}
            <Text style={[styles.name, styles.paddingVertical]}>{props.name}</Text>
            {/* Btn action */}
            <View style={[styles.buttonContainer, styles.paddingBottom]}>
                {
                    !props.isSameUser && <TouchableOpacity
                        onPress={() => props.handleClickButtonEvent(MESSENGER_ACTION)}
                        style={[styles.buttonAction,
                        styles.marginRightBtnAction]}
                    >
                        <IconFontisto name='messenger' size={20} color={COLOR_WHITE} />
                        <Text style={styles.txtContentBtn}>
                            {TEXT_CHAT}
                        </Text>
                    </TouchableOpacity>
                }
                {
                    !props.isSameUser && <TouchableOpacity
                        onPress={() => props.handleClickButtonEvent(FOLLOW_ACTION)}
                        style={[styles.buttonAction,
                        styles.marginRightBtnAction]}
                    >
                        {
                            props.isFollow ? <IconIonicons name='person-remove-sharp' size={20} color={COLOR_WHITE} /> : <IconIonicons name='person-add' size={20} color={COLOR_WHITE} />
                        }
                        <Text style={styles.txtContentBtn}>
                            {
                                props.isFollow ? TEXT_UN_FOLLOW : TEXT_FOLLOW
                            }
                        </Text>
                    </TouchableOpacity>
                }
                {
                    props.isSameUser && <TouchableOpacity
                        onPress={() => props.handleClickButtonEvent(MENU_CLICK_ACTION)}
                        style={[
                            styles.marginRightBtnAction, styles.btnOption]}
                    >
                        <IconEntypo name='dots-three-horizontal' size={20} color={COLOR_BLACK} />
                    </TouchableOpacity>
                }
            </View>
            {/* Info */}
            <View>
                <View style={styles.infoContainer}>
                    <IconIonicons
                        style={styles.iconInfo}
                        name='time-outline' size={20} color={COLOR_BLACK} />
                    <Text style={styles.textInfo}>{TEXT_WORKING_TIME}: {props.timeWork}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <IconEvilIcons
                        style={styles.iconInfo}
                        name='location' size={20} color={COLOR_BLACK} />
                    <Text style={styles.textInfo}>{TEXT_PLACEHOLDER_ADDRESS}: {props.address}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <IconFeather
                        style={styles.iconInfo}
                        name='phone-call' size={20} color={COLOR_BLACK} />
                    <Text style={styles.textInfo}>{TEXT_PLACEHOLDER_PHONE}: {props.phone}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <IconFontisto
                        style={styles.iconInfo}
                        name='email' size={20} color={COLOR_BLACK} />
                    <Text style={styles.textInfo}>Email: {props.email}</Text>
                </View>
            </View>
            {/* Number post */}
            <Text style={[styles.paddingVertical]}>{TEXT_SUBJECT_POST} ({props.numberPost})</Text>
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
        paddingHorizontal: 10,
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