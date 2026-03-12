import getHistory from '@/hooks/get-history'
import { HISTORY_QUERYResult } from '@/sanity/types'
import classNames from 'classnames'
import { PortableText } from 'next-sanity'
import { FaCircle } from 'react-icons/fa6'

type HistoryItem = NonNullable<HISTORY_QUERYResult>[number]

export default async function History() {
  const history = await getHistory()

  const components: any = {
    listItem: {
      bullet: ({ children }: { children: any }) => (
        <li className="text-body-s" style={{ listStyleType: 'disc' }}>
          {children}
        </li>
      ),
    },
  }

  const Container = ({ item }: { item: HistoryItem }) => {
    return (
      <div className="flex flex-col text-neutral mb-10">
        <div
          className={classNames('block w-full h-[0.5px] bg-neutralLight -mb-2')}
        />
        <div className="mx-4">
          <div className="flex flex-col gap-2 md:gap-3">
            <FaCircle className="w-[15px]" />
            <div className="text-title-s font-bold mb-2">{item.year}</div>
          </div>

          <ul className="ml-4">
            <PortableText value={item.content ?? []} components={components} />
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div
        className={classNames(
          'flex flex-col',
          'sm:grid sm:grid-cols-3', // sm
          'md:grid md:grid-cols-4', // md ~
        )}
      >
        {history.map((item: HistoryItem, index: number) => (
          <Container key={item.year} item={item} />
        ))}
      </div>
    </div>
  )
}
