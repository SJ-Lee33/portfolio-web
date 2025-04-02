export function formatDate(dateString: string, dayOption?: boolean) {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 1월이 0이기 때문에 +1
  const day = String(date.getDate()).padStart(2, '0')

  return dayOption ? `${year}. ${month}. ${day}` : `${year}. ${month}` // 예: "2024. 05"
}
