import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { COLOR_BLACK, COLOR_BLUE_BANNER, COLOR_BUTTON, COLOR_GREY, COLOR_GREY_FEEBLE } from '../../constants/Color'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import DefaultAvatar from '../common/DefaultAvatar'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'

interface CustomizeCommentType {
    textDelete: string,
    textReply: string,
    tagName: any,
    userId: number | undefined,
    authorCommentId: number,
    type: number,
    id: number,
    name: string,
    content: string,
    avatar: string,
    timeCreated: string,
    textCommentOfAuthor: string,
    userCreatedPostId: number,
    handleClickToCommentReplyEvent: (id: number) => void,
    handleClickToDeleteCommentsEvent: (idComments: number) => void
    handleClickToAvatarAndName: (userId: number) => void
}

const CustomizeComment = (props: CustomizeCommentType) => {

    return props.type === 0 ?
        (<View style={styles.containerType0}>
            <TouchableOpacity
                onPress={() => props.handleClickToAvatarAndName(props.authorCommentId)}
            >
                {
                    Boolean(props.avatar) ?
                        <Image
                            style={styles.avatarType0}
                            source={{ uri: SERVER_ADDRESS + `api/images/${props.avatar}` }}
                        />
                        :
                        <DefaultAvatar size={43} identifer={props.name[0]} />

                }
            </TouchableOpacity>
            <View style={styles.wrapBody}>
                <TouchableOpacity
                    onPress={() => props.handleClickToAvatarAndName(props.authorCommentId)}
                >
                    <Text style={styles.name}>
                        {props.name} {' '}
                        <Text style={styles.textIdentifyAuthor}>
                            {
                                props.userCreatedPostId === props.authorCommentId && <Text>  <MaterialCommunityIconsIcon name='microphone-variant' color={COLOR_BLUE_BANNER} size={15} />{' '}{props.textCommentOfAuthor}</Text>
                            }
                        </Text>
                    </Text>
                </TouchableOpacity>
                <Text style={styles.content}>
                    {
                        props.content
                    }
                </Text>
                <View style={styles.wrapBodyBottom}>
                    <Text style={styles.timeCreated}>{props.timeCreated}</Text>
                    <TouchableOpacity
                        onPress={() => props.handleClickToCommentReplyEvent(props.id)}
                    >
                        <Text style={styles.reply}>{props.textReply}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.handleClickToDeleteCommentsEvent(props.id)}
                    >
                        {
                            props.userId === props.authorCommentId && <Text style={styles.reply}>{props.textDelete}</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>)
        :
        (<View style={styles.containerType1}>
            <TouchableOpacity
                onPress={() => props.handleClickToAvatarAndName(props.authorCommentId)}
            >
                {
                    Boolean(props.avatar) ?
                        <Image
                            style={styles.avatarType1}
                            source={{ uri: SERVER_ADDRESS + `api/images/${props.avatar}` }} />
                        :
                        <DefaultAvatar size={30} identifer={props.name[0]} />
                }

            </TouchableOpacity>
            <View style={styles.wrapBody}>
                <TouchableOpacity
                    onPress={() => props.handleClickToAvatarAndName(props.authorCommentId)}
                >
                    <Text style={styles.name}>
                        {props.name}
                        <Text style={styles.textIdentifyAuthor}>
                            {
                                props.userCreatedPostId === props.authorCommentId && <Text>  <MaterialCommunityIconsIcon name='microphone-variant' color={COLOR_BLUE_BANNER} size={15} />{' '}{props.textCommentOfAuthor}</Text>
                            }
                        </Text>
                    </Text>
                </TouchableOpacity>
                <Text style={styles.content}>
                    <Text style={styles.tagName}>@{props.tagName} </Text>
                    {
                        props.content
                    }
                </Text>
                <View style={styles.wrapBodyBottom}>
                    <Text style={styles.timeCreated}>{props.timeCreated}</Text>
                    <TouchableOpacity
                        onPress={() => props.handleClickToCommentReplyEvent(props.id)}
                    >
                        <Text style={styles.reply}>{props.textReply}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.handleClickToDeleteCommentsEvent(props.id)}
                    >
                        {
                            props.userId === props.authorCommentId && <Text style={styles.reply}>{props.textDelete}</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>)

}

const styles = StyleSheet.create({
    containerType0: {
        flexDirection: "row", margin: 10
    },
    containerType1: {
        flexDirection: "row", marginHorizontal: 50, marginVertical: 5
    },
    avatarType0: {
        width: 40, height: 40, borderRadius: 20
    },
    avatarType1: {
        width: 30, height: 30, borderRadius: 15
    },
    name: {
        color: COLOR_BLACK, fontWeight: 'bold'
    },
    content: {
        color: COLOR_BLACK, marginVertical: 5
    },
    wrapBody: {
        paddingLeft: 5,
        width: '90%'
    },
    wrapBodyBottom: {
        flexDirection: 'row'
    },
    timeCreated: {
        color: COLOR_GREY
    },
    reply: {
        color: COLOR_BLACK, marginLeft: 20, fontWeight: 'bold'
    },
    tagName: {
        color: COLOR_BUTTON
    },
    textIdentifyAuthor: {
        color: COLOR_BLUE_BANNER,
        fontWeight: '100'
    }
})
export default memo(CustomizeComment)
