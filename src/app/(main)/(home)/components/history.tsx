import { HistoryDTO } from '@/types/history/history-dto'
import classNames from 'classnames'
import { PortableText } from 'next-sanity'
import { FaCircle } from 'react-icons/fa6'

export default function History({ history }: { history: HistoryDTO[] }) {
  const components: any = {
    listItem: {
      bullet: ({ children }: { children: any }) => (
        <li className="text-body-s" style={{ listStyleType: 'disc' }}>
          {children}
        </li>
      ),
    },
  }

  const Container = ({ item }: { item: HistoryDTO }) => {
    return (
      <div className="flex flex-col text-neutral mb-10">
        <div
          className={classNames(
            'block w-full h-[0.5px] bg-neutralLight -mb-2',
            'md:hidden',
          )}
        />
        <div className="flex flex-col gap-2 md:gap-3">
          <FaCircle className="w-[15px]" />
          <div className="text-title-s font-bold mb-2">{item.year}</div>
        </div>

        <ul className="ml-4">
          <PortableText value={item.content} components={components} />
        </ul>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div
        className={classNames(
          'hidden',
          'md:block md:w-full md:h-[0.5px] md:bg-neutralLight md:-mb-2', // md ~
        )}
      />
      <div
        className={classNames(
          'flex flex-col gap-5',
          'md:grid md:grid-cols-5 md:gap-8', // md ~
        )}
      >
        {history.map((item, index) => (
          <Container key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
