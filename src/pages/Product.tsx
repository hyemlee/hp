import { useTranslation } from 'react-i18next'

export default function Product() {
  const { t } = useTranslation()

  return (
    <div className="editorial-page equipment-page">
      <header className="editorial-page__header">
        <p>{t('equipment.kicker')}</p>
        <h1>{t('equipment.title')}</h1>
        <span>{t('equipment.description')}</span>
      </header>

      <section className="equipment-placeholder" aria-labelledby="equipment-status-title">
        <span className="equipment-placeholder__index">01 / EQUIPMENT</span>
        <div className="equipment-placeholder__copy">
          <p>{t('equipment.status')}</p>
          <div>
            <h2 id="equipment-status-title">{t('equipment.placeholderTitle')}</h2>
            <p>{t('equipment.placeholderDescription')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
