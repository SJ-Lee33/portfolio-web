export default function ProjectListitems({ children }: { children: any[] }) {
  return (
    <li
      className="mx-8 mb-2 md:mx-16 text-body-l"
      style={{ listStyleType: 'disc' }}
    >
      {children}
    </li>
  )
}
