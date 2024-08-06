import classNames from 'classnames'

export default function ProjectTitle({
  id,
  project,
}: {
  id?: string
  project?: any
}) {
  return (
    <div
      className={classNames(
        'sticky top-10 z-10',
        'flex items-center justify-center text-center',
        'w-full px-5 py-7 bg-secondary rounded-b-md',
        'shadow-lg shadow-neutralLight/50',
        'text-white font-extrabold text-headline-l',
      )}
    >
      독학 Unity 3D 게임 개발, 사용자 환경에 맞춘 Web GL 배포
    </div>
  )
}
