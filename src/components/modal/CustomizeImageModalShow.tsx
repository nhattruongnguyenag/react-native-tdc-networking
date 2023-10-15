import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image } from 'react-native'
import React from 'react'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR_BLACK, COLOR_MODAL, COLOR_WHITE } from '../../constants/Color';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/SystemDimensions';
import CustomizeLayoutImageNotify from '../post/CustomizeLayoutImageNotify';
import { SERVER_ADDRESS } from '../../constants/SystemConstant';

export interface CustomizeImageModalShowType {
    closeModal: () => void,
    data: any,
    authorInfo: any,
    handleCheckImageHaveError: (id: string) => boolean,
    handleClickIntoUserNameOrAvatarEvent: () => void
}

export default function CustomizeImageModalShow(props: CustomizeImageModalShowType) {
    return (
        <>
            <TouchableOpacity
                onPress={() => props.closeModal()
                }
                style={styles.wrapperContent}>
                <Pressable
                    style={styles.containerContent}>
                    {/* Header */}
                    <View style={styles.wrapHeaderModalImage}>
                        <TouchableOpacity style={styles.userInfoRight}
                            onPress={() => props.handleClickIntoUserNameOrAvatarEvent()
                            }>
                            <Image
                                style={styles.avatar}
                                source={{  uri: SERVER_ADDRESS + `api/images/${props.authorInfo?.avatar}` }}
                            />
                            <Text style={styles.useName} numberOfLines={1}>{props.authorInfo?.name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.closeModal()}>
                            <IconAntDesign name='close' size={20} color={COLOR_BLACK} />
                        </TouchableOpacity>
                    </View>

                    {
                        props.handleCheckImageHaveError(props.data) ? <>
                            <CustomizeLayoutImageNotify />
                        </> : <>
                            <Image
                                style={styles.showMainImage}
                                source={{ uri: SERVER_ADDRESS + `api/images/${props.data}` }} />
                        </>
                    }
                </Pressable>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    wrapperContent: {
        width: WINDOW_WIDTH,
        backgroundColor: COLOR_MODAL,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerContent: {
        width: WINDOW_WIDTH * 0.8,
        height: WINDOW_HEIGHT * 0.6,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: COLOR_WHITE,
        overflow: 'hidden'
    },
    showMainImage: {
        width: '100%',
        height: '88%',
    },
    btnClose: {
        position: 'absolute',
        top: 10,
        zIndex: 999,
        right: 10
    },
    wrapHeaderModalImage: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 2,
        zIndex: 999,
        height: '12%',
        backgroundColor: COLOR_WHITE
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLOR_BLACK
    },
    userInfoRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    useName: {
        color: COLOR_BLACK,
        marginLeft: 10,
        fontWeight: 'bold',
        width: '75%',
    }

})