interface MemberCardProps {
  name: string
  role: string
}

export default function MemberCard({ name, role }: MemberCardProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-surface-border bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-brand-300">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-lg font-semibold text-brand-700">
        {initials}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      <p className="mt-2 text-sm text-slate-600">{role}</p>
    </article>
  )
}
