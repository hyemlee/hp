import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import mycoDxLogo from '../../assets/logo/mycodx-wordmark.png'
import { homeNavigation } from '../../data/homeNavigation'

export default function Header() {
  const { i18n, t } = useTranslation()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const lastScrollY = useRef(0)
  const isHome = location.pathname === '/'

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [mobileOpen])

  useEffect(() => {
    if (!isHome) {
      lastScrollY.current = 0
      return
    }

    lastScrollY.current = window.scrollY

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY.current

      if (mobileOpen || currentScrollY < 32) {
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
  }, [isHome, mobileOpen])

  const toggleLanguage = () => {
    void i18n.changeLanguage(i18n.language.startsWith('ko') ? 'en' : 'ko')
  }

  return (
    <header
      className={`site-header ${isHome ? 'site-header--home' : 'site-header--inner'} ${
        isHome && headerHidden && !mobileOpen ? 'site-header--hidden' : ''
      } ${mobileOpen ? 'site-header--menu-open' : ''}`}
    >
      <div className="site-header__inner">
        <Link to="/" className="site-logo" aria-label="MycoDx home">
          <img src={mycoDxLogo} alt="MycoDx" />
        </Link>

        <div className="site-header__actions">
          <a className="site-header__contact" href={isHome ? '#contact' : '/#contact'}>
            {t('header.contact')}
          </a>

          <button type="button" className="language-button" onClick={toggleLanguage}>
            {i18n.language.startsWith('ko') ? 'EN' : 'KO'}
            <span className="sr-only">{t('header.changeLanguage')}</span>
          </button>

          <button
            type="button"
            className={`menu-button ${mobileOpen ? 'is-open' : ''}`}
            aria-label={mobileOpen ? t('header.closeMenu') : t('header.openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`menu-backdrop ${mobileOpen ? 'is-open' : ''}`}
        aria-label={t('header.closeMenu')}
        tabIndex={mobileOpen ? 0 : -1}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        id="mobile-navigation"
        className={`menu-drawer ${mobileOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="menu-drawer__inner">
          <p>{t('home.indexLabel')}</p>
          <div className="menu-drawer__intro">{t('home.indexIntro')}</div>
          <nav aria-label={t('header.mobileNav')}>
            {homeNavigation.map((item, index) => {
              const mainContent = (
                <>
                  <span className="menu-drawer__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="menu-drawer__label">
                    <strong lang="en">{item.title}</strong>
                    <small>{t(item.detailKey)}</small>
                  </span>
                  <span className="menu-drawer__arrow" aria-hidden="true">↗</span>
                </>
              )

              return (
                <div key={item.title} className="menu-drawer__item">
                  {item.path.startsWith('#') ? (
                    <a
                      className="menu-drawer__main-link"
                      href={isHome ? item.path : `/${item.path}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {mainContent}
                    </a>
                  ) : (
                    <Link
                      className="menu-drawer__main-link"
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                    >
                      {mainContent}
                    </Link>
                  )}

                  {item.children && (
                    <div className="menu-drawer__subnav">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.titleKey ? t(child.titleKey) : child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
          <div className="menu-drawer__meta">
            <span>MYCODX / R&amp;D CENTER</span>
            <a href="mailto:info@mycodx.com">info@mycodx.com</a>
          </div>
        </div>
      </aside>
    </header>
  )
}
