import Image from 'next/image'

// ✅ 클라이언트 컴포넌트에서 안전하게 사용
export default function ProjectImage({ url }: { url: string }) {
  return (
    <div className="p-4 md:px-10 mt-2 mb-[30px]">
      <Image
        src={url}
        alt="본문 이미지"
        width={600}
        height={600}
        className="w-full md:w-[600px] h-auto object-contain rounded-md shadow-lg shadow-neutralLight/20"
      />
    </div>
  )
}
