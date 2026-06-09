import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type TouchEvent,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import collaborationImage from '../assets/mycodx-collaboration.jpg'
import heroAssayImage from '../assets/mycodx-hero-assay.jpg'
import heroCollaborationImage from '../assets/mycodx-hero-collaboration.jpg'
import heroCultureImage from '../assets/mycodx-hero-culture.jpg'
import petriCultureImage from '../assets/mycodx-petri-culture.jpg'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

const SLIDE_DURATION = 6000

function Reveal({ children, className = '', delay = 0 }: RevealProps) {
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
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const location = useLocation()
  const touchStartX = useRef<number | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const capabilityKeys = ['detection', 'resistance', 'platform'] as const
  const heroSlides = [
    {
      src: heroAssayImage,
      altKey: 'home.visuals.assay',
      labelKey: 'home.slides.assay',
    },
    {
      src: heroCultureImage,
      altKey: 'home.visuals.petriCulture',
      labelKey: 'home.slides.culture',
    },
    {
      src: heroCollaborationImage,
      altKey: 'home.visuals.collaboration',
      labelKey: 'home.slides.collaboration',
    },
  ] as const

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (heroPaused || reduceMotion) return

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        setActiveSlide((current) => (current + 1) % heroSlides.length)
      }
    }, SLIDE_DURATION)

    return () => window.clearInterval(interval)
  }, [heroPaused, reduceMotion, heroSlides.length])

  useEffect(() => {
    if (reduceMotion) return

    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]')
    )
    let animationFrame = 0

    const updateParallax = () => {
      const viewportCenter = window.innerHeight / 2

      parallaxElements.forEach((element) => {
        const bounds = element.getBoundingClientRect()
        const elementCenter = bounds.top + bounds.height / 2
        const offset = Math.max(
          -32,
          Math.min(32, (viewportCenter - elementCenter) * 0.045)
        )

        element.style.setProperty('--parallax-y', `${offset}px`)
      })
    }

    const requestParallaxUpdate = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true })
    window.addEventListener('resize', requestParallaxUpdate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', requestParallaxUpdate)
      window.removeEventListener('resize', requestParallaxUpdate)
    }
  }, [reduceMotion])

  useEffect(() => {
    if (!location.hash) return

    const timeout = window.setTimeout(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView()
    }, 80)

    return () => window.clearTimeout(timeout)
  }, [location.hash])

  const showPreviousSlide = () => {
    setActiveSlide((current) => (
      current === 0 ? heroSlides.length - 1 : current - 1
    ))
  }

  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length)
  }

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
    setHeroPaused(true)
  }

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current
    const endX = event.changedTouches[0]?.clientX

    touchStartX.current = null
    setHeroPaused(false)

    if (startX === null || endX === undefined) return

    const distance = endX - startX
    if (Math.abs(distance) < 48) return

    if (distance > 0) {
      showPreviousSlide()
    } else {
      showNextSlide()
    }
  }

  return (
    <div className={`home-page ${location.hash ? 'home-page--hash' : ''}`}>
      <section
        className={`home-hero ${heroPaused ? 'is-paused' : ''}`}
        aria-labelledby="home-hero-title"
        aria-roledescription="carousel"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
        onFocusCapture={() => setHeroPaused(true)}
        onBlurCapture={() => setHeroPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="home-visual">
          <div className="home-visual__images">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={index === activeSlide ? t(slide.altKey) : ''}
                className={index === activeSlide ? 'is-active' : ''}
                aria-hidden={index !== activeSlide}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            ))}
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

          <div className="home-visual__scroll" aria-hidden="true">
            <span>{t('home.scroll')}</span>
            <i />
          </div>

          <div className="home-slider">
            <div className="home-slider__status" aria-live="polite">
              <strong>{String(activeSlide + 1).padStart(2, '0')}</strong>
              <span>/ {String(heroSlides.length).padStart(2, '0')}</span>
              <small>{t(heroSlides[activeSlide].labelKey)}</small>
            </div>

            <div className="home-slider__progress" aria-hidden="true">
              <span
                key={`${activeSlide}-${heroPaused ? 'paused' : 'playing'}`}
                style={{ '--slide-duration': `${SLIDE_DURATION}ms` } as CSSProperties}
              />
            </div>

            <div className="home-slider__buttons">
              <button
                type="button"
                aria-label={t('home.slides.previous')}
                onClick={showPreviousSlide}
              >
                ←
              </button>
              <button
                type="button"
                aria-label={t('home.slides.next')}
                onClick={showNextSlide}
              >
                →
              </button>
            </div>
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
              <Reveal
                key={key}
                className="capability-card"
                delay={index * 120}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3 lang="en">{t(`home.capabilities.${key}.title`)}</h3>
                <p>{t(`home.capabilities.${key}.description`)}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="home-story">
          <Reveal className="home-story__image reveal-image reveal-image--left">
            <img
              src={collaborationImage}
              alt={t('home.visuals.collaboration')}
              data-parallax
            />
          </Reveal>
          <Reveal className="home-story__content" delay={160}>
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
          <Reveal className="home-contact__visual reveal-image reveal-image--up">
            <img
              src={petriCultureImage}
              alt={t('home.visuals.petriCulture')}
              data-parallax
            />
          </Reveal>
          <Reveal className="home-contact__content" delay={140}>
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
    </div>
  )
}
