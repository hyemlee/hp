import { useTranslation } from 'react-i18next'
import NewsCard from '../components/news/NewsCard'

export default function News() {
  const { t } = useTranslation()

  return (
    <div className="editorial-page news-page">
      <header className="editorial-page__header">
        <p>{t('newsPage.kicker')}</p>
        <h1>{t('newsPage.title')}</h1>
        <span>{t('newsPage.description')}</span>
      </header>

      <div className="editorial-list">
        <NewsCard
          date={t('newsPage.websiteLaunch.date')}
          dateTime="2026-06"
          title={t('newsPage.websiteLaunch.title')}
          summary={t('newsPage.websiteLaunch.summary')}
        />
      </div>
    </div>
  )
}
