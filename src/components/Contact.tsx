import { Link } from 'react-router-dom'
import type { Lang } from '../types'
import { formatWhatsAppDisplay, whatsappUrl } from '../lib/whatsapp'
import { COMPANY } from '../data/defaults'

interface ContactProps {
  lang: Lang
  onContact: () => void
}

export default function Contact({ lang, onContact }: ContactProps) {
  const waDisplay = formatWhatsAppDisplay()

  return (
    <section id="contact" className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-warm-dark mb-3">
              {lang === 'zh' ? '联系我们' : 'Contact Us'}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {lang === 'zh' ? 'WhatsApp 即时沟通' : 'Chat on WhatsApp'}
            </h2>
            <p className="text-charcoal-light mb-6 leading-relaxed">
              {lang === 'zh'
                ? '通过 WhatsApp 联系我们，获取报价、样品及定制方案。支持定制包装、Logo 贴牌及小批量试单。'
                : 'Reach us on WhatsApp for quotes, samples & customization. Private label & small trial orders welcome.'}
            </p>
            <ul className="space-y-3 text-sm text-charcoal-light">
              <li className="flex items-center gap-2">
                <span className="text-[#25D366]">●</span>
                WhatsApp: <strong className="text-charcoal">{waDisplay}</strong>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">◎</span> {COMPANY.location[lang]}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">◷</span> {COMPANY.responseTime[lang]}
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-sm border border-cream-dark/50 shadow-sm">
            <h3 className="font-serif text-xl text-charcoal mb-4">
              {lang === 'zh' ? '立即联系' : 'Get in Touch'}
            </h3>
            <p className="text-sm text-charcoal-light mb-6">
              {lang === 'zh'
                ? '点击下方按钮，直接通过 WhatsApp 与我们沟通。'
                : 'Click below to start a WhatsApp conversation with us.'}
            </p>
            <button
              onClick={onContact}
              className="w-full py-3 bg-[#25D366] text-white text-sm tracking-widest uppercase hover:bg-[#1da851] transition-colors mb-3 inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {lang === 'zh' ? '打开 WhatsApp' : 'Open WhatsApp'}
            </button>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 border border-[#25D366]/40 text-charcoal text-sm tracking-widest uppercase text-center hover:border-[#25D366] transition-colors"
            >
              {waDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-charcoal text-cream/60 py-10 border-t border-cream/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <p className="font-serif text-xl text-cream mb-2">{COMPANY.name[lang]}</p>
            <p className="text-xs leading-relaxed">
              {lang === 'zh' ? '跨境香氛蜡烛 · 无火香薰 · 礼盒定制' : 'Cross-border candles · diffusers · gift sets'}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-cream/40 mb-2">
              {lang === 'zh' ? '主营类目' : 'Categories'}
            </p>
            <p className="text-xs">{COMPANY.categories[lang].join(' · ')}</p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-cream/40 mb-2">
              WhatsApp
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#25D366] hover:underline"
            >
              {formatWhatsAppDisplay()}
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-cream/5 pt-6">
          <p className="text-xs">
            © {new Date().getFullYear()} Lumière.{' '}
            {lang === 'zh' ? '保留所有权利' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-4 text-xs text-cream/30">
            <span>{lang === 'zh' ? '图片素材来自 Pexels' : 'Images from Pexels'}</span>
            <Link to="/admin" className="hover:text-cream/60 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
