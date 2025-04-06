export default function ProjectListNumber({ children }: { children: any[] }) {
  return (
    <li
      className="mx-8 mb-2 md:mx-16 text-body-l"
      style={{ listStyleType: 'decimal' }}
    >
      {children}
    </li>
  )
}
