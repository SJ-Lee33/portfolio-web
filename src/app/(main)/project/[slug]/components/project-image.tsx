import { urlFor } from '@/lib/sanity'

export default function ProjectImage({ asset }: { asset: { _ref: string } }) {
  const imageUrl = urlFor({ _ref: asset._ref }).url()

  return (
    <img
      src={imageUrl}
      alt="본문 이미지"
      className="w-[400px] h-auto object-contain mx-4 md:mx-10 my-3 shadow-md shadow-neutralLight/30"
    />
  )
}
