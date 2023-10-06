import { Message } from "../types/Messages"
import { MessageSection } from "../types/MessageSection"

export function sortMessageBySections(messages: Message[]): MessageSection[] {
    let index = -1
    let messageSections: MessageSection[] = []
    messages.forEach((value) => {
      if (
        messageSections.length > 0 &&
        new Date(value.updatedAt).getDate() === new Date(messageSections[index].title).getDate()
      ) {
        messageSections[index].data.push(value)
      } else {
        messageSections.push({
          title: value.updatedAt,
          data: []
        })
        index++
        messageSections[index].data.push(value)
      }
    })
  
    return messageSections
  }