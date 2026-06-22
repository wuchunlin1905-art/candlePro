import type { Lang } from '../types'
import { CERTIFICATES } from '../data/defaults'

interface CertificatesProps {
  lang: Lang
}

export default function Certificates({ lang }: CertificatesProps) {
  return (
    <section id="certificates" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs tracking-[0.4em] uppercase text-warm-dark mb-3">
            {lang === 'zh' ? '资质认证' : 'Certifications'}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">
            {lang === 'zh' ? '国际认证 · 品质保障' : 'International Certs · Quality Assured'}
          </h2>
          <p className="text-sm text-charcoal-light max-w-xl mx-auto">
            {lang === 'zh'
              ? '所有产品均通过国际权威认证，符合欧美市场准入标准'
              : 'All products certified to meet EU & US market entry standards'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="group relative bg-cream rounded-sm border border-cream-dark/60 overflow-hidden hover:shadow-lg hover:border-gold/30 transition-all duration-300"
            >
              {/* 证书视觉 */}
              <div
                className="relative h-44 flex flex-col items-center justify-center p-6"
                style={{
                  background: `linear-gradient(135deg, ${cert.color}15 0%, ${cert.color}05 100%)`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-3 border-2"
                  style={{ borderColor: cert.color, color: cert.color }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span
                  className="text-[10px] tracking-[0.3em] uppercase font-medium"
                  style={{ color: cert.color }}
                >
                  {cert.year}
                </span>
              </div>

              <div className="p-5 border-t border-cream-dark/40">
                <h3 className="font-serif text-lg text-charcoal mb-1 group-hover:text-gold transition-colors">
                  {cert.name[lang]}
                </h3>
                <p className="text-xs text-charcoal-light">{cert.issuer[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
