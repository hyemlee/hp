import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import assayImage from '../assets/mycodx-96well-assay.jpg'
import collaborationImage from '../assets/mycodx-collaboration.jpg'
import petriCultureImage from '../assets/mycodx-petri-culture.jpg'

interface RevealProps {
  children: ReactNode
  className?: string
}

function Reveal({ children, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.16 }
    )

    observer.observe(element)
    const visibilityFallback = window.setTimeout(() => {
      const bounds = element.getBoundingClientRect()
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        setVisible(true)
      }
    }, 240)

    return () => {
      observer.disconnect()
      window.clearTimeout(visibilityFallback)
    }
  }, [])

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const location = useLocation()
  const [showTopButton, setShowTopButton] = useState(false)

  const capabilityKeys = ['detection', 'resistance', 'platform'] as const

  useEffect(() => {
    if (!location.hash) return

    const timeout = window.setTimeout(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView()
    }, 80)

    return () => window.clearTimeout(timeout)
  }, [location.hash])

  useEffect(() => {
    const updateTopButton = () => {
      setShowTopButton(window.scrollY > Math.max(520, window.innerHeight * 0.65))
    }

    updateTopButton()
    window.addEventListener('scroll', updateTopButton, { passive: true })
    return () => window.removeEventListener('scroll', updateTopButton)
  }, [])

  return (
    <div className={`home-page ${location.hash ? 'home-page--hash' : ''}`}>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-visual">
          <div className="home-visual__images">
            <img
              src={assayImage}
              alt={t('home.visuals.assay')}
              className="is-active"
            />
          </div>
          <div className="home-visual__veil" />

          <div className="home-visual__copy">
            <p className="home-eyebrow">{t('home.eyebrow')}</p>
            <h1 id="home-hero-title">
              {t('home.titleLine1')}
              <span>{t('home.titleLine2')}</span>
            </h1>
            <p className="home-visual__description">{t('home.description')}</p>
          </div>

          <div className="home-visual__meta" aria-hidden="true">
            <span>MYCODX / R&amp;D CENTER</span>
            <span>CHANGWON, KOREA</span>
          </div>
        </div>
      </section>

      <main>
        <section id="focus" className="home-focus">
          <Reveal className="home-focus__heading">
            <p className="section-kicker">{t('home.focus.kicker')}</p>
            <h2>{t('home.focus.title')}</h2>
          </Reveal>

          <Reveal className="home-focus__body">
            <p>{t('home.focus.description')}</p>
            <Link to="/research/areas" className="text-link">
              {t('home.focus.link')}
              <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </section>

        <section className="home-capabilities" aria-labelledby="capabilities-title">
          <Reveal className="home-capabilities__heading">
            <p className="section-kicker">{t('home.capabilities.kicker')}</p>
            <h2 id="capabilities-title">{t('home.capabilities.title')}</h2>
          </Reveal>

          <div className="home-capabilities__grid">
            {capabilityKeys.map((key, index) => (
              <Reveal key={key} className="capability-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3 lang="en">{t(`home.capabilities.${key}.title`)}</h3>
                <p>{t(`home.capabilities.${key}.description`)}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="home-story">
          <div className="home-story__image">
            <img src={collaborationImage} alt={t('home.visuals.collaboration')} />
          </div>
          <Reveal className="home-story__content">
            <p className="section-kicker">{t('home.story.kicker')}</p>
            <h2>{t('home.story.title')}</h2>
            <p>{t('home.story.description')}</p>
            <Link to="/research/introduction" className="text-link text-link--light">
              {t('home.story.link')}
              <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </section>

        <section id="contact" className="home-contact">
          <div className="home-contact__visual">
            <img src={petriCultureImage} alt={t('home.visuals.petriCulture')} />
          </div>
          <Reveal className="home-contact__content">
            <p className="section-kicker">{t('home.contact.kicker')}</p>
            <h2>{t('home.contact.title')}</h2>
            <p>{t('home.contact.description')}</p>
            <a className="contact-link" href="mailto:info@mycodx.com" lang="en">
              info@mycodx.com
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </section>
      </main>

      <button
        type="button"
        className={`top-button ${showTopButton ? 'is-visible' : ''}`}
        aria-label={t('home.backToTop')}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span aria-hidden="true">↑</span>
        TOP
      </button>
    </div>
  )
}
