import { IoCall } from 'react-icons/io5'
import { IoMail } from 'react-icons/io5'
import { IoLogoGithub } from 'react-icons/io'
import Link from 'next/link'
import classNames from 'classnames'

export default function Contact() {
  const Container = ({
    icon,
    title,
    content,
    href,
  }: {
    icon: React.ReactNode
    title: string
    content: string
    href: string
  }) => {
    return (
      <div className="flex items-center gap-2">
        {icon}
        <div className="font-bold ">{title}</div>
        <Link href={href} className="hover:text-primary truncate">
          {content}
        </Link>
      </div>
    )
  }
  return (
    <div className="flex flex-col p-4 gap-2 text-body-m bg-soft rounded-md">
      <Container
        icon={<IoMail />}
        title="Email"
        content="sojinlee0z0@gmail.com"
        href="mailto:sojinlee0z0@gmail.com"
      />
      <Container
        icon={<IoCall />}
        title="Phone"
        content="+82 10 7159 9812"
        href="callto:01071599812"
      />
      <Container
        icon={<IoLogoGithub />}
        title="Github"
        content="@SJ-Lee33"
        href="https://github.com/SJ-Lee33"
      />
    </div>
  )
}
