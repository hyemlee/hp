import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { papers, patents, type LocalizedText } from '../data/publications'

function PublicationEmpty({ children }: { children: string }) {
  return (
    <div className="publication-empty">
      <span aria-hidden="true">+</span>
      <p>{children}</p>
    </div>
  )
}

export default function Publication() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const language = i18n.language.startsWith('en') ? 'en' : 'ko'
  const localize = (value: LocalizedText) => value[language] || value.en || value.ko

  useEffect(() => {
    if (!location.hash) return

    const timeout = window.setTimeout(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView()
    }, 80)

    return () => window.clearTimeout(timeout)
  }, [location.hash])

  return (
    <div className="publication-page">
      <header className="publication-header">
        <p>{t('publication.kicker')}</p>
        <h1>{t('publication.title')}</h1>
        <span>{t('publication.description')}</span>

        <nav aria-label={t('publication.sectionNavigation')}>
          <a href="#paper">Paper</a>
          <a href="#patent">Patent</a>
        </nav>
      </header>

      <section id="paper" className="publication-section">
        <div className="publication-section__heading">
          <div>
            <span>01</span>
            <h2>Paper</h2>
          </div>
          <p>
            {t('publication.total')} <strong>{papers.length}</strong>
          </p>
        </div>

        {papers.length === 0 ? (
          <PublicationEmpty>{t('publication.emptyPapers')}</PublicationEmpty>
        ) : (
          <div className="paper-list">
            {papers.map((paper) => {
              const content = (
                <>
                  <span className="publication-year">
                    {paper.year ?? t('publication.yearUnknown')}
                  </span>
                  <h3>
                    {localize(paper.title)}
                    {paper.journal && <em>{paper.journal}</em>}
                    {paper.publicationType && (
                      <strong className="paper-type">{paper.publicationType}</strong>
                    )}
                    {paper.status && (
                      <span className="paper-status">
                        {localize(paper.status)}
                        {paper.year ? ` (${paper.year})` : ''}
                      </span>
                    )}
                  </h3>
                  <p className="paper-authors">
                    {paper.authors.map((author, index) => (
                      <span key={`${paper.id}-${author.name}`}>
                        <span className={author.highlight ? 'is-highlighted' : undefined}>
                          {author.name}
                        </span>
                        {index < paper.authors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                </>
              )

              return paper.url ? (
                <a
                  key={paper.id}
                  className="paper-card"
                  href={paper.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content}
                </a>
              ) : (
                <article key={paper.id} className="paper-card">
                  {content}
                </article>
              )
            })}
          </div>
        )}
      </section>

      <section id="patent" className="publication-section">
        <div className="publication-section__heading">
          <div>
            <span>02</span>
            <h2>Patent</h2>
          </div>
          <p>
            {t('publication.total')} <strong>{patents.length}</strong>
          </p>
        </div>

        {patents.length === 0 ? (
          <PublicationEmpty>{t('publication.emptyPatents')}</PublicationEmpty>
        ) : (
          <div className="patent-grid">
            {patents.map((patent) => {
              const content = (
                <>
                  <div className="patent-inventors">
                    <span aria-hidden="true">▣</span>
                    {patent.inventors.join(', ')}
                  </div>
                  <h3>{localize(patent.title)}</h3>
                  <dl>
                    <div>
                      <dt>{t('publication.country')}</dt>
                      <dd>{localize(patent.country)}</dd>
                    </div>
                    <div>
                      <dt>{t('publication.registrationNumber')}</dt>
                      <dd>
                        {patent.registrationNumber} ({patent.year})
                      </dd>
                    </div>
                  </dl>
                </>
              )

              return patent.url ? (
                <a
                  key={patent.id}
                  className="patent-card"
                  href={patent.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content}
                </a>
              ) : (
                <article key={patent.id} className="patent-card">
                  {content}
                </article>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
