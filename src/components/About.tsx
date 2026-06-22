import { useState } from 'react'
import type { SiteImage, Lang } from '../types'
import SafeImage from './SafeImage'

interface AboutProps {
  image: SiteImage | undefined
  lang: Lang
}

export default function About({ image, lang }: AboutProps) {
  const bg = image?.image_url ?? '/images/about-1.jpg'
  const [showImage, setShowImage] = useState(true)

  return (
    <section id="about" className="py-16 md:py-24 bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-10 md:gap-16 items-center ${showImage ? 'md:grid-cols-2' : ''}`}>
          {showImage && (
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-sm bg-charcoal-light/20">
              <SafeImage
                src={bg}
                alt={lang === 'zh' ? '关于我们' : 'About us'}
                className="w-full h-full object-cover"
                loading="lazy"
                onLoadFailed={() => setShowImage(false)}
              />
            </div>
          )}

          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">
              {lang === 'zh' ? '品牌故事' : 'Our Story'}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">
              {lang === 'zh' ? '用光与香，编织日常的诗意' : 'Weaving poetry into everyday light'}
            </h2>
            <div className="space-y-4 text-cream/80 leading-relaxed">
              {lang === 'zh' ? (
                <>
                  <p>
                    Lumière 诞生于对慢生活的热爱。我们相信，一支蜡烛不仅是光源，更是连接内心与空间的桥梁。
                  </p>
                  <p>
                    每一款产品均采用天然大豆蜡、进口香精与手工浇注工艺。从纽约到东京，从伦敦到悉尼——我们为全球客户提供跨境直邮服务。
                  </p>
                  <p>
                    可持续包装、零残忍测试、环保可回收——这是我们对地球与您的承诺。
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Lumière was born from a love of slow living. We believe a candle is more than light — it's a bridge between your inner world and your space.
                  </p>
                  <p>
                    Every product uses natural soy wax, premium fragrances, and hand-poured craftsmanship. From New York to Tokyo, London to Sydney — we ship worldwide.
                  </p>
                  <p>
                    Sustainable packaging, cruelty-free, recyclable — our promise to you and the planet.
                  </p>
                </>
              )}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8">
              {[
                { num: '40+', label: lang === 'zh' ? '燃烧小时' : 'Burn Hours' },
                { num: '100%', label: lang === 'zh' ? '天然大豆蜡' : 'Natural Soy' },
                { num: '50+', label: lang === 'zh' ? '覆盖国家' : 'Countries' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-2xl md:text-3xl text-gold">{stat.num}</p>
                  <p className="text-xs text-cream/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
