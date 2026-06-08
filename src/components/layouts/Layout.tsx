import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={isHome ? 'site-shell site-shell--home' : 'site-shell'}>
      <Header />
      <div className={isHome ? undefined : 'inner-page'}>{children}</div>
      <Footer />
    </div>
  )
}
