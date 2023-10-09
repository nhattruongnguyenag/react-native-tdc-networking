import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Client, Frame, Message } from 'stompjs'
import ConversationListView from '../../components/listviews/ConversationListView'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { setConversations } from '../../redux/Slice'
import { getStompClient } from '../../sockets/SocketClient'
import Loading from '../Loading'

export default function AllConversationGroupTab() {
  const isFocused = useIsFocused()
  const [isLoading, setLoading] = useState(false)
  const { userLogin, conversations } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isFocused) {
      const stompClient: Client = getStompClient()

      const onConnected = () => {
        setLoading(true)
        stompClient.subscribe('/topic/conversations', onMessageReceived)
        stompClient.send(`/app/conversations/listen/${userLogin?.id}`)
      }
  
      const onMessageReceived = (payload: Message) => {
        setLoading(false)
        dispatch(setConversations(JSON.parse(payload.body)))
      }
  
      const onError = (err: string | Frame) => {
        console.log(err)
      }
  
      stompClient.connect({}, onConnected, onError)
    }

  }, [isFocused])

  return (
    isLoading ? <Loading title='Đang tải danh sách hội thoại'/>
    :
    <ConversationListView data={conversations} />
  )
}
