import Image from 'next/image'

interface GalleryImage {
  url: string
  width?: number
  height?: number
  caption?: string
}

interface Props {
  id: string
  title: string
  images: GalleryImage[]
}

export default function ProjectGallerySection({ id, title, images }: Props) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="h-px bg-gray-100 mb-6" />

      {images.length === 0 ? (
        <p className="text-gray-400 text-sm italic">이미지가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <figure key={i} className="group">
              <div className="relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition-shadow duration-200">
                <Image
                  src={img.url}
                  alt={img.caption ?? `${title} 이미지 ${i + 1}`}
                  width={img.width ?? 800}
                  height={img.height ?? 600}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              {img.caption && (
                <figcaption className="mt-2 text-center text-xs text-gray-400">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}
