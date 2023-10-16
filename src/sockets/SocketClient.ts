import SockJS, { Options } from 'sockjs-client'
import { Client, over } from 'stompjs'
import { SERVER_ADDRESS } from '../constants/SystemConstant'

export function getStompClient(): Client {
  const Sock = new SockJS(SERVER_ADDRESS + 'tdc-social-network-ws')
  const stompClient = over(Sock)
  stompClient.debug = (log) => {
    return null
  }
  return stompClient
}
