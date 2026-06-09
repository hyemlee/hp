import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import mycoDxLogo from '../../assets/logo/mycodx-wordmark.png'
import { homeNavigation } from '../../data/homeNavigation'

export default function Header() {
  const { i18n, t } = useTranslation()
  const location = useLocation()
  const [headerHidden, setHeaderHidden] = useState(false)
  const lastScrollY = useRef(0)
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) {
      lastScrollY.current = 0
      return
    }

    lastScrollY.current = window.scrollY

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY.current

      if (currentScrollY < 32) {
        setHeaderHidden(false)
      } else if (scrollingDown && currentScrollY > 120) {
        setHeaderHidden(true)
      } else if (!scrollingDown) {
        setHeaderHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', updateHeaderVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateHeaderVisibility)
  }, [isHome])

  const toggleLanguage = () => {
    void i18n.changeLanguage(i18n.language.startsWith('ko') ? 'en' : 'ko')
  }

  const returnHome = () => {
    setHeaderHidden(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`site-header ${isHome ? 'site-header--home' : 'site-header--inner'} ${
        isHome && headerHidden ? 'site-header--hidden' : ''
      }`}
    >
      <div className="site-header__inner">
        <Link to="/" className="site-logo" aria-label="MycoDx home" onClick={returnHome}>
          <img src={mycoDxLogo} alt="MycoDx" />
        </Link>

        <div className="site-header__actions">
          <nav className="site-primary-nav" aria-label={t('header.primaryNav')}>
            {homeNavigation.map((item) => {
              const isActive = item.path === '/#contact'
                ? false
                : location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={isActive ? 'is-active' : undefined}
                >
                  {t(item.titleKey)}
                </Link>
              )
            })}
          </nav>

          <button type="button" className="language-button" onClick={toggleLanguage}>
            {i18n.language.startsWith('ko') ? 'EN' : 'KO'}
            <span className="sr-only">{t('header.changeLanguage')}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
