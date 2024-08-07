import { useSearchParams } from 'next/navigation'

export const useTypeSearchParam = () => {
  const params = useSearchParams()
  return params.get('type') || ''
}
