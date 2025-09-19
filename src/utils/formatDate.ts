export function formatDate(
  dateString: string,
  options?: { day?: boolean; yyFormat?: boolean },
) {
  const date = new Date(dateString)

  const fullYear = String(date.getFullYear())
  const year = options?.yyFormat ? fullYear.slice(-2) : fullYear

  const month = String(date.getMonth() + 1).padStart(2, '0') // 1월이 0이기 때문에 +1
  const day = String(date.getDate()).padStart(2, '0')

  return options?.day ? `${year}. ${month}. ${day}` : `${year}. ${month}` // 예: "2024. 05"
}
