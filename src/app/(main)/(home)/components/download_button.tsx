'use client'

import { FaDownload } from 'react-icons/fa'

type Props = {
  url: string
}

export default function DownloadButton({ url }: Props) {
  const handleClick = () => {
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="
        fixed top-20 right-6 z-50
        flex items-center gap-3

        px-5 py-3
        bg-white/80 backdrop-blur-md
        text-black

        rounded-full shadow-lg

        hover:bg-primary hover:text-white
        hover:scale-105 hover:shadow-xl

        transition-all duration-200
      "
    >
      {/* 아이콘 */}
      <FaDownload className="text-base shrink-0" />

      {/* 텍스트 영역 */}
      <div className="flex flex-col leading-tight text-left">
        <span className="font-semibold text-sm">경력기술서 다운로드</span>
        <span className="text-[10px] opacity-70">pdf file download</span>
      </div>
    </button>
  )
}
