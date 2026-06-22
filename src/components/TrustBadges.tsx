import type { Lang } from '../types'
import { TRUST_BADGES } from '../data/defaults'

interface TrustBadgesProps {
  lang: Lang
}

export default function TrustBadges({ lang }: TrustBadgesProps) {
  return (
    <section className="py-10 md:py-12 bg-cream border-y border-cream-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.title.en}
              className="flex items-start gap-3 p-4 md:p-5 bg-white rounded-sm border border-cream-dark/50 hover:border-gold/30 transition-colors"
            >
              <span className="text-gold text-xl mt-0.5">{badge.icon}</span>
              <div>
                <p className="font-medium text-sm text-charcoal mb-0.5">
                  {badge.title[lang]}
                </p>
                <p className="text-xs text-charcoal-light">{badge.desc[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
