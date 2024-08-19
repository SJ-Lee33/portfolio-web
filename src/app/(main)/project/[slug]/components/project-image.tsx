import { urlFor } from '@/lib/sanity'

export default function ProjectImage({ asset }: { asset: { _ref: string } }) {
  const imageUrl = urlFor({ _ref: asset._ref }).url()

  return (
    <div className="p-4 md:px-10">
      <img
        src={imageUrl}
        alt="본문 이미지"
        className="w-[400px] h-auto object-contain shadow-md shadow-neutralLight/30"
      />
    </div>
  )
}
