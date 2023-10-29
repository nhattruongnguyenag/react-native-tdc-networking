import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/Hook'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../../sockets/SocketClient'
import FollowListView from '../../components/listviews/FollowListView'


let stompClient: Client
const FollowerList = () => {
    const [data, setData] = useState([])
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    console.log(userLogin?.id);
    

    useEffect(() => {
        stompClient = getStompClient()
        const onConnected = () => {
          stompClient.subscribe(`/topic/user/detail/follow/follower`, onMessageReceived)
          stompClient.send(
            `/app/user/detail/follow/follower`,
            {},
            JSON.stringify({
              userId: 12,
            })
          )
        }
        const onMessageReceived = (payload: any) => {
          setData(JSON.parse(payload.body))
          console.log(data);
          
        }
        const onError = (err: string | Frame) => {
          console.log('Loi ko lay dc du lieu')
        }
        stompClient.connect({}, onConnected, onError)
      }, [])

      const handleFollow = (userFollowId: number) => {
        console.log('abc');
        
        stompClient.send(
            `/app/user/detail/follow/follower`,
            {},
            JSON.stringify({
              userId: 12,
              userFollowId: userFollowId
            })
          )
      }
    return <FollowListView data={data} handleFollow={handleFollow}/>
}

export default FollowerList