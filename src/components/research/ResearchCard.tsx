interface ResearchCardProps {
  title: string
  description: string
  tags: string[]
  focus?: string
}

export default function ResearchCard({ title, description, tags, focus }: ResearchCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-surface-border bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-brand-300">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="max-w-xs text-xl font-semibold text-slate-900">{title}</h3>
        </div>

        {focus && <p className="text-sm font-medium text-brand-700">{focus}</p>}
        
        <p className="text-slate-600 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
