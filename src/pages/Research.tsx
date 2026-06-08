import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ResearchGrid from '../components/research/ResearchGrid'
import ResearchSectionHeader from '../components/research/ResearchSectionHeader'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import { useDataStore } from '../store/dataStore'

export default function Research() {
  const { t } = useTranslation()
  const research = useDataStore((state) => state.research)
  const researchLoading = useDataStore((state) => state.researchLoading)
  const researchError = useDataStore((state) => state.researchError)
  const fetchResearch = useDataStore((state) => state.fetchResearch)

  useEffect(() => {
    fetchResearch()
  }, [fetchResearch])

  return (
    <div className="research-page">
      <ResearchSectionHeader />

      <section className="research-page__intro">
        <div>
          <p className="research-kicker">{t('research.kicker')}</p>
          <h2>{t('research.title')}</h2>
          <p>{t('research.description')}</p>
        </div>
      </section>

      <section className="research-initiatives">
        <div className="research-initiatives__heading">
          <span>01</span>
          <div>
            <h2>{t('research.initiativesTitle')}</h2>
            <p>{t('research.initiativesDescription')}</p>
          </div>
        </div>
        {researchLoading && <LoadingSpinner />}
        {researchError && <ErrorMessage error={researchError} retry={fetchResearch} />}
        {!researchLoading && !researchError && <ResearchGrid items={research} />}
      </section>
    </div>
  )
}
