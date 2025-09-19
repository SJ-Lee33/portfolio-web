import { PortableText } from 'next-sanity'
import PortableMath from './portable-math'
import PortableHeader from '@/components/portable-text/portable-header'
import PortableSubheader from '@/components/portable-text/portable-subheader'
import PortablePlanetext from '@/components/portable-text/portable-plaintext'
import PortableQuote from '@/components/portable-text/portable-quote'
import PortableListBullet from '@/components/portable-text/portable-listbullet'
import PortableListNumber from '@/components/portable-text/portable-listnumber'
import PortableImage from '@/components/portable-text/portable-image'
import PortableCodebox from '@/components/portable-text/portable-codebox'

export default function Portable({ value }: { value: any }) {
  const portableComponents: any = {
    block: {
      h1: ({ children }: { children: any }) => (
        <PortableHeader>{children}</PortableHeader>
      ),
      h2: ({ children }: { children: any }) => (
        <PortableSubheader>{children}</PortableSubheader>
      ),
      normal: ({ children }: { children: any }) => (
        <PortablePlanetext>{children}</PortablePlanetext>
      ),
      quote: ({ children }: { children: any }) => (
        <PortableQuote>{children}</PortableQuote>
      ),
    },
    listItem: {
      bullet: ({ children }: { children: any }) => (
        <PortableListBullet>{children}</PortableListBullet>
      ),
      number: ({ children }: { children: any }) => (
        <PortableListNumber>{children}</PortableListNumber>
      ),
    },
    types: {
      image: ({ value }: { value: { url: string } }) => (
        <PortableImage url={value.url} />
      ),
      code: ({ value }: { value: { code: string; language?: string } }) => (
        // 서버와 클라의 마크업 차이를 무시(안전장치)
        <div
          className="px-4 md:px-10 text-body-m mt-2 mb-[30px] overflow-auto"
          suppressHydrationWarning
        >
          <PortableCodebox code={value.code} language={value.language} />
        </div>
      ),
      math: ({ value }: any) => <PortableMath value={value} />,
    },
  }
  return <PortableText value={value} components={portableComponents} />
}
