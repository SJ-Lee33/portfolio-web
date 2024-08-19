import classNames from 'classnames'

export default function ProjectSubheader({
  children,
  color,
}: {
  children: any
  color?: 'red' | 'blue'
}) {
  return (
    <div
      className={classNames(
        'w-full bg-neutralLighter/70 px-4 md:px-10 mb-2 text-title-m font-bold text-start',
        color == 'red' && 'text-red mt-[60px]',
        color == 'blue' && 'text-primary mt-8',
      )}
    >
      {children}
    </div>
  )
}
