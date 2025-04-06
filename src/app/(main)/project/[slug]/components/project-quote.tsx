import { BiSolidQuoteLeft } from 'react-icons/bi'

export default function ProjectQuote({ children }: { children: any }) {
  return (
    <div
      className={
        'text-title-s flex gap-2 w-full px-2 py-1 mb-2 md:px-8 italic bg-white/50 rounded-lg text-primary'
      }
    >
      <BiSolidQuoteLeft />
      <div>{children}</div>
    </div>
  )
}
