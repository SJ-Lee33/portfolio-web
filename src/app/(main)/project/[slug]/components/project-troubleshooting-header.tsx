import classNames from 'classnames'

export default function Troubleshootingheader({ children }: { children: any }) {
  return (
    <div
      className={classNames(
        'flex gap-1 items-center bg-white border-t border-b border-neutralLight',
        'px-2 md:px-8 py-1 mt-8 mb-2',
        'text-title-m font-bold text-start',
      )}
    >
      {children}
    </div>
  )
}
