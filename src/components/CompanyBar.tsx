import type { Lang } from '../types'
import { formatWhatsAppDisplay } from '../lib/whatsapp'
import { COMPANY } from '../data/defaults'

interface CompanyBarProps {
  lang: Lang
  onContact: () => void
}

export default function CompanyBar({ lang, onContact }: CompanyBarProps) {
  return (
    <section className="bg-white border-b border-cream-dark/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 bg-gold/15 text-gold text-xs font-medium tracking-wide uppercase">
                {COMPANY.type[lang]}
              </span>
              <span className="text-xs text-charcoal-light">
                {COMPANY.years}{lang === 'zh' ? '年' : ' yrs'}
              </span>
              <span className="text-xs text-charcoal-light/50">·</span>
              <span className="text-xs text-charcoal-light">{COMPANY.location[lang]}</span>
            </div>
            <h2 className="font-serif text-xl md:text-2xl text-charcoal mb-2">
              {COMPANY.name[lang]}
            </h2>
            <p className="text-sm text-charcoal-light">
              {lang === 'zh' ? '主营：' : 'Main: '}
              {COMPANY.categories[lang].join(' · ')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="hidden sm:block text-right mr-2">
              <p className="text-xs text-charcoal-light">{COMPANY.responseTime[lang]}</p>
              <p className="text-sm text-gold font-medium">WhatsApp {formatWhatsAppDisplay()}</p>
            </div>
            <button
              onClick={onContact}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#25D366] text-white text-sm tracking-widest uppercase hover:bg-[#1da851] transition-colors"
            >
              <WhatsAppIcon />
              {lang === 'zh' ? 'WhatsApp 联系' : 'WhatsApp Us'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
