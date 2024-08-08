import axios from 'axios'
import useSWRInfinite from 'swr/infinite'
import { ProfileDTO } from '@/types/profile/profile-dto'

export const useProfile = () => {
  const { data, error, isLoading, isValidating } = useSWRInfinite<ProfileDTO[]>(
    () => {
      return `/api/profile`
    },
    fetcher,
  )

  async function fetcher(url: string) {
    const res = await axios.get(url)
    return res.data.data
  }

  return {
    profile: data ? ([] as ProfileDTO[]).concat(...data) : [],
    error,
    isLoading,
  }
}
