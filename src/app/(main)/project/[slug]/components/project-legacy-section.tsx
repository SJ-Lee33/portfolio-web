import Portable from '@/components/portable-text/portable-text-component'
import PortableHeader from '@/components/portable-text/portable-header'
import PortableImages from '@/components/portable-text/portable-images'

interface Props {
  content: any[]
  imgUrls?: string[]
}

// 레거시 모드: 기존 content 단일 Portable Text 렌더링
// 기존 Portable 컴포넌트가 자체 TOC를 생성하므로 사이드바는 숨김
export default function ProjectLegacySection({ content, imgUrls }: Props) {
  return (
    <div className="w-full">
      <Portable value={content} />

      {imgUrls && imgUrls.length > 0 && (
        <>
          <PortableHeader>스크린샷</PortableHeader>
          <PortableImages images={imgUrls} thumbnail="" />
        </>
      )}
    </div>
  )
}
