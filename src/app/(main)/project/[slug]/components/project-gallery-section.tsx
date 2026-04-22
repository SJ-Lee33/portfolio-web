import Image from 'next/image'
import ProjectSectionHeader from './project-section-header'

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
      <ProjectSectionHeader header={title} />

      {images.length === 0 ? (
        <p className="italic">이미지가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <figure key={i} className="group">
              <div className="relative w-full overflow-hidden rounded-2xl border border-neutralLight bg-neutralLighter/50 hover:shadow-md transition-shadow duration-200">
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
                <figcaption className="mt-2 text-center text-body-s text-neutralLight">
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
