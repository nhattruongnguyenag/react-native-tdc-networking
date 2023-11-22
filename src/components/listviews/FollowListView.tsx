import React from 'react'
import { FlatList, ScrollView, Text } from 'react-native'
import { Conversation } from '../../types/Conversation'
import ConversationItem from '../items/ConversationItem'
import { User } from '../../types/User'
import UserItem from '../items/UserItem'
import { FollowUserModel } from '../../types/response/FollowUserModel'


export interface FollowListViewProps {
    data: any
    handleFollow: (userId: number) => void;
}

export default function ConversationListView({ data, handleFollow }: FollowListViewProps) {
    return (
        <ScrollView>
            {
                data?.map((item:any) => <UserItem id={item.id} name={item.name} image={item.image} isFollow={item.isFollow} handleFollow={handleFollow} />)
            }
        </ScrollView>
    )
}
