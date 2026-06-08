interface NewsCardProps {
  title: string
  date: string
  summary: string
}

export default function NewsCard({ title, date, summary }: NewsCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-brand-300">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="flex items-center justify-between text-sm text-slate-600 pb-3">
        <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">News</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-slate-600">{summary}</p>
    </article>
  )
}
