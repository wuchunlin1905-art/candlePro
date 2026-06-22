import type { Lang, ProductCategory } from '../types'
import { PRODUCT_CATEGORIES } from '../data/defaults'

interface CategoryNavProps {
  lang: Lang
  active: ProductCategory | 'all'
  onChange: (cat: ProductCategory | 'all') => void
  counts: Record<string, number>
}

export default function CategoryNav({
  lang,
  active,
  onChange,
  counts,
}: CategoryNavProps) {
  return (
    <div className="sticky top-16 md:top-20 z-40 bg-cream/95 backdrop-blur-md border-b border-cream-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          {PRODUCT_CATEGORIES.map((cat) => {
            const count = counts[cat.id] ?? 0
            if (cat.id !== 'all' && count === 0) return null
            return (
              <button
                key={cat.id}
                onClick={() => onChange(cat.id)}
                className={`shrink-0 px-4 py-2 text-sm transition-colors rounded-full border ${
                  active === cat.id
                    ? 'bg-charcoal text-cream border-charcoal'
                    : 'bg-white text-charcoal-light border-cream-dark hover:border-gold/40'
                }`}
              >
                {cat.label[lang]}
                {count > 0 && (
                  <span className="ml-1.5 text-xs opacity-70">({count})</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
