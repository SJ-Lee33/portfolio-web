import { parseISO, differenceInYears, differenceInMonths } from 'date-fns'

export function getDurationDate(started: string, released: string): string {
  const startDate = parseISO(started)
  const releasedDate = parseISO(released)

  const years = differenceInYears(releasedDate, startDate)
  const totalMonths = differenceInMonths(releasedDate, startDate)
  const months = totalMonths - years * 12 + 1

  if (years > 0 && months > 0) {
    return `${years}년 ${months}개월`
  } else if (years > 0) {
    return `${years}년`
  } else {
    return `${months}개월`
  }
}
