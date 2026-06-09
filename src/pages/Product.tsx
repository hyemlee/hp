import { useTranslation } from 'react-i18next'

export default function Product() {
  const { t } = useTranslation()

  return (
    <div className="editorial-page product-page">
      <header className="editorial-page__header">
        <p>{t('product.kicker')}</p>
        <h1>{t('product.title')}</h1>
        <span>{t('product.description')}</span>
      </header>

      <section className="product-placeholder" aria-labelledby="product-status-title">
        <span className="product-placeholder__index">01 / PRODUCT</span>
        <div className="product-placeholder__copy">
          <p>{t('product.status')}</p>
          <div>
            <h2 id="product-status-title">{t('product.placeholderTitle')}</h2>
            <p>{t('product.placeholderDescription')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
