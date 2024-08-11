import Image from 'next/image'
import logo_vertical from '/public/images/포트폴리오-로고-2.png'
import logo_horizontal from '/public/images/포트폴리오-로고-3.png'
import classNames from 'classnames'

export default function Logo({ horizontal }: { horizontal?: boolean }) {
  return (
    <div
      className={classNames(
        'flex justify-center bg-white',
        !horizontal && 'border-b border-neutralLighter',
      )}
    >
      <Image
        src={horizontal ? logo_horizontal : logo_vertical}
        className={
          horizontal
            ? 'w-auto h-[50px] object-contain'
            : 'w-15 h-15 object-contain'
        }
        alt="이소진의 포트폴리오"
        width={horizontal ? 200 : 50}
        height={horizontal ? 100 : 50}
      />
    </div>
  )
}
