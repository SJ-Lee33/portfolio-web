export default function ProjectSectionHeader({ header }: { header: string }) {
  const formatHeader = (text: string) => {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <h1 className="text-title-l font-bold text-primary/70 pl-1">
          {formatHeader(header)}
        </h1>
      </div>
      <div className="h-[1.5px] bg-neutralLight/50 rounded-full mt-1 mb-4" />
    </>
  )
}
