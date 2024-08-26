import classNames from 'classnames'
import Image from 'next/image'

export default function ProjectImages({
  images,
  thumbnail,
}: {
  images: string[]
  thumbnail: string
}) {
  const imageCss = 'w-full h-auto shadow-lg shadow-neutralLight/20 rounded-sm'
  return (
    <div
      className={classNames(
        'px-4 gap-4 columns-2 mt-[60px] mb-3',
        'md:px-10 md:columns-3',
      )}
    >
      {/* 썸네일 */}
      <div className="mb-4 break-inside-avoid">
        <Image
          alt={`screenshot-thumbnail`}
          src={thumbnail}
          width={250}
          height={250}
          className={imageCss}
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* 추가 스크린샷 */}
      {images.map((item, index) => (
        <div key={index} className="mb-4 break-inside-avoid">
          <Image
            alt={`screenshot-${index}`}
            src={item}
            width={250}
            height={250}
            className={imageCss}
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  )
}
