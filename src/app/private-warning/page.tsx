import Link from 'next/link'

export default function PrivateWarningPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg text-center max-w-sm">
        <h2 className="text-lg font-semibold mb-3">비공개 게시물입니다</h2>
        <p className="text-neutralLight mb-6 leading-relaxed">
          게시물이 비공개로 설정되었습니다.
        </p>

        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-primaryDark transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
