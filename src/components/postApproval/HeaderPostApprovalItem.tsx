import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios, { AxiosResponse } from 'axios'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import { RootStackParamList } from '../../App'
import { CREATE_NORMAL_POST_SCREEN, CREATE_RECRUITMENT_SCREEN, CREATE_SURVEY_SCREEN, PROFILE_SCREEN } from '../../constants/Screen'
import { TYPE_POST_RECRUITMENT, TYPE_POST_SURVEY } from '../../constants/StringVietnamese'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { useAppDispatch } from '../../redux/Hook'
import { useAcceptPostMutation, useDeletePostMutation, useGetPostRejectLogQuery } from '../../redux/Service'
import { setPostAcceptId, setPostDeleteId, setPostRejectLog } from '../../redux/Slice'
import { Data } from '../../types/Data'
import { PostRejectLogResponse } from '../../types/response/PostRejectLogResponse'
import { PostResponseModel } from '../../types/response/PostResponseModel'
import { UpdateNormalPost } from '../../types/UpdateNormalPost'
import { isRecruitmentPost, isSurveyPost, isTextImagePost } from '../../utils/PostHelper'
import DefaultAvatar from '../common/DefaultAvatar'
import { PostApprovalItemProps, POST_APPROVAL, POST_PENDING, POST_REJECT } from './PostApprovalItem'

const RECRUITMENT_BADGE_COLOR = '#999fac'
const SURVEY_BADGE_COLOR = '#00C9F4'
const TEXT_IMAGE_BADGE_COLOR = '#00A255'

export default function HeaderPostApprovalItem(props: PostApprovalItemProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const dispatch = useAppDispatch()
    const [acceptPost, acceptPostResponse] = useAcceptPostMutation()
    const [deletePost, deletePostResponse] = useDeletePostMutation()
    const t = useTranslation()

    let badgeColor = TEXT_IMAGE_BADGE_COLOR;
    let badgeContent = t('ModalPostRejectReason.default')

    if (props.post?.type === TYPE_POST_SURVEY) {
        badgeColor = SURVEY_BADGE_COLOR;
        badgeContent = t('ModalPostRejectReason.survey')
    } else if (props.post?.type === TYPE_POST_RECRUITMENT) {
        badgeColor = RECRUITMENT_BADGE_COLOR;
        badgeContent = t('ModalPostRejectReason.recruitment')
    }

    const onStartRejectedPost = (postId: number) => {
        dispatch(setPostRejectLog({
            postId: postId,
            content: ""
        }))
    }

    const onAcceptPost = (postId: number | undefined) => {
        acceptPost({
            postId: postId ?? -1
        })
    }

    const onRejectDetailsPress = (postId?: number) => {
        axios
            .get<void, AxiosResponse<Data<PostRejectLogResponse>>>(SERVER_ADDRESS + `api/approval/log/post/${postId}`)
            .then((response) => {
                if (response.status == 200) {
                    Alert.alert("Chi tiết", `${moment(response.data.data.createdAt).fromNow()}\n\n${response.data.data.content}`)
                }
            }).catch(err => console.log(err))
    }

    const onDeletePost = (postId?: number) => {
        if (postId) {
            deletePost({ postId: postId })
        }
    }

    const onUpdatePost = (post?: PostResponseModel) => {
        if (post) {
            if (isRecruitmentPost(post)) {
                navigation.navigate(CREATE_RECRUITMENT_SCREEN, { recruitmentPostId: post.id })
            } else if (isSurveyPost(post)) {
                navigation.navigate(CREATE_SURVEY_SCREEN, { surveyPostId: post.id })
            } else if (isTextImagePost(post)) {
                const updateNormalPost: UpdateNormalPost = {
                    postId: post.id,
                    content: post.content,
                    images: post.images
                }
                navigation.navigate(CREATE_NORMAL_POST_SCREEN, { updateNormalPost: updateNormalPost })
            }
        }
    }

    useEffect(() => {
        if (deletePostResponse.data) {
            dispatch(setPostDeleteId(props.post?.id))
            Alert.alert(t('ModalPostRejectReason.successDeleteMessage'), t('ModalPostRejectReason.successDeleteMessageContent'))
        }
    }, [deletePostResponse.data])

    useEffect(() => {
        if (acceptPostResponse.data) {
            dispatch(setPostAcceptId(props.post?.id))
            Alert.alert(t('ModalPostRejectReason.successAcceptMessage'), t('ModalPostRejectReason.acceptSuccessageMessage'))
        }
    }, [acceptPostResponse.data])

    const handleNavigateToProfileScreen = () => {
        console.log(props.post)
        if (props.post && props.post.user) {
            navigation.navigate(PROFILE_SCREEN, { userId: props.post.user.id, group: props.post.group.code })
        }
    }

    return (
        <View style={styles.body}>
            <Pressable onPress={() => handleNavigateToProfileScreen()}>
                {Boolean(props.post?.user?.image) ? (
                    <Image source={{ uri: SERVER_ADDRESS + 'api/images/' + props.post?.user?.image }} style={{ width: 45, height: 45, borderRadius: 999 }} />
                ) : (
                    <DefaultAvatar size={45} identifer={props.post?.user?.name ? props.post?.user.name[0] : ''} />
                )}
            </Pressable>

            <View style={styles.postInfoPrimaryWrapper}>
                <Text onPress={() => handleNavigateToProfileScreen()} style={styles.postPrimaryTitle}>{props.post?.user?.name ?? t('ModalPostRejectReason.isLoading')}</Text>
                <View style={styles.postInfoSecondaryWrapper}>
                    <Text>{props.post?.createdAt ? moment(props.post.createdAt).fromNow() : t('ModalPostRejectReason.isLoading')}</Text>
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
                        {
                            props.type === POST_APPROVAL
                            &&
                            <MenuOption
                                key={0}
                                onSelect={() => onAcceptPost(props.post?.id)} >
                                <View style={styles.menuTitle}>
                                    <Text style={styles.menuText}>{t('ModalPostRejectReason.acceptPostMenuItem')}</Text>
                                    {
                                        acceptPostResponse.isLoading &&
                                        <ActivityIndicator style={{ marginStart: 'auto' }} size={'small'} />
                                    }
                                </View>
                            </MenuOption>
                        }

                        {
                            props.type === POST_APPROVAL
                            &&
                            <MenuOption
                                key={0}
                                onSelect={() => onStartRejectedPost(props.post?.id ?? -1)} >
                                <Text style={styles.menuText}>{t('ModalPostRejectReason.rejectPostMenuItem')}</Text>
                            </MenuOption>
                        }

                        {
                            props.type === POST_REJECT
                            &&
                            <MenuOption
                                key={0}
                                onSelect={() => onRejectDetailsPress(props.post?.id)}>
                                <Text style={styles.menuText}>{t('ModalPostRejectReason.rejectDetails')}</Text>
                            </MenuOption>
                        }

                        {
                            (props.type === POST_PENDING || props.type === POST_REJECT)
                            &&
                            <MenuOption
                                key={0}
                                onSelect={() => onUpdatePost(props.post)}>
                                <Text style={styles.menuText}>{t('ModalPostRejectReason.pendingPostUpdate')}</Text>
                            </MenuOption>
                        }

                        {
                            (props.type === POST_PENDING || props.type === POST_REJECT)
                            &&
                            <MenuOption
                                key={0}
                                onSelect={() => onDeletePost(props.post?.id)}>
                                <Text style={[styles.menuText, { color: 'red' }]}>{t('ModalPostRejectReason.pendingPostDelete')}</Text>
                            </MenuOption>
                        }
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        marginStart: 15,
        flex: 1
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
        color: '#000',
        flex: 1,
        flexWrap: 'wrap'
    },
    menuTitle: {
        flexDirection: 'row'
    }
})