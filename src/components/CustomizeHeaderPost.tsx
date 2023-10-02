import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLOR_TEXT_CREATE_NORMAL_POST, COLOR_BLACK, COLOR_WHITE, COLOR_BLUE_BANNER, COLOR_BORDER } from '../constants/Color'


export interface HeaderPostProps {
    name: string,
    avatar: string,
    typeAuthor: string | null,
    available: boolean | null,
    timeCreatePost: string,
    type: string | null,
    role: number
}

// Constant
export const NUM_OF_LINES = 5
export const TEXT_AVAILABLE = 'Khả dụng'
export const TEXT_SEE_MORE = 'xem thêm'
export const TEXT_HIDE_LESS = 'ẩn bớt'
export const HEADER_ICON_SIZE = 15
export const BOTTOM_ICON_SIZE = 30

// get devices info 
const { width, height } = Dimensions.get('screen');

const CustomizeHeaderPost = (props: HeaderPostProps) => {
    // Get data 
    let post = props
    // Business post
    if (post.role === 0) {
        return (
            <View style={styles.wrapHeader}>
                {/* Avatar company */}
                <Image
                    style={styles.headerAvatar}
                    source={{ uri: post.avatar }} />
                <View style={styles.wrapLeftHeader}>
                    <View>
                        <View style={styles.headerCenterTop}>
                            {/* Name company */}
                            <Text
                                style={[styles.headerBusinessName, styles.headerItem]}>
                                {post.name}
                                <Text> </Text>
                                <IconAntDesign name='checkcircle' size={HEADER_ICON_SIZE} color={COLOR_BLUE_BANNER} style={styles.headerItem} />
                            </Text>
                            {/* Icon check authentications */}
                        </View>
                        <View style={styles.headerCenterTop}>
                            {/* Time created post */}
                            <Text style={[styles.headerCenterTimePost, styles.headerItem]}>{post.timeCreatePost} - {post.type}</Text>
                            {/* in ability? */}
                            <View style={[styles.headerCenterType, styles.headerItem]}><Text style={styles.headerTxt}>{post.available ? TEXT_AVAILABLE : null}</Text></View>
                            {/* Type author */}
                            <View style={styles.headerCenterType}>
                                <Text style={styles.headerTxt}>{post.typeAuthor}</Text>
                            </View>
                        </View>
                    </View>
                    {/* Menu 3 dot */}
                    <TouchableOpacity>
                        <IconEntypo name="dots-three-vertical" size={HEADER_ICON_SIZE} color={COLOR_BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
        )
        // Student post
    } else if (post.role == 1) {
        return (
            <View style={styles.wrapHeader}>
                <Image
                    style={styles.headerAvatar}
                    source={{ uri: post.avatar }} />
                <View style={styles.wrapLeftHeader}>
                    <View>
                        <View style={styles.headerCenterTop}>
                            {/* Name company */}
                            <Text
                                style={[styles.headerBusinessName, styles.headerItem]}>
                                {post.name}
                            </Text>
                        </View>
                        <View style={styles.headerCenterTop}>
                            {/* Time created post */}
                            <Text style={[styles.headerCenterTimePost, styles.headerItem]}>{post.timeCreatePost}</Text>
                        </View>
                    </View>
                    {/* Menu 3 dot */}
                    <TouchableOpacity>
                        <IconEntypo name="dots-three-vertical" size={HEADER_ICON_SIZE} color={COLOR_BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.wrapHeader}>
                {/* Avatar company */}
                <Image
                    style={styles.headerAvatar}
                    source={{ uri: post.avatar }} />
                <View style={styles.wrapLeftHeader}>
                    <View>
                        <View style={styles.headerCenterTop}>
                            {/* Name company */}
                            <Text
                                style={[styles.headerBusinessName, styles.headerItem]}>
                                {post.name}
                                {/* Distant */}
                                <Text> </Text>
                                <IconAntDesign name='checkcircle' size={HEADER_ICON_SIZE} color={COLOR_BLUE_BANNER} />
                            </Text>
                            {/* Icon check authentications */}
                        </View>
                        <View style={styles.headerCenterTop}>
                            {/* Time created post */}
                            <Text style={[styles.headerCenterTimePost, styles.headerItem]}>{post.timeCreatePost}</Text>
                        </View>
                    </View>
                    {/* Menu 3 dot */}
                    <TouchableOpacity>
                        <IconEntypo name="dots-three-vertical" size={HEADER_ICON_SIZE} color={COLOR_BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
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
        alignItems: 'center'
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
    wrapLeftHeader: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerItem: {
        marginRight: 5,
    },
    bodyTxtSeeMore: {
        color: COLOR_TEXT_CREATE_NORMAL_POST
    },
})
export default CustomizeHeaderPost