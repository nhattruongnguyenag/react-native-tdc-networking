import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/Hook'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../../sockets/SocketClient'
import FollowListView from '../../components/listviews/FollowListView'


let stompClient: Client
const FollowingList = () => {
    const [data, setData] = useState([])
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)


    useEffect(() => {
        stompClient = getStompClient()
        const onConnected = () => {
          stompClient.subscribe(`/topic/user/detail/follow/following`, onMessageReceived)
          stompClient.send(
            `/app/user/detail/follow/following`,
            {},
            JSON.stringify({
              userId: 12,
            })
          )
        }
        const onMessageReceived = (payload: any) => {
          setData(JSON.parse(payload.body))
        }
        const onError = (err: string | Frame) => {
          console.log('Loi ko lay dc du lieu')
        }
        stompClient.connect({}, onConnected, onError)
      }, [])

      
      const handleFollow = (userFollowId: number) => {
        stompClient.send(
            `/app/user/detail/follow/following`,
            {},
            JSON.stringify({
              userId: 12,
              userFollowId: userFollowId
            })
          )
      }
    return <FollowListView data={data} handleFollow={handleFollow}/>
    
}

export default FollowingList