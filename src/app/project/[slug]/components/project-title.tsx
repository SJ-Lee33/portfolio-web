export default function ProjectTitle({
  id,
  project,
}: {
  id?: string
  project?: any
}) {
  return (
    <div className="relative w-full bg-secondary rounded-b-md shadow-lg shadow-neutralLight/50">
      <div className="absolute top-0 w-full bg-white flex justify-center items-center font-medium text-title-s rounded-b-md">
        개발 | Development
      </div>

      <div className="flex flex-col items-center gap-5 text-white mt-5 px-5 py-7">
        <div className="font-extrabold text-headline-l text-center">
          독학 Unity 3D 게임 개발, 사용자 환경에 맞춘 Web GL 배포
        </div>
        <div className="flex flex-col gap-1 text-body-s font-light">
          <div>
            <span className="font-semibold">역할 |</span> 내용
          </div>
          <div>
            <span className="font-semibold">기여 |</span> 내용내용
          </div>
          <div>
            <span className="font-semibold">기술 |</span> 내용내용내용
          </div>
          <div>
            <span className="font-semibold">기간 |</span> 내용내용내용내용
          </div>
        </div>
      </div>
    </div>
  )
}
