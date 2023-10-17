import React, { useEffect } from 'react'
import ConversationListView from '../../components/listviews/ConversationListView'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { useGetConversationsByUserIdQuery } from '../../redux/Service'
import { setConversations } from '../../redux/Slice'

export default function AllConversationGroupTab() {
  const { userLogin, conversations } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const { data, isSuccess } = useGetConversationsByUserIdQuery(userLogin ? userLogin.id : -1)

  useEffect(() => {
    console.log(data)
    if (data && isSuccess) {
      dispatch(setConversations(data))
    }
  }, [data])

  return <ConversationListView data={conversations} />
}
