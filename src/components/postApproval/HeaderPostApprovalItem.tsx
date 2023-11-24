import moment from 'moment'
import React, { useEffect } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import { TYPE_POST_RECRUITMENT, TYPE_POST_SURVEY } from '../../constants/StringVietnamese'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { useAppDispatch } from '../../redux/Hook'
import { useAcceptPostMutation } from '../../redux/Service'
import { setPostRejectLog } from '../../redux/Slice'
import DefaultAvatar from '../common/DefaultAvatar'
import { PostApprovalItemProps } from './PostApprovalItem'

// SERVER_ADDRESS + `api/images/`
const RECRUITMENT_BADGE_COLOR = '#999fac'
const SURVEY_BADGE_COLOR = '#00C9F4'
const TEXT_IMAGE_BADGE_COLOR = '#00A255'

export default function HeaderPostApprovalItem(props: PostApprovalItemProps) {
    const dispatch = useAppDispatch()
    const [acceptPost, acceptPostResponse] = useAcceptPostMutation()

    let badgeColor = TEXT_IMAGE_BADGE_COLOR
    let badgeContent = "Mặc định"

    if (props.post?.type === TYPE_POST_SURVEY) {
        badgeColor = SURVEY_BADGE_COLOR
        badgeContent = "Khảo sát"
    } else if (props.post?.type === TYPE_POST_RECRUITMENT) {
        badgeColor = RECRUITMENT_BADGE_COLOR
        badgeContent = "Tuyển dụng"
    }

    const onStartRejectedPost = (postId: number) => {
        dispatch(setPostRejectLog({
            postId: postId,
            content: ""
        }))
    }

    const onAcceptPost = (postId: number | undefined) => {
        console.log(postId)
        acceptPost({
            postId: postId ?? -1
        })
    }

    useEffect(() => {
        if (acceptPostResponse.data) {
            Alert.alert("Thành công !!!", "Duyệt bài viết thành công")
        }
    }, [acceptPostResponse.data])

    return (
        <View style={styles.body}>
            {Boolean(props.post?.user.image) ? (
                <Image source={{ uri: SERVER_ADDRESS + 'api/images/' + props.post?.user.image }} style={{ width: 45, height: 45, borderRadius: 999 }} />
            ) : (
                <DefaultAvatar size={45} identifer={props.post?.user.name ? props.post?.user.name[0] : ''} />
            )}

            <View style={styles.postInfoPrimaryWrapper}>
                <Text style={styles.postPrimaryTitle}>{props.post?.user.name ?? 'Đang tải...'}</Text>
                <View style={styles.postInfoSecondaryWrapper}>
                    <Text>{props.post?.createdAt ? moment(props.post.createdAt).fromNow() : 'Đang tải...'}</Text>
                    <View style={[styles.postTypeBadge, { backgroundColor: badgeColor }]}>
                        <Text style={styles.postTypeText}>
                            {badgeContent}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.menuOptionWrapper}>
                <Menu>
                    <MenuTrigger style={styles.menuTrigger}>
                        <FontAwesome6Icon name='ellipsis-vertical' size={18} color={'#000'} />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={styles.menuOption} >
                        <MenuOption
                            key={0}
                            onSelect={() => onAcceptPost(props.post?.id)} >
                            <View style={styles.menuTitle}>
                                <Text style={styles.menuText}>Duyệt bài viết</Text>
                                {
                                    acceptPostResponse.isLoading &&
                                    <ActivityIndicator style={{ marginStart: 'auto' }} size={'small'} />
                                }
                            </View>
                        </MenuOption>

                        <MenuOption
                            key={0}
                            onSelect={() => onStartRejectedPost(props.post?.id ?? -1)} >
                            <Text style={styles.menuText}>Từ chối bài viết</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuTrigger: {
        width: 15,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    menuText: {
        marginVertical: 5,
        fontSize: 14,
        color: '#000'
    },
    menuOption: {
        marginLeft: -30,
        padding: 5
    },
    postTypeText: {
        fontSize: 12,
        color: '#fff'
    },
    postTypeBadge: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 7,
        marginStart: 10
    },
    postInfoPrimaryWrapper: {
        marginStart: 15
    },
    postInfoSecondaryWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    menuOptionWrapper: {
        marginStart: 'auto'
    },
    postPrimaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    menuTitle: {
        flexDirection: 'row'
    }
})