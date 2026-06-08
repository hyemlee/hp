import { useEffect } from 'react'
import NewsCard from '../components/news/NewsCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import { useDataStore } from '../store/dataStore'

export default function News() {
  const news = useDataStore((state) => state.news)
  const newsLoading = useDataStore((state) => state.newsLoading)
  const newsError = useDataStore((state) => state.newsError)
  const fetchNews = useDataStore((state) => state.fetchNews)

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Updates</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Latest news & announcements</h1>
          <p className="max-w-2xl text-lg text-slate-600">Stay informed about our latest breakthroughs, partnerships, and milestones</p>
        </div>
      </section>

      {newsLoading && <LoadingSpinner />}
      {newsError && <ErrorMessage error={newsError} retry={fetchNews} />}
      {!newsLoading && !newsError && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  )
}
