interface Props {
  children: React.ReactNode
  type?: 'bullet' | 'number'
}

export default function PortableList({ children, type = 'bullet' }: Props) {
  const isNumber = type === 'number'

  const ListTag = isNumber ? 'ol' : 'ul'

  return (
    <div className="bg-white border border-neutralLight rounded-xl p-5 shadow-sm">
      <ListTag
        className={[
          'pl-5 space-y-2',
          isNumber ? 'list-decimal' : 'list-disc',
        ].join(' ')}
      >
        {children}
      </ListTag>
    </div>
  )
}
