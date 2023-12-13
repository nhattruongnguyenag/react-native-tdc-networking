import { View, Text, Pressable, StyleSheet, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState, useTransition } from 'react'
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu'
import Icon1 from 'react-native-vector-icons/Entypo'
import { useTranslation } from 'react-multi-lang';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { PROFILE_SCREEN } from '../../constants/Screen';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../constants/SystemConstant';
import { useAppSelector } from '../../redux/Hook';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { User } from '../../types/User';
import { Avatar } from 'react-native-paper';
import DefaultAvatar from '../common/DefaultAvatar';

export interface NotificatonsType {
    id: any
    status: string
    dataValue: any
    type: string
    createdAt: any
    content: string
    userInteracted: any
    handleItem: (id: number) => void;
    handleIsRead: (id: number) => void;
    handleDelNotification: (id: number) => void;
}

export interface Value {
    header: string
    body: string
    image: string
    group: string
    defaultImage: string
    time: string
}

export default function NotificationItem(props: NotificatonsType) {
    const t = useTranslation()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [isMenuOpen, setMenuOpen] = useState(false)
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const [use, setUse] = useState([])
    const [value, setValue] = useState<Value>({
        header: '',
        body: '',
        image: '',
        group: '',
        defaultImage: '',
        time: ''
    })

    useEffect(() => {
        checkType()
    }, [])
    const checkType = () => {
        switch (props.type) {
            // Thong bao dang ky thanh cong
            case 'resgister_success':
                // return <Text>Bạn đã đăng ký thành công!</Text>

                break
            // THong báo thay đổi mk
            case 'change_password_success':
                setValue({ ...value, header: "bbbbbbbbbbbbbbb" })
                break
            // Cập nhật bài viết cá nhân
            case 'update_post':
                return <></>
                break
            // Doanh nghiệp đăng khảo sát
            case 'create_survey':
                return <Text></Text>
                break
            // Bài viết đã lưu
            case 'save_post':
                return <Text></Text>
                break
            // Người dùng like bài viết của mình
            case 'user_like_post':
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name,
                    header: props.userInteracted.name,
                    body: " đã thích bài viết của bạn",
                    image: props.userInteracted.image,
                    group: props.dataValue.group.name,
                    time: props.createdAt
                })
                break
            // Người dùng comment bài viết của mình
            case 'user_comment_post':
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name,
                    header: props.userInteracted.name, body: " đã bình luận bài viết của bạn",
                    image: props.userInteracted.image,
                    group: props.dataValue.group.name,
                    time: props.createdAt
                })
                break
            // Trả lời comment của mình trong bài viết
            case 'user_reply_comment':
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name,
                    header: props.userInteracted.name, body: " đã trả lời bình luận của bạn",
                    image: props.userInteracted.image,
                    group: props.dataValue.group.name,
                    time: props.createdAt
                })
                break
            // Người trả lời khảo sát của mình
            case 'user_conduct_survey':
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name,
                    header: props.userInteracted.name, body: " đã thực hiện khảo sát của bạn",
                    image: props.userInteracted.image,
                    group: props.dataValue.group.name,
                    time: props.createdAt
                })
                break
            // Bài viết không được duyệt
            case 'post_log':
                console.log(props.dataValue.content.length)
                setValue({
                    ...value,
                    defaultImage: 'admin',
                    header: '',
                    body: 'Bài viết của bạn đã bị từ chối vì ' + '" ' + (props.dataValue.content.length > 64 ? `${props.dataValue.content.substring(0, 64)}...` : props.dataValue.content) + ' "',
                    image: '',
                    group: props.dataValue.group.name,
                    time: props.createdAt
                })
                break
            // Bài viết đã được duyệt
            case 'accept_post':
                setValue({
                    ...value,
                    defaultImage: 'admin',
                    header: '',
                    body: "Bài viết của bạn đã được duyệt",
                    image: '',
                    group: props.dataValue.group.name,
                    time: props.createdAt
                })
                break
            // Cập nhật trang cá nhân 
            case 'user_update':
                setValue({
                    ...value, defaultImage: 'admin', 
                    header: '', 
                    body: "Bạn vừa cập nhật thông tin tài khoản thành công",
                    image: '',
                    group: '',
                    time:  props.createdAt
                })
                break
            // Có người follow mình
            case 'user_follow':
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name,
                    header: props.userInteracted.name,
                    body: " vừa theo dõi bạn",
                    image: props.userInteracted.image,
                    group: '',
                    time: props.createdAt
                })
                break
            // Thay đổi ngôn ngữ
            case 'user_change_language':
                setValue({
                    ...value, defaultImage: 'admin', 
                    header: '', 
                    body: "Bạn vừa thay đổi thành công",
                    image: '',
                    group: '',
                    time:  props.createdAt
                })
                break
            // Thông báo cho người nộp tuyển dụng
            case 'user_apply_job':
                return <Text></Text>
                break
            // Thông báo cho người đăng tuyển dụng có người tuyển dụng (Bài đăng tuyển dụng của mình)
            case 'user_apply_job':
                return <Text></Text>
                break
            default: <></>
                break
        }
    }
    return (
        <View>
            <Pressable
                onPress={() => props.handleItem(props.id)}
                style={[styles.item, { backgroundColor: props.status === '1' ? '#ffffff' : '#f3f9ff' }]}
            >
                <View style={styles.cont}>
                    {value.image != '' ? (
                        <Image style={styles.image} source={{ uri: SERVER_ADDRESS + 'api/images/' + value.image }} />
                    ) : (
                        value.defaultImage == 'admin' ?
                            <Image style={styles.image} source={require('../../assets/splash/logo.png')} /> :
                            <DefaultAvatar size={70} identifer={value.defaultImage[0]} />
                    )}
                    <View style={styles.content}>
                        <Text style={[styles.name, { color: props.status === '1' ? '#a9a9a9' : '#000000' }]}>
                            <Text style={styles.nameTxt}>{value.header}</Text>
                            {value.body}
                            {value.group != '' ? ' trong' : '.'}
                            <Text style={styles.nameTxt}> {value.group != '' ? (value.group) + '.' : ''}</Text>
                        </Text>
                        {/* {props.content.length > 150 ? `${props.content.substring(0, 150)}...` : props.content} */}
                        <Text style={styles.tg}>{moment(value.time).fromNow()}</Text>
                    </View>
                </View>
                <Menu style={styles.menu} key={props.id} onOpen={() => setMenuOpen(true)} onClose={() => setMenuOpen(false)}>
                    <MenuTrigger>
                        <Icon1 name='dots-three-vertical' size={17} color='#000000' />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ marginLeft: 50, marginTop: 25, borderRadius: 10 }}>
                        <MenuOption onSelect={() => props.handleDelNotification(props.id)}>
                            <Text style={styles.option}>{t('NotificationsComponent.deleteNotification')}</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => props.handleIsRead(props.id)}>
                            <Text style={styles.option}>{t('NotificationsComponent.unReadNotification')}</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    nameTxt: {
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 15,
        marginBottom: 1,
    },
    item2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 15,
        marginBottom: 1
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        paddingVertical: 20,
        borderColor: '#0065ff',
        borderWidth: 1
    },
    cont: {
        flexDirection: 'row'
    },
    content: {
        paddingTop: 8,
        paddingLeft: 10,
        width: '80%'
    },
    name: {

        fontSize: 15
    },
    tg: {
        fontSize: 15,
        color: '#B9B6B6',
        paddingBottom: 0
    },
    menu: {
        justifyContent: 'center'
    },
    option: {
        fontSize: 15,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 5
    }
})
