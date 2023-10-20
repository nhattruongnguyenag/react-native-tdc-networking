import moment from 'moment'

export function isApproximatelyTime(time: string, timeToCompare: string): boolean {
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
