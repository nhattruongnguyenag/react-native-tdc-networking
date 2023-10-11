import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { Appbar, Avatar } from 'react-native-paper'
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { PURPLE_COLOR } from '../../constants/Color'
import { Conversation } from '../../types/Conversation'
import { RootStackParamList } from '../../App'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { setSelectConversation } from '../../redux/Slice'

const AVATAR_HEIGHT = 40

export default function MessengerToolbar({ }) {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const {selectConversation} = useAppSelector(state => state.TDCSocialNetworkReducer)
    
    return (
        <Appbar.Header style={styles.header}>
            <Appbar.Action
                icon={'arrow-left'}
                iconColor={PURPLE_COLOR}
                onPress={() => {
                    dispatch(setSelectConversation(null))
                    navigation.goBack()
                }}
                size={25}
            />
            <Appbar.Content style={styles.body} title={
                <Fragment>
                    <View style={styles.avatarGroup}>
                        <Avatar.Image size={AVATAR_HEIGHT} source={{ uri: 'https://i.stack.imgur.com/bl1g5.png?s=192&g=1' }} />
                        <View style={styles.activeSignal} />
                    </View>
                    <View style={styles.conversationContentGroup}>
                        <Text style={styles.userFullnameTitle}>{selectConversation?.receiver.name}</Text>
                        <Text style={styles.conversationContent}>Truy cập 15 phút trước</Text>
                    </View>
                </Fragment>
            } />

            <Appbar.Action
                style={styles.appbarAction}
                icon='phone'
                iconColor={PURPLE_COLOR}
                size={25}
                onPress={() => {
                }}
            />

            <Appbar.Action
                style={styles.appbarAction}
                icon='dots-vertical'
                iconColor={PURPLE_COLOR}
                size={25}
                onPress={() => {
                }}
            />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 55,
        elevation: 5
    },
    appbarContent: {
        color: '#0065FF',
        fontWeight: 'bold',
        fontSize: 20
    },
    appbarAction: {
        width: 35, height: 35
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10
    },
    avatarGroup: {
        position: 'relative',
        backgroundColor: '#eee',
        borderRadius: 999
    },
    activeSignal: {
        width: 8,
        height: 8,
        borderRadius: 999,
        backgroundColor: '#00ea5f',
        position: 'absolute',
        left: (AVATAR_HEIGHT / 2) * (1 + 1 / Math.SQRT2) - 4,
        top: (AVATAR_HEIGHT / 2) * (1 + 1 / Math.SQRT2) - 4
    },
    conversationContentGroup: {
        display: 'flex',
        justifyContent: 'center',
        marginStart: 7
    },
    userFullnameTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 3
    },
    conversationContent: {

    },
    conversationExtraInfoGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 'auto'
    },
    conversationTime: {
        fontSize: 12,
        marginBottom: 10
    },
    conversationCountNewMessage: {
        width: 24,
        height: 24,
        lineHeight: 24,
        textAlign: 'center',
        borderRadius: 999,
        backgroundColor: '#F70029',
        color: '#ffffff',
        fontWeight: 'bold'
    }
})