import classNames from 'classnames'

export default function ProjectTitle({ title }: { title: string }) {
  return (
    <div
      className={classNames(
        'sticky z-10',
        'top-[91px] md:top-[65px]',
        'flex items-center justify-center text-center',
        'w-full px-10 py-4 bg-secondary rounded-b-md',
        'shadow-lg shadow-neutralLight/50',
        'text-white font-bold text-headline-s',
        'md:text-headline-l md:py-7',
      )}
    >
      {title}
    </div>
  )
}
