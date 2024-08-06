import { IoCall } from 'react-icons/io5'
import { IoMail } from 'react-icons/io5'
import { IoLogoGithub } from 'react-icons/io'
import Link from 'next/link'

export default function Contact() {
  return (
    <div className="flex flex-col p-4 gap-2 text-title-s bg-soft rounded-md">
      <div className="flex items-center gap-2">
        <IoMail />
        <div className="font-bold">Email</div>
        <Link
          href={'mailto:sojinlee0z0@gmail.com'}
          className="hover:text-primary"
        >
          sojinlee0z0@gmail.com
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <IoCall />
        <div className="font-bold">Phone</div>
        <Link href={'callto:01071599812'} className="hover:text-primary">
          +82 10 7159 9812
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <IoLogoGithub />
        <div className="font-bold">Github</div>
        <Link
          href={'https://github.com/SJ-Lee33'}
          target="_blank"
          className="hover:text-primary"
        >
          @SJ-Lee33
        </Link>
      </div>
    </div>
  )
}
