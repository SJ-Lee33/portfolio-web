export default function PortableHeader({ children }: { children: any }) {
  return (
    <div className="w-full bg-primaryLighter px-4 md:px-10 py-1 mb-[20px] mt-[80px] text-headline-s font-extrabold text-start">
      {children}
    </div>
  )
}
