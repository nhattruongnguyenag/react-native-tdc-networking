import React from 'react'
import { useAppSelector } from '../../redux/Hook'
import { POST_PENDING } from '../postApproval/PostApprovalItem'
import ListPosts from './ListPosts'

const LIMIT = 3

export default function PenddingPostTab() {
    const { userLogin, postDeleteId, surveyPostUpdated } = useAppSelector(state => state.TDCSocialNetworkReducer)

    return (
        <ListPosts
            type={POST_PENDING}
            active={0}
            userId={userLogin?.id} />
    )
}
