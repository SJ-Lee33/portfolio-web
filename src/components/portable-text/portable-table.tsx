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
    <div className="w-full overflow-x-auto rounded-lg border border-neutralLight">
      <table
        className={`w-full border-collapse ${dense ? 'text-body-m' : 'text-body-m'}`}
      >
        {caption && (
          <caption className="px-5 py-2 text-body-s text-neutralLight text-left bg-soft/50 font-bold border-b border-neutralLight">
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
                  border-b border-neutralLight last:border-none
                  transition-colors duration-150               
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
                        'px-5 py-3 align-top text-left ',
                        isHeader
                          ? 'bg-neutralLight/20 text-neutral/80 text-body-s font-extrabold hover:bg-neutralLight'
                          : 'font-normal white hover:bg-neutralLighter',
                        // 첫 번째 열 헤더면 border-r
                        isHeaderCol && !isHeaderRow
                          ? 'border-r border-neutralLight font-semibold uppercase tracking-wide'
                          : !isHeader
                            ? 'bg-white'
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
