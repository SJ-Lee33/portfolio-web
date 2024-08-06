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
        'sticky top-0 z-10',
        'w-full bg-secondary rounded-b-md',
        'shadow-lg shadow-neutralLight/50',
      )}
    >
      <div className="flex items-center text-center text-white px-5 py-7">
        <div className="font-extrabold text-headline-l text-center">
          독학 Unity 3D 게임 개발, 사용자 환경에 맞춘 Web GL 배포
        </div>
      </div>
    </div>
  )
}
