import classNames from 'classnames'
import Image from 'next/image'

export default function ProjectImages({ images }: { images: string[] }) {
  return (
    <div
      className={classNames(
        'px-4 gap-4 columns-2 mt-[60px] mb-3',
        'md:px-10 md:columns-3',
      )}
    >
      {images.map((item, index) => (
        <div key={index} className="mb-4 break-inside-avoid">
          <Image
            alt={`screenshot-${index}`}
            src={item}
            width={250}
            height={250}
            className="w-full h-auto shadow-lg shadow-neutralLight/20 rounded-sm"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  )
}
