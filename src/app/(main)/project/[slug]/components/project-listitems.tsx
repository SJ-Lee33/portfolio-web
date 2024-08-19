export default function ProjectListitems({ children }: { children: any[] }) {
  return (
    <ul
      className="mx-8 my-2 md:mx-16 text-body-m font-semibold"
      style={{ listStyleType: 'decimal' }}
    >
      {children}
    </ul>
  )
}
