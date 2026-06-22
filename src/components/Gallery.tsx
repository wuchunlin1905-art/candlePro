import { useState } from 'react'
import type { SiteImage, Lang } from '../types'
import SafeImage from './SafeImage'

interface GalleryProps {
  images: SiteImage[]
  lang: Lang
}

export default function Gallery({ images, lang }: GalleryProps) {
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())

  const items = images.filter(
    (i) => i.section === 'gallery' && i.visible && !hiddenIds.has(i.id)
  )

  if (!items.length) return null

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-warm-dark mb-3">
            {lang === 'zh' ? '匠心工艺' : 'Craftsmanship'}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal">
            {lang === 'zh' ? '每一支，都是艺术品' : 'Every piece is art'}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {items.map((item, idx) => (
            <GalleryItem
              key={item.id}
              item={item}
              featured={idx === 0}
              onImageFailed={() =>
                setHiddenIds((prev) => new Set(prev).add(item.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryItem({
  item,
  featured,
  onImageFailed,
}: {
  item: SiteImage
  featured: boolean
  onImageFailed: () => void
}) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div
      className={`group relative overflow-hidden rounded-sm bg-cream-dark/30 aspect-square ${
        featured ? 'col-span-2 row-span-2 md:aspect-auto md:min-h-[280px]' : ''
      }`}
    >
      <SafeImage
        src={item.image_url}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        onLoadFailed={() => {
          setVisible(false)
          onImageFailed()
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6 pointer-events-none">
        <p className="text-cream font-serif text-lg md:text-xl">{item.title}</p>
      </div>
    </div>
  )
}
