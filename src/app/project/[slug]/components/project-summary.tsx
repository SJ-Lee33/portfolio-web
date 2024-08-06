export default function ProjectSummary({
  id,
  project,
}: {
  id?: string
  project?: any
}) {
  return (
    <div className="flex flex-col w-full rounded-b-md items-center gap-5 mt-8 px-5 py-7">
      {/* 이미지 */}
      <div className="w-[150px] h-[50px] bg-primary my-4" />

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
  )
}
