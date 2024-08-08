import classNames from 'classnames'
import Image, { StaticImageData } from 'next/image'

export type SkillItem = {
  icon: StaticImageData
  title: string
}
export default function SkillIcon({
  item,
  small,
}: {
  item: SkillItem
  small?: boolean
}) {
  return (
    <div className="relative flex flex-col items-center group">
      <Image
        className={classNames(
          'object-contain',
          small ? 'h-[35px]' : 'h-[65px]',
        )}
        src={item.icon}
        alt={item.title}
        width={small ? 35 : 65}
        height={small ? 35 : 65}
      />
      {!small && (
        <div className="absolute bottom-0 left-1/2 h-full w-full flex justify-center items-center text-center transform -translate-x-1/2 bg-neutral text-white text-body-s rounded-md opacity-0 group-hover:opacity-80 transition-opacity duration-300">
          {item.title}
        </div>
      )}
    </div>
  )
}
