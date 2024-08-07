export function formatDate(dateString: string) {
  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' }
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

  return formattedDate // 예: "August, 2024"
}
