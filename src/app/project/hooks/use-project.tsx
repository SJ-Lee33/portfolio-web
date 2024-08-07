import axios from 'axios'
import useSWRInfinite from 'swr/infinite'
import { useTypeSearchParam } from './use-type-search-param'
import { ProjectListDto } from '@/types/project/project-list-dto'

const PAGE_SIZE = 10

export const useProjects = () => {
  const type = useTypeSearchParam()

  const { data, error, mutate, isLoading, isValidating, size, setSize } =
    useSWRInfinite<ProjectListDto[]>((index) => {
      return `/api/project?page=${
        index + 1
      }&limit=${PAGE_SIZE}&projectType=${type}`
    }, fetcher)

  async function fetcher(url: string) {
    const res = await axios.get(url)
    return res.data.data
  }

  const isLoadingMore =
    isLoading ||
    (isValidating && data && typeof data[data.length - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length + 1 < PAGE_SIZE) || false

  return {
    projects: data ? ([] as ProjectListDto[]).concat(...data) : [],
    error,
    mutate,
    isLoading,
    size,
    setSize,
    isReachingEnd,
    isLoadingMore,
  }
}
