import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BACKGROUND_COLOR_BOTTOM_ICON, COLOR_BLACK, COLOR_BOTTOM_AVATAR, COLOR_WHITE } from '../constants/Color'
import { useAppDispatch } from '../redux/Hook';
import { openModalComments, openModalUserReaction } from '../redux/Slice';
import { commentData } from './DataBase'
import { ModalComments } from '../types/ModalComments';
//  Definition props
export interface BottomPost {
    id: number,
    role: number,
    handleClickBottomBtnEvent: (a: number | null) => void,
    isLike: boolean,
    isComment: boolean,
    comments: {
        id: number
        name: string
        avatar: string
        content: string
        timeCreated: string
        commentChildren: {
            id: number
            name: string
            avatar: string
            content: string
            timeCreated: string
        }[]
    }[],
    likes:
    {
        id: number,
        name: string,
        avatar: string
    }[],

}

// Constant
const BOTTOM_ICON_SIZE = 30
const TEXT_LIKE_BY = 'Thích bởi'
const CustomizeBottomPost = (props: BottomPost) => {
    const dispatch = useAppDispatch();
    const numberUserReacted: number = props.likes?.length
    //  Function
    const handleClickIntoBtnIconComments = () => {
        dispatch(openModalComments({
            id: props.id,
            commentFather: props.comments
        }))
    }
    const handleClickIntoListUserReactions = () => {
        dispatch(openModalUserReaction({
            likes: props.likes
        }))
    }
    return (
        <View style={styles.wrapBottom}>
            <View style={[styles.wrapBottomLeft, styles.row]}>
                <View style={styles.wrapIconAndTextBottom}>
                    <TouchableOpacity>
                        {
                            !props.isLike ?
                                (
                                    <IconAntDesign name='like2' size={BOTTOM_ICON_SIZE} color={COLOR_BLACK} />
                                )
                                :
                                (
                                    <IconAntDesign name='like1' size={BOTTOM_ICON_SIZE} color={COLOR_BLACK} />
                                )
                        }
                    </TouchableOpacity>
                    <Text>
                        {
                            props.likes?.length
                        }
                    </Text>
                </View>
                <View style={[styles.wrapIconAndTextBottom, styles.iconRight]}>
                    <TouchableOpacity
                        onPress={() => handleClickIntoBtnIconComments()}
                    >
                        {
                            !props.isComment ?
                                (
                                    <IconMaterialCommunityIcons name='comment-outline' size={BOTTOM_ICON_SIZE} color={COLOR_BLACK} />
                                )
                                :
                                (
                                    <IconMaterialCommunityIcons name='comment' size={BOTTOM_ICON_SIZE} color={COLOR_BLACK} />
                                )
                        }
                    </TouchableOpacity>
                    <Text>
                        {
                            props.likes?.length
                        }
                    </Text>
                </View>
            </View>
            <View style={[styles.wrapBottomRight, styles.row]}>
                <Text style={styles.bottomWrapRightText}>
                    {TEXT_LIKE_BY}
                </Text>
                {
                    numberUserReacted > 3 ?
                        <TouchableOpacity
                            onPress={() => handleClickIntoListUserReactions()}
                            style={styles.avatarUserReactedContainer}>
                            <Image
                                style={[styles.avatarUserReacted, styles.avatarUserReactedOne, styles.absolute]}
                                source={{ uri: props.likes[0].avatar }}
                            />
                            <Image
                                style={[styles.avatarUserReacted, styles.avatarUserReactedTwo, styles.absolute]}
                                source={{ uri: props.likes[1].avatar }}
                            />
                            <Image
                                style={[styles.avatarUserReacted, styles.avatarUserReactedThree, styles.absolute]}
                                source={{ uri: props.likes[2].avatar }}
                            />
                            <View style={[styles.avatarUserReacted, styles.numberUserReactedRemaining, styles.absolute]}>
                                <Text style={styles.txtNumberUserReactedRemaining}>
                                    +{numberUserReacted - 3}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <>

                            {
                                props.likes.map((item, index) => (
                                    <TouchableOpacity
                                        onPress={() => handleClickIntoListUserReactions()}
                                        key={item.id}
                                    >
                                        <Image
                                            style={[styles.avatarUserReacted]}
                                            source={{ uri: item.avatar }}
                                        />
                                    </TouchableOpacity>
                                ))
                            }
                        </>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // Bottom
    wrapBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    wrapIconAndTextBottom: {
        width: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerCenter: {

    },
    wrapBottomChild: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        backgroundColor: BACKGROUND_COLOR_BOTTOM_ICON,
        borderRadius: 15
    },
    containerContent: {
        paddingVertical: 10,
    },
    row: {
        flexDirection: 'row'
    },
    iconRight: {
        marginLeft: 20
    },
    wrapBottomLeft: {
        width: '50%',
    },
    wrapBottomRight: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    avatarUserReacted: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLOR_WHITE,
    },
    absolute: {
        position: 'absolute',
    },
    avatarUserReactedOne: {
        right: '70%'
    },
    avatarUserReactedTwo: {
        right: '48%'
    },
    avatarUserReactedThree: {
        right: '24%'
    },
    numberUserReactedRemaining: {
        right: 0,
        backgroundColor: COLOR_BOTTOM_AVATAR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomWrapRightText: {
        color: 'black',
        marginRight: 5
    },
    txtNumberUserReactedRemaining: {
        color: 'black',
    },
    avatarUserReactedContainer: {
        width: 100,
        height: '100%',
    }
})
export default CustomizeBottomPost