import { IoCall } from 'react-icons/io5'
import { IoMail } from 'react-icons/io5'
import { IoLogoGithub } from 'react-icons/io'
import Link from 'next/link'

export default function Contact() {
  const Container = ({
    icon,
    title,
    content,
    href,
    color,
  }: {
    icon: React.ReactNode
    title: string
    content: string
    href: string
    color: string
  }) => {
    return (
      <Link
        href={href}
        target="_blank"
        className="flex gap-3 justify-end items-center group"
      >
        {/* hover 시 보이는 내용 */}
        <div className="hidden group-hover:block text-white font-extralight text-body-s">
          {content}
        </div>

        {/* 원형 */}
        <div className="w-[80px] h-[80px] rounded-full font-bold text-center flex justify-center items-center bg-white/70 hover:bg-white">
          {/* 평소엔 아이콘  */}
          <div className={`block group-hover:hidden text-body-l text-${color}`}>
            {icon}
          </div>

          {/* hover 시 텍스트  */}
          <div className={`hidden group-hover:block text-body-m text-${color}`}>
            {title}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="flex flex-col p-4 gap-10">
      <Container
        icon={<IoMail />}
        title="Email"
        content="sojinlee0z0@gmail.com"
        href="mailto:sojinlee0z0@gmail.com"
        color="neutral"
      />
      <Container
        icon={<IoCall />}
        title="Phone"
        content="+82 10 7159 9812"
        href="callto:01071599812"
        color="primary"
      />
      <Container
        icon={<IoLogoGithub />}
        title="Github"
        content="@SJ-Lee33"
        href="https://github.com/SJ-Lee33"
        color="primaryDark"
      />
    </div>
  )
}
