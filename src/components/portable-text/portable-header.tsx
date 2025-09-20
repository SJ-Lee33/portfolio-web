export default function PortableHeader({ children }: { children: any }) {
  return (
    <div className="w-full bg-soft px-4 md:px-10 py-1 mb-2 mt-[80px] text-headline-s font-extrabold text-start">
      {children}
    </div>
  )
}
