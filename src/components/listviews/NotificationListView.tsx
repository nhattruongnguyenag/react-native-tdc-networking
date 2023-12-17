import { View, Text, Pressable, StyleSheet, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useTransition } from 'react'
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
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import NotificationItem from '../items/NotificationItem';

export interface NotificatonsListViewType {
    data: any
    handleItem: (id: number) => void;
    handleIsRead: (id: number) => void;
    handleDelNotification: (id: number) => void;
    handleItemCanNotClick: (id: number) => void;
}

export default function NotificationListView(props: NotificatonsListViewType) {
    
    return (
        <ScrollView style={styles.platList}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl
          refreshing={false}
          onRefresh={() => props.data}
        />}>
            {
                props.data?.map((item: any) => <>
                <NotificationItem
                    id={item.id}
                    status={item.status}
                    type={item.type}
                    userInteracted={item.userInteracted}
                    dataValue={item.dataValue}
                    createdAt={item.createdAt}
                    content={item.content}
                    handleItem={props.handleItem}
                    handleIsRead={props.handleIsRead}
                    handleDelNotification={props.handleDelNotification}
                    handleItemCanNotClick={props.handleItemCanNotClick}
                />
                </>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    platList: {
        width: '100%',
        backgroundColor: '#d3d3d3'
    },
})
