interface NewsCardProps {
  title: string
  date: string
  dateTime?: string
  summary: string
}

export default function NewsCard({ title, date, dateTime = date, summary }: NewsCardProps) {
  return (
    <article className="editorial-card news-card">
      <div className="news-card__meta">
        <time dateTime={dateTime}>{date}</time>
        <span>News</span>
      </div>
      <h3>{title}</h3>
      <p>{summary}</p>
    </article>
  )
}
