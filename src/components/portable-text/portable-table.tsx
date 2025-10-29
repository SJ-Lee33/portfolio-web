interface PortableTableProps {
  value: {
    caption?: string
    mode?: 'rowHeader' | 'colHeader' | 'bothHeader'
    dense?: boolean
    table?: {
      rows?: { cells: string[] }[]
    }
  }
}

export default function PortableTable({ value }: PortableTableProps) {
  const { caption, mode, dense, table } = value || {}
  const rows = table?.rows ?? []
  if (!rows.length) return null

  const colCount = rows[0]?.cells?.length ?? 0
  const isColumnMode = mode === 'colHeader' || mode === 'bothHeader'
  const isRowMode = mode === 'rowHeader'

  // ✅ 나머지 열 개수
  const restColCount = Math.max(colCount - 1, 1)

  return (
    <div className="w-full px-3 my-6 overflow-x-auto">
      <table
        className={`w-full border-collapse ${
          dense ? 'text-caption' : 'text-body-m'
        }`}
        style={{ tableLayout: 'fixed' }}
      >
        {/* ✅ colgroup: 열 폭 비율 정의 */}
        <colgroup>
          {isColumnMode ? (
            <>
              {/* 첫 열: 25%까지 */}
              <col
                style={{
                  maxWidth: '25%',
                }}
              />
              {/* 나머지 열: 남은 75%를 균등 분배 */}
              {Array.from({ length: restColCount }).map((_, idx) => (
                <col
                  key={idx}
                  style={{
                    width: `${75 / restColCount}%`,
                  }}
                />
              ))}
            </>
          ) : isRowMode ? (
            <>
              {/* 모든 열을 전체 폭 기준 균등 분배 */}
              {Array.from({ length: colCount }).map((_, idx) => (
                <col
                  key={idx}
                  style={{
                    width: `${100 / colCount}%`,
                  }}
                />
              ))}
            </>
          ) : (
            // 기본 fallback
            <>
              {Array.from({ length: colCount }).map((_, idx) => (
                <col
                  key={idx}
                  style={{
                    width: `${100 / colCount}%`,
                  }}
                />
              ))}
            </>
          )}
        </colgroup>

        {/* ✅ 캡션 */}
        {caption && (
          <caption className="p-2 text-body-s text-neutral-500">
            {caption}
          </caption>
        )}

        {/* ✅ 표 본문 */}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.cells.map((cell, j) => {
                const isHeaderRow = mode === 'rowHeader' && i === 0
                const isHeaderCol = mode === 'colHeader' && j === 0
                const isHeaderBoth =
                  mode === 'bothHeader' && (i === 0 || j === 0)
                const isHeader = isHeaderRow || isHeaderCol || isHeaderBoth
                const Tag = isHeader ? 'th' : 'td'

                return (
                  <Tag
                    key={j}
                    className={[
                      'border border-neutral px-3 py-2 align-top text-left truncate',
                      isHeader ? 'bg-lemon/50 font-semibold' : '',
                    ].join(' ')}
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cell}
                  </Tag>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
