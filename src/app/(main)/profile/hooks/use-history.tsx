import axios from 'axios'
import useSWRInfinite from 'swr/infinite'
import { HistoryDTO } from '@/types/history/history-dto'

export const useHistory = () => {
  const { data, error, isLoading, isValidating } = useSWRInfinite<HistoryDTO[]>(
    () => {
      return `/api/history`
    },
    fetcher,
  )

  async function fetcher(url: string) {
    const res = await axios.get(url)
    return res.data.data
  }

  return {
    history: data ? ([] as HistoryDTO[]).concat(...data) : [],
    error,
    isLoading,
  }
}
