export default function PortableHeader({ children }: { children: any }) {
  return (
    <div className="w-full mb-[20px] mt-[40px] text-title-m font-extrabold text-start">
      {children}
      <div className="h-[1.5px] bg-neutralLighter mt-2" />
    </div>
  )
}
