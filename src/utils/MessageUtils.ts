import moment from 'moment'
import { Message } from '../types/Message'
import { MessageSection, MessageSectionByTime } from '../types/MessageSection'

export function sortMessageBySections(messageSectionTimes: MessageSectionByTime[]): MessageSection[] {
  let index = -1
  let messageSections: MessageSection[] = []
  messageSectionTimes.forEach((messageSectionTimeItem) => {
    if (
      messageSections.length > 0 &&
      isApproximatelyDay(messageSectionTimeItem.time, messageSectionTimes[index].time)
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
      isApproximatelyTime(message.createdAt, messageSectionTime[index].time) &&
      message.type === messageSectionTime[index].type
      && message.sender.id === messageSectionTime[index].sender.id
    ) {
      messageSectionTime[index].messages.push(message)
    } else {
      messageSectionTime.push({
        type: message.type,
        sender: message.sender,
        time: message.createdAt,
        messages: []
      })
      index++
      messageSectionTime[index].messages.push(message)
    }
  })

  return messageSectionTime.reverse()
}

function isApproximatelyTime(time: string, timeToCompare: string): boolean {
  if (moment(time).hours() === moment(timeToCompare).hours()) {
    return Math.abs(moment(time).minutes() - moment(timeToCompare).minutes()) <= 1
  }

  return false
}

function isApproximatelyDay(date: string, compareDate: string): boolean {
  const formater = 'l'

  if (moment(date).format(formater) === moment(compareDate).format(formater)) {
    const timeDifferent = Math.abs(moment(date).hours() - moment(compareDate).hours())
    return timeDifferent < 4
  }
  return false
}
