'use client'

import History from './history'
import { useProfile } from '../../profile/hooks/use-profile'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function HistoryScreen() {
  const { profile, isLoading } = useProfile()
  if (isLoading) return <LoadingSpinner />

  return (
    <div className="w-screen p-12 text-neutral">
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
            <div>이화여자대학교 엘텍공과대학 소프트웨어학부 컴퓨터공학전공</div>
            <div>
              <p>2022-24 IT스타트업 IRUTI</p>
              <p>2024 제조업 INNOS</p>
            </div>
          </div>
        </div>

        {/* 연락처 */}
        <div className="flex gap-5 text-body-m">
          {/* 항목명 */}
          <div className="flex flex-col gap-3 font-bold w-[70px]">
            <div>phone</div>
            <div>email</div>
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
        <History profile={profile} />
      </div>
    </div>
  )
}
