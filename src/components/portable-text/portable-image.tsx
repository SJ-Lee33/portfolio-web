import Image from 'next/image'

export default function PortableImage({ url }: { url: string }) {
  if (!url) return null
  return (
    <div className="pl-5 my-2">
      <Image
        src={url}
        alt="본문 이미지"
        width={600}
        height={600}
        className="w-auto max-h-[400px] lg:max-h-[500px] h-auto object-contain rounded-md shadow-lg shadow-neutralLight/20"
      />
    </div>
  )
}
