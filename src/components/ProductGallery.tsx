import { useEffect, useState } from 'react'
import SafeImage from './SafeImage'

interface ProductGalleryProps {
  images: string[]
  alt: string
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [validImages, setValidImages] = useState(images)
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    setValidImages(images)
    setActive(0)
  }, [images])

  const handleFail = (url: string) => {
    setValidImages((prev) => prev.filter((u) => u !== url))
    setActive(0)
  }

  if (!validImages.length) return null

  const current = validImages[active] ?? validImages[0]

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative w-full aspect-square bg-cream-dark/20 overflow-hidden rounded-sm group cursor-zoom-in"
        >
          <SafeImage
            src={current}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onLoadFailed={() => handleFail(current)}
          />
          {validImages.length > 1 && (
            <span className="absolute bottom-3 right-3 bg-charcoal/60 text-cream text-xs px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
              {active + 1} / {validImages.length}
            </span>
          )}
        </button>

        {validImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {validImages.map((url, i) => (
              <button
                key={url}
                type="button"
                onClick={() => setActive(i)}
                className={`shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-sm border-2 transition-colors ${
                  i === active ? 'border-gold' : 'border-transparent hover:border-cream-dark'
                }`}
              >
                <SafeImage
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                  onLoadFailed={() => handleFail(url)}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-charcoal/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-cream/80 hover:text-cream p-2"
            onClick={() => setLightbox(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {validImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/80 hover:text-cream p-2"
                onClick={(e) => {
                  e.stopPropagation()
                  setActive((a) => (a - 1 + validImages.length) % validImages.length)
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/80 hover:text-cream p-2"
                onClick={(e) => {
                  e.stopPropagation()
                  setActive((a) => (a + 1) % validImages.length)
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          <img
            src={validImages[active]}
            alt={alt}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
