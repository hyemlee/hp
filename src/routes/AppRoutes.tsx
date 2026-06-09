import { Navigate, Routes, Route } from 'react-router-dom'
import About from '../pages/About'
import Gallery from '../pages/Gallery'
import Home from '../pages/Home'
import News from '../pages/News'
import Product from '../pages/Product'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/product" element={<Product />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/news" element={<News />} />
      <Route path="/research" element={<Navigate to="/about" replace />} />
      <Route path="/research/introduction" element={<Navigate to="/about" replace />} />
      <Route path="/research/areas" element={<Navigate to="/" replace />} />
      <Route path="/publication" element={<Navigate to="/" replace />} />
      <Route path="/members" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
