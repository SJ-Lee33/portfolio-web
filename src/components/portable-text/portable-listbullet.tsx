export default function PortableListBullet({ children }: { children: any[] }) {
  return (
    <div className="mx-8 md:mx-12 my-2 bg-red">
      <li className="text-body-l">{children}</li>
    </div>
  )
}
