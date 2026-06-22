import { useState } from 'react'
import type { Lang } from '../types'
import { REVIEWS } from '../data/defaults'

interface ReviewsProps {
  lang: Lang
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-gold' : 'text-cream-dark'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews({ lang }: ReviewsProps) {
  const [active, setActive] = useState(0)
  const review = REVIEWS[active]

  const avgRating = (
    REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length
  ).toFixed(1)

  return (
    <section id="reviews" className="py-16 md:py-20 bg-cream-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-warm-dark mb-3">
              {lang === 'zh' ? '客户评价' : 'Customer Reviews'}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              {lang === 'zh' ? '全球买家真实反馈' : 'Verified Buyer Feedback'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Stars rating={5} />
            <span className="font-serif text-2xl text-gold">{avgRating}</span>
            <span className="text-sm text-charcoal-light">
              ({REVIEWS.length} {lang === 'zh' ? '条评价' : 'reviews'})
            </span>
          </div>
        </div>

        {/* 主评价卡片 */}
        <div className="bg-white rounded-sm border border-cream-dark/50 p-6 md:p-10 mb-6 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-cream-dark/50 flex items-center justify-center text-2xl shrink-0">
              {review.flag}
            </div>
            <div>
              <p className="font-medium text-charcoal">{review.name}</p>
              <p className="text-xs text-charcoal-light">
                {review.country[lang]} · {review.date}
              </p>
            </div>
            <div className="ml-auto">
              <Stars rating={review.rating} />
            </div>
          </div>
          <p className="text-xs text-gold mb-2">{review.product[lang]}</p>
          <p className="text-charcoal-light leading-relaxed text-sm md:text-base">
            "{review.text[lang]}"
          </p>
        </div>

        {/* 评价列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setActive(i)}
              className={`text-left p-4 rounded-sm border transition-all ${
                i === active
                  ? 'bg-white border-gold shadow-sm'
                  : 'bg-white/60 border-cream-dark/50 hover:border-gold/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{r.flag}</span>
                <span className="text-sm font-medium text-charcoal">{r.name}</span>
                <Stars rating={r.rating} />
              </div>
              <p className="text-xs text-charcoal-light line-clamp-3">"{r.text[lang]}"</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
