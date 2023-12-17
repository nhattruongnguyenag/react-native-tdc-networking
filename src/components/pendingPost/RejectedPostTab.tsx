import React from 'react'
import { useAppSelector } from '../../redux/Hook'
import ListPosts from './ListPosts'

export default function RejectedPostTab() {
    const { userLogin, postDeleteId } = useAppSelector(state => state.TDCSocialNetworkReducer)
    
    return (
        <ListPosts
            active={2}
            userId={userLogin?.id} />
    )
}