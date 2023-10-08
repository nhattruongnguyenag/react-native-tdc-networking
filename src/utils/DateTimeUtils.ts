import moment from 'moment'
import { User } from '../types/User'

export function getMessageSectionTitle(date: string): string {
  const formater = 'dddd, DD MMM YYYY'
  let yesterday = moment().subtract(1, 'days').format(formater)
  const today = moment().format(formater)
  const mesageSectionDate = moment(date).format(formater)

  let dateConverted = ''

  if (today === mesageSectionDate) {
    dateConverted = 'Hôm nay'
  } else if (yesterday == mesageSectionDate) {
    dateConverted = 'Hôm qua'
  } else {
    dateConverted = capitalizeFirstLetter(mesageSectionDate)
  }

  return dateConverted
}

export function getConversationLastUpdate(date: string): string {
  let formater = 'dddd, DD MMM YYYY'
  const today = moment()
  const mesageSectionDate = moment(date)

  let dateConverted = ''

  if (today.date() === mesageSectionDate.date()) {
    formater = 'hh:mm a'
  } else if (today.month() === mesageSectionDate.month()) {
    formater = 'dddd, DD'
  } else if (today.year() === mesageSectionDate.year()) {
    formater = 'dddd, DD MMM'
  }

  return capitalizeFirstLetter(mesageSectionDate.format(formater))
}

export function getUserStatus(user?: User): string {
  let status = ''

  if (user?.status === 1) {
    status = 'Đang hoạt động'
  } else {
    status = 'Truy cập ' + moment(user?.updatedAt).fromNow()
  }

  return status
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
