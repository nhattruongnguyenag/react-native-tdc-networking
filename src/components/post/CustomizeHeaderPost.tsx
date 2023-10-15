import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR_BLACK, COLOR_WHITE, COLOR_BLUE_BANNER, COLOR_BORDER } from '../../constants/Color'
import { SERVER_ADDRESS } from '../../constants/SystemConstant';

export interface HeaderPostPropsType {
    name: string,
    avatar: string,
    typeAuthor: string | null,
    available: boolean | null,
    timeCreatePost: string,
    type: string | null,
    role: number,
    handleClickIntoAvatarAndNameAndMenuEvent: (flag: number) => void
}

// Constant
export const NUM_OF_LINES = 5
export const HEADER_ICON_SIZE = 15
export const BOTTOM_ICON_SIZE = 30


const CustomizeHeaderPost = (props: HeaderPostPropsType) => {

    // Get data 
    let post = props

    return (
        <View style={[styles.wrapHeader]}>
            <View style={styles.wrapAvatar}>
                <TouchableOpacity
                    // Go to profile screen
                    onPress={() => props.handleClickIntoAvatarAndNameAndMenuEvent(0)}
                >
                    <Image
                        style={styles.headerAvatar}
                        source={{ uri: SERVER_ADDRESS + `api/images/${post.avatar}` }} />
                </TouchableOpacity>
            </View>
            <View style={styles.wrapName}>
                <TouchableOpacity
                    // Go to profile screen
                    onPress={() => props.handleClickIntoAvatarAndNameAndMenuEvent(0)}
                >
                    {/* Name */}
                    <Text
                        style={[styles.headerBusinessName, styles.headerItem]}>
                        {post.name}
                        <Text> </Text>
                        {
                            post.role !== 1 && <IconAntDesign name='checkcircle' size={HEADER_ICON_SIZE} color={COLOR_BLUE_BANNER} style={styles.headerItem} />
                        }
                    </Text>
                </TouchableOpacity>
                <View style={styles.headerCenterTop}>
                    {/* Time created post */}
                    <Text style={[styles.headerCenterTimePost, styles.headerItem]}>{post.timeCreatePost}</Text>
                    {/* Type author */}
                    {
                        post.role === 0 && <View style={styles.headerCenterType}>
                            <Text style={styles.headerTxt}>{post.typeAuthor}</Text>
                        </View>
                    }
                </View>
            </View>
            <View style={styles.wrapMenu}>
                <TouchableOpacity
                    onPress={() => props.handleClickIntoAvatarAndNameAndMenuEvent(1)}>
                    <IconEntypo name="dots-three-vertical" size={HEADER_ICON_SIZE} color={COLOR_BLACK} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        backgroundColor: COLOR_WHITE,
        marginBottom: 0.5,
    },
    wrapHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        width: '100%'
    },
    headerAvatar: {
        width: 43,
        height: 43,
        borderRadius: 22.5
    },
    headerBusinessName: {
        fontSize: 16,
        color: COLOR_BLACK,
        fontWeight: 'bold',
    },
    headerCenterTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerCenterType: {
        backgroundColor: COLOR_BORDER,
        paddingHorizontal: 10,
        height: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerCenterTimePost: {
        fontWeight: 'normal',
        fontSize: 13,
        color: COLOR_BLACK,
        marginTop: 4,
    },
    headerTxt: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLOR_BLACK
    },
    headerItem: {
        marginRight: 5,
    },
    wrapAvatar: {
        width: '15%'
    },
    wrapName: {
        width: '80%'
    },
    wrapMenu: {
        width: '5%'
    }
})
export default CustomizeHeaderPost