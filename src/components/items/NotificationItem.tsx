import { View, Text, Pressable, StyleSheet, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useState, useTransition } from 'react'
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

export interface NotificatonsType {
    id: any
    status: string
    image: string
    createddate: any
    content: string
    handleItem: (id: number) => void;
    handleIsRead: (id: number) => void;
    handleDelNotification: (id: number) => void;
}

export default function NotificationItem(props: NotificatonsType) {
    const t = useTranslation()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [isMenuOpen, setMenuOpen] = useState(false)
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    
    return (
            <View>
                <Pressable
                    onPress={() => props.handleItem(props.id)}
                    style={[styles.item, { backgroundColor: props.status === '1' ? '#ffffff' : '#f3f9ff' }]}
                >
                    <View style={styles.cont}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7h13cetHlwG784hz57YxCRBAfacOVhCmPrt0EoVRAcg&s'
                            }}
                        />
                        <View style={styles.content}>
                            <Text style={styles.name}>{props.content.length > 150 ? `${props.content.substring(0, 150)}...` : props.content}</Text>
                            <Text style={styles.tg}>{moment(props.createddate).fromNow()}</Text>
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
    item: {
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
