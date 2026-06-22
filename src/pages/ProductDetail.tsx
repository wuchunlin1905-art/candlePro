import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ProductGallery from '../components/ProductGallery'
import Certificates from '../components/Certificates'
import Reviews from '../components/Reviews'
import FloatingContact from '../components/FloatingContact'
import { Footer } from '../components/Contact'
import { useLang } from '../context/LangContext'
import { fetchProducts } from '../lib/supabase'
import { defaultInquiryMessage, openWhatsApp } from '../lib/whatsapp'
import type { Product } from '../types'
import {
  DEFAULT_MOQ,
  getProductImages,
  PRODUCT_CATEGORIES,
  SITE_NAME,
} from '../data/defaults'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { lang, setLang } = useLang()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then((prods) => {
        const found = prods.find((p) => p.id === id && p.visible)
        if (!found) {
          setProduct(null)
        } else {
          setProduct(found)
          setRelated(
            prods.filter(
              (p) => p.visible && p.id !== id && p.category === found.category
            ).slice(0, 3)
          )
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="font-serif text-2xl text-warm-dark animate-pulse">{SITE_NAME}</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream gap-4">
        <p className="text-charcoal-light">
          {lang === 'zh' ? '产品不存在' : 'Product not found'}
        </p>
        <Link to="/" className="text-gold hover:underline text-sm">
          {lang === 'zh' ? '← 返回首页' : '← Back to Home'}
        </Link>
      </div>
    )
  }

  const name = lang === 'zh' ? product.name : product.name_en
  const desc = lang === 'zh' ? product.description : product.description_en
  const detail = product.detail?.[lang]
  const moq = product.moq ?? DEFAULT_MOQ
  const images = getProductImages(product)
  const catLabel = PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.label[lang]

  const contactWhatsApp = (message?: string) => {
    openWhatsApp(message ?? defaultInquiryMessage(lang, name))
  }

  const sampleMessage =
    lang === 'zh'
      ? `您好，我想申请样品：${name}`
      : `Hello, I'd like to request a sample for: ${name}`

  return (
    <>
      {/* 简易顶栏 */}
      <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-cream-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate('/#products')}
            className="text-sm text-charcoal-light hover:text-gold flex items-center gap-1"
          >
            ← {lang === 'zh' ? '返回产品列表' : 'Back to Products'}
          </button>
          <Link to="/" className="font-serif text-xl text-charcoal">{SITE_NAME}</Link>
          <button
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="text-xs tracking-widest uppercase px-3 py-1 border border-warm/40 rounded-full"
          >
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
        </div>
      </header>

      <main className="bg-cream">
        {/* 产品详情 */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ProductGallery images={images} alt={name} />

            <div>
              {catLabel && (
                <span className="inline-block text-[10px] tracking-widest uppercase bg-charcoal text-cream px-2.5 py-1 mb-3">
                  {catLabel}
                </span>
              )}
              <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">{name}</h1>
              <p className="text-sm text-charcoal-light mb-1">{product.scent}</p>

              <div className="flex items-baseline gap-3 my-5 pb-5 border-b border-cream-dark/50">
                <span className="font-serif text-3xl text-gold">${product.price.toFixed(2)}</span>
                <span className="text-sm text-charcoal-light">
                  / {lang === 'zh' ? '件' : 'piece'}
                </span>
              </div>

              <p className="text-sm text-charcoal-light mb-2">
                MOQ: <strong className="text-charcoal">{moq}</strong>{' '}
                {lang === 'zh' ? '件起订' : 'pcs min. order'}
              </p>

              <p className="text-charcoal-light leading-relaxed mb-4">{desc}</p>
              {detail && (
                <p className="text-sm text-charcoal-light/80 leading-relaxed mb-6">{detail}</p>
              )}

              {/* 规格参数 */}
              {product.specs && product.specs.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs tracking-widest uppercase text-warm-dark mb-3">
                    {lang === 'zh' ? '产品规格' : 'Specifications'}
                  </h3>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {product.specs.map((spec) => (
                      <div key={spec.label.en} className="contents">
                        <dt className="text-charcoal-light">{spec.label[lang]}</dt>
                        <dd className="text-charcoal font-medium">{spec.value[lang]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {product.source_url && (
                <a
                  href={product.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-xs text-charcoal-light hover:text-gold underline"
                >
                  {lang === 'zh' ? '查看 Alibaba 原页 →' : 'View on Alibaba →'}
                </a>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={() => contactWhatsApp()}
                  className="flex-1 py-3 bg-[#25D366] text-white text-sm tracking-widest uppercase hover:bg-[#1da851] transition-colors inline-flex items-center justify-center gap-2"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => contactWhatsApp(sampleMessage)}
                  className="flex-1 py-3 border border-[#25D366]/40 text-charcoal text-sm tracking-widest uppercase hover:border-[#25D366] transition-colors"
                >
                  {lang === 'zh' ? '申请样品' : 'Request Sample'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 相关产品 */}
        {related.length > 0 && (
          <section className="border-t border-cream-dark/40 bg-cream-dark/20 py-10 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl text-charcoal mb-6">
                {lang === 'zh' ? '相关产品' : 'Related Products'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group bg-white rounded-sm overflow-hidden border border-cream-dark/50 hover:border-gold/30 transition-all"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={p.image_url}
                        alt={lang === 'zh' ? p.name : p.name_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-serif text-charcoal group-hover:text-gold transition-colors">
                        {lang === 'zh' ? p.name : p.name_en}
                      </p>
                      <p className="text-sm text-gold mt-1">${p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Certificates lang={lang} />
        <Reviews lang={lang} />
      </main>

      <Footer lang={lang} />
      <FloatingContact onContact={() => contactWhatsApp()} />
    </>
  )
}
