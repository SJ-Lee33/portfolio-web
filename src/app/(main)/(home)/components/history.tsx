import { ProfileDTO } from '@/types/profile/profile-dto'
import { PortableText } from 'next-sanity'
import { FaRegCircleDot } from 'react-icons/fa6'

export default function History({ profile }: { profile: ProfileDTO[] }) {
  const components: any = {
    listItem: {
      bullet: ({ children }: { children: any }) => (
        <li className="text-body-m" style={{ listStyleType: 'disc' }}>
          {children}
        </li>
      ),
    },
  }

  const Container = ({ item }: { item: ProfileDTO }) => {
    return (
      <div className="flex flex-col mb-4">
        <div className="flex gap-2 items-center">
          <FaRegCircleDot className="w-[20px]" />
          <div className="text-title-s font-bold">{item.year}</div>
        </div>
        <ul className="list-disc ml-10">
          <PortableText value={item.content} components={components} />
        </ul>
      </div>
    )
  }
  return (
    <div className="flex gap-3">
      <div className="bg-neutralLight w-[1px]" />
      <div className="flex flex-col gap-3 py-2">
        {profile.map((item, index) => (
          <Container key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
