import { useTranslation } from 'react-i18next'
import assayImage from '../assets/mycodx-96well-assay.jpg'
import collaborationImage from '../assets/mycodx-collaboration.jpg'
import microscopyImage from '../assets/mycodx-microscopy.jpg'
import petriCultureImage from '../assets/mycodx-petri-culture.jpg'

const galleryImages = [
  { src: assayImage, altKey: 'home.visuals.assay' },
  { src: petriCultureImage, altKey: 'home.visuals.petriCulture' },
  { src: microscopyImage, altKey: 'home.visuals.microscopy' },
  { src: collaborationImage, altKey: 'home.visuals.collaboration' },
] as const

export default function Gallery() {
  const { t } = useTranslation()

  return (
    <div className="gallery-page">
      <header>
        <p>{t('gallery.kicker')}</p>
        <h1>{t('gallery.title')}</h1>
        <span>{t('gallery.description')}</span>
      </header>

      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <figure key={image.src}>
            <img src={image.src} alt={t(image.altKey)} />
            <figcaption>{String(index + 1).padStart(2, '0')} / MycoDx R&amp;D</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
