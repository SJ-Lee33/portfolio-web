export default function ProjectLabel({
  id,
  project,
}: {
  id?: string
  project?: any
}) {
  return (
    <div className="w-full bg-white flex justify-center items-center font-medium text-title-s rounded-b-md py-2">
      개발 | Development
    </div>
  )
}
