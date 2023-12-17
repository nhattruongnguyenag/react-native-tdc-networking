import React from 'react'
import { useAppSelector } from '../../redux/Hook'
import ListPosts from './ListPosts'

const LIMIT = 3

export default function PenddingPostTab() {
    const { userLogin, postDeleteId, surveyPostUpdated } = useAppSelector(state => state.TDCSocialNetworkReducer)

    return (
        <ListPosts
            active={0}
            userId={userLogin?.id} />
    )
}
