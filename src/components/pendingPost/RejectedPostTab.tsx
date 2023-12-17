import React from 'react'
import { useAppSelector } from '../../redux/Hook'
import { POST_REJECT } from '../postApproval/PostApprovalItem'
import ListPosts from './ListPosts'

export default function RejectedPostTab() {
    const { userLogin, postDeleteId } = useAppSelector(state => state.TDCSocialNetworkReducer)
    
    return (
        <ListPosts
            type={POST_REJECT}
            active={2}
            userId={userLogin?.id} />
    )
}