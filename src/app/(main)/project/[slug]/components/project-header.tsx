export default function ProjectHeader({ children }: { children: any }) {
  return (
    <div className="w-full bg-soft px-4 md:px-10 py-1 mt-[50px] mb-2 text-title-l font-extrabold text-start">
      {children}
    </div>
  )
}
