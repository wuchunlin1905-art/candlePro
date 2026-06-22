import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import CompanyBar from '../components/CompanyBar'
import TrustBadges from '../components/TrustBadges'
import CategoryNav from '../components/CategoryNav'
import Gallery from '../components/Gallery'
import Products from '../components/Products'
import About from '../components/About'
import Certificates from '../components/Certificates'
import Reviews from '../components/Reviews'
import Contact, { Footer } from '../components/Contact'
import FloatingContact from '../components/FloatingContact'
import { useLang } from '../context/LangContext'
import { fetchSiteImages, fetchProducts } from '../lib/supabase'
import { defaultInquiryMessage, openWhatsApp } from '../lib/whatsapp'
import type { Product, ProductCategory, SiteImage } from '../types'
import { DEFAULT_IMAGES, DEFAULT_PRODUCTS } from '../data/defaults'

export default function Home() {
  const { lang, setLang } = useLang()
  const [images, setImages] = useState<SiteImage[]>(DEFAULT_IMAGES)
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ProductCategory | 'all'>('all')

  useEffect(() => {
    Promise.all([fetchSiteImages(), fetchProducts()])
      .then(([imgs, prods]) => {
        setImages(imgs)
        setProducts(prods)
      })
      .finally(() => setLoading(false))
  }, [])

  const aboutImage = images.find((i) => i.section === 'about' && i.visible)

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.filter((p) => p.visible).length }
    for (const p of products) {
      if (!p.visible) continue
      const cat = p.category ?? 'candles'
      counts[cat] = (counts[cat] ?? 0) + 1
    }
    return counts
  }, [products])

  const contactWhatsApp = (productName?: string) => {
    openWhatsApp(defaultInquiryMessage(lang, productName))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="font-serif text-2xl text-warm-dark animate-pulse">Lumière</div>
      </div>
    )
  }

  return (
    <>
      <Header
        lang={lang}
        onLangChange={setLang}
        search={search}
        onSearchChange={setSearch}
        onContact={() => contactWhatsApp()}
      />
      <main>
        <Hero lang={lang} />
        <CompanyBar lang={lang} onContact={() => contactWhatsApp()} />
        <TrustBadges lang={lang} />
        <CategoryNav
          lang={lang}
          active={category}
          onChange={setCategory}
          counts={categoryCounts}
        />
        <Products
          products={products}
          lang={lang}
          category={category}
          search={search}
          onContact={contactWhatsApp}
        />
        <Gallery images={images} lang={lang} />
        <About image={aboutImage} lang={lang} />
        <Certificates lang={lang} />
        <Reviews lang={lang} />
        <Contact lang={lang} onContact={() => contactWhatsApp()} />
      </main>
      <Footer lang={lang} />
      <FloatingContact onContact={() => contactWhatsApp()} />
    </>
  )
}
