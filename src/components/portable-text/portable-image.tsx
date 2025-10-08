import Image from 'next/image'

export default function PortableImage({ url }: { url: string }) {
  if (!url) return null
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
