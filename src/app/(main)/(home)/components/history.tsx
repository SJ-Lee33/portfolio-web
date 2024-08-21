import { ProfileDTO } from '@/types/profile/profile-dto'
import { PortableText } from 'next-sanity'
import { FaCircle } from 'react-icons/fa6'

export default function History({ profile }: { profile: ProfileDTO[] }) {
  const components: any = {
    listItem: {
      bullet: ({ children }: { children: any }) => (
        <li className="text-body-s" style={{ listStyleType: 'disc' }}>
          {children}
        </li>
      ),
    },
  }

  const Container = ({ item }: { item: ProfileDTO }) => {
    return (
      <div className="flex flex-col gap-4 text-neutral">
        <div className="flex flex-col gap-3">
          <FaCircle className="w-[15px]" />
          <div className="text-title-s font-bold">{item.year}</div>
        </div>

        <ul>
          <PortableText value={item.content} components={components} />
        </ul>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="w-full h-[0.5px] bg-neutralLight -mb-2 " />
      <div className="grid grid-cols-5 gap-8">
        {profile.map((item, index) => (
          <Container key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
