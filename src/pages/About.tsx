import { useTranslation } from 'react-i18next'
import microscopyImage from '../assets/mycodx-microscopy.jpg'
import AboutIntro from '../components/about/AboutIntro'
import AboutVision from '../components/about/AboutVision'
import ResearchSectionHeader from '../components/research/ResearchSectionHeader'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="about-page">
      <ResearchSectionHeader />

      <header className="about-hero">
        <div className="about-hero__copy">
          <p className="about-kicker">{t('about.kicker')}</p>
          <h2>{t('about.title')}</h2>
          <p className="about-hero__lead">{t('about.lead')}</p>
        </div>

        <figure className="about-hero__visual">
          <img src={microscopyImage} alt={t('about.heroImageAlt')} />
          <figcaption>
            <span>Mycobacteria</span>
            <strong>Precision Diagnostics</strong>
          </figcaption>
        </figure>
      </header>

      <AboutIntro />
      <AboutVision />
    </div>
  )
}
