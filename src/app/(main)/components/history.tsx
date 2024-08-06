import { FaRegCircleDot } from 'react-icons/fa6'

type HistoryItem = {
  year: string
  content: string[]
}

const historyData: HistoryItem[] = [
  {
    year: '2024',
    content: ['주식회사 ㅇㅇㅇ 프리랜서 근무', '□□□', '□□□'],
  },
  {
    year: '2023',
    content: ['□□□', '□□□', '□□□'],
  },
  {
    year: '2022',
    content: ['□□□', '□□□', '□□□'],
  },
  {
    year: '2019',
    content: ['이화여자대학교 엘텍공과대학 소프트웨어학부 컴퓨터공학전공 입학'],
  },
]

const Container = ({ item }: { item: HistoryItem }) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex gap-2 items-center">
        <FaRegCircleDot className="w-[20px]" />
        <div className="text-title-s font-bold">{item.year}</div>
      </div>
      <ul className="list-disc ml-10">
        {item.content.map((contentItem, index) => (
          <li key={index} className="text-body-m">
            {contentItem}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function History() {
  return (
    <div className="flex gap-3">
      <div className="bg-neutralLight w-[1px]" />
      <div className="flex flex-col gap-3 py-2">
        {historyData.map((item, index) => (
          <Container key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
