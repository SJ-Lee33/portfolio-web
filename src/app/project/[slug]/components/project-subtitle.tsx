export default function ProjectSubtitle({ subtitle }: { subtitle: string }) {
  return (
    <div className="w-full bg-soft px-5 md:px-10 py-1 text-title-l font-extrabold">
      {subtitle}
    </div>
  )
}
