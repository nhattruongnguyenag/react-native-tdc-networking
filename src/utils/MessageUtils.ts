import moment from 'moment'
import { Message } from '../types/Message'
import { MessageSection, MessageSectionByTime } from '../types/MessageSection'

export function sortMessageBySections(messageSectionTimes: MessageSectionByTime[]): MessageSection[] {
  let index = -1
  let messageSections: MessageSection[] = []
  messageSectionTimes.forEach((messageSectionTimeItem) => {
    if (
      messageSections.length > 0 &&
      new Date(messageSectionTimeItem.time).getDate() === new Date(messageSections[index].title).getDate()
    ) {
      messageSections[index].data.push(messageSectionTimeItem)
    } else {
      messageSections.push({
        title: messageSectionTimeItem.time,
        data: []
      })
      index++
      messageSections[index].data.push(messageSectionTimeItem)
    }
  })

  return messageSections
}

export function sortMessagesByTime(messages: Message[]) {
  let index = -1
  let messageSectionTime: MessageSectionByTime[] = []

  messages.forEach((message) => {
    if (
      messageSectionTime.length > 0 &&
      isEqualTime(message.createdAt, messageSectionTime[index].time) &&
      message.sender.id === messageSectionTime[index].sender.id
    ) {
      messageSectionTime[index].messages.push(message)
    } else {
      messageSectionTime.push({
        sender: message.sender,
        time: message.createdAt,
        messages: []
      })
      index++
      messageSectionTime[index].messages.push(message)
    }
  })

  return messageSectionTime
}

function isEqualTime(time: string, timeToCompare: string): boolean {
  if (time && timeToCompare) {
    return moment(time).format('hh:mm a') == moment(timeToCompare).format('hh:mm a')
  }

  return false
}
