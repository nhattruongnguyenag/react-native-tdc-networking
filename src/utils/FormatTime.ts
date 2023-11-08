import moment from 'moment'

export const formatDateTime = (originalDateString: string): any => {
  const originalDate = new Date(originalDateString)
  const day = originalDate.getDate()
  const month = originalDate.getMonth() + 1
  const year = originalDate.getFullYear()
  const hour = originalDate.getHours()
  const minute = originalDate.getMinutes()
  const formattedTime = `${day}/${month}/${year} ${hour}:${minute}`
  return formattedTime
}

export const numberDayPassed = (originalDateString: string) => {
  return moment(originalDateString).fromNow()
}
