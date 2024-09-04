'use client'

import History from './history'
import { useHistory } from '../../profile/hooks/use-history'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function HistoryScreen() {
  const { history, isLoading } = useHistory()
  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-12 text-neutral">
      {/* 제목 */}
      <div className="text-headline-l font-extrabold">History</div>

      <div className="flex flex-col gap-3 my-10 md:flex-row md:gap-20">
        {/* 요약 */}
        <div className="flex gap-5 text-body-m">
          {/* 항목명 */}
          <div className="flex flex-col gap-3 font-bold w-[70px]">
            <div>학력</div>
            <div>주요 경력</div>
          </div>

          {/* 내용 */}
          <div className="flex flex-col gap-3">
            <div>이화여자대학교 소프트웨어학부 컴퓨터공학전공</div>
            <div>
              <div>2024 INNOS inc.</div>
              <p>2022-24 IRUTI inc.</p>
            </div>
          </div>
        </div>

        {/* 연락처 */}
        <div className="flex gap-5 text-body-m">
          {/* 항목명 */}
          <div className="flex flex-col gap-3 font-bold w-[70px]">
            <div>휴대폰</div>
            <div>이메일</div>
          </div>

          {/* 내용 */}
          <div className="flex flex-col gap-3">
            <div>010.7159.9812</div>
            <div>sojinlee0z0@gmail.com</div>
          </div>
        </div>
      </div>

      {/* 경력 */}
      <div className="mt-[140px]">
        <History history={history} />
      </div>
    </div>
  )
}
