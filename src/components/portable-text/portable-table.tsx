interface PortableTableProps {
  value: {
    caption?: string
    mode?: 'rowHeader' | 'colHeader' | 'bothHeader'
    dense?: boolean
    table?: {
      rows?: { cells: string[]; _key?: string }[]
    }
  }
}

export default function PortableTable({ value }: PortableTableProps) {
  const { caption, mode, dense, table } = value || {}
  const rows = table?.rows ?? []
  if (!rows.length) return null

  const colCount = rows[0]?.cells?.length ?? 0

  return (
    <div className="w-full my-6 overflow-x-auto rounded-2xl border border-gray-100">
      <table
        className={`w-full border-collapse ${dense ? 'text-xs' : 'text-sm'}`}
      >
        {caption && (
          <caption className="px-5 py-2 text-xs text-gray-400 text-left bg-gray-50 border-b border-gray-100">
            {caption}
          </caption>
        )}

        <tbody>
          {rows.map((row, i) => {
            const isHeaderRow = mode === 'rowHeader' && i === 0
            const isColHeader = mode === 'colHeader' || mode === 'bothHeader'

            return (
              <tr
                key={row._key ?? i}
                className={`
                  border-b border-gray-50 last:border-none
                  transition-colors duration-150
                  ${isHeaderRow ? 'bg-gray-50' : 'hover:bg-gray-50/80'}
                `}
              >
                {row.cells.map((cell, j) => {
                  const isHeaderCol =
                    (mode === 'colHeader' || mode === 'bothHeader') && j === 0
                  const isBothHeader = mode === 'bothHeader' && i === 0
                  const isHeader = isHeaderRow || isHeaderCol || isBothHeader

                  const Tag = isHeader ? 'th' : 'td'

                  return (
                    <Tag
                      key={j}
                      className={[
                        'px-5 py-3 align-top text-left',
                        isHeader
                          ? 'font-semibold text-gray-500 uppercase tracking-wide text-xs bg-gray-50'
                          : 'text-gray-700 font-normal',
                        // 첫 번째 열 헤더면 border-r
                        isHeaderCol && !isHeaderRow
                          ? 'border-r border-gray-100 font-semibold text-gray-600 text-xs uppercase tracking-wide bg-gray-50'
                          : '',
                      ]
                        .join(' ')
                        .trim()}
                    >
                      {cell}
                    </Tag>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
