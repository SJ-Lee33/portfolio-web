import classNames from 'classnames'

export default function ProjectTitle({ title }: { title: string }) {
  return (
    <div
      className={classNames(
        'sticky top-[90px] z-10',
        'flex items-center justify-center text-center',
        'w-full px-10 py-7 bg-secondary rounded-b-md',
        'shadow-lg shadow-neutralLight/50',
        'text-white font-extrabold text-headline-l',
      )}
    >
      {title}
    </div>
  )
}
