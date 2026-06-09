import { Navigate, Routes, Route } from 'react-router-dom'
import About from '../pages/About'
import Gallery from '../pages/Gallery'
import Home from '../pages/Home'
import Members from '../pages/Members'
import News from '../pages/News'
import Product from '../pages/Product'
import Publication from '../pages/Publication'
import Research from '../pages/Research'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Navigate to="/research/introduction" replace />} />
      <Route path="/research" element={<Navigate to="/research/introduction" replace />} />
      <Route path="/research/introduction" element={<About />} />
      <Route path="/research/areas" element={<Research />} />
      <Route path="/product" element={<Product />} />
      <Route path="/publication" element={<Publication />} />
      <Route path="/members" element={<Members />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/news" element={<News />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
