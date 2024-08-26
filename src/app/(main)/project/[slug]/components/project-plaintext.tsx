import Link from 'next/link'
import React from 'react'

export default function ProjectPlanetext({
  children,
}: {
  children: React.ReactNode
}) {
  // 노멀텍스트 조건부 스타일링을 위한 함수
  const renderChild = (child: React.ReactNode): React.ReactNode => {
    if (React.isValidElement(child) && child.props?.markType === 'link') {
      // 링크이면
      return (
        <Link
          key={child.key}
          className="text-primaryDark underline"
          href={child.props.value.href}
          target="_blank"
        >
          {child.props.children}
        </Link>
      )
    }

    return child
  }

  return (
    <div className="w-full px-4 py-1 md:px-10 text-body-l">
      {Array.isArray(children)
        ? children.map(renderChild)
        : renderChild(children)}
    </div>
  )
}
