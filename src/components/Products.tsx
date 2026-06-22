import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product, Lang, ProductCategory } from '../types'
import { DEFAULT_MOQ, PRODUCT_CATEGORIES } from '../data/defaults'
import { filterProductsBySearch } from '../lib/search'
import SafeImage from './SafeImage'

const PAGE_SIZE = 24

interface ProductsProps {
  products: Product[]
  lang: Lang
  category: ProductCategory | 'all'
  search: string
  onContact: (productName?: string) => void
}

export default function Products({
  products,
  lang,
  category,
  search,
  onContact,
}: ProductsProps) {
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const visible = products.filter(
      (p) => p.visible && !hiddenIds.has(p.id) && (category === 'all' || p.category === category)
    )
    return filterProductsBySearch(visible, search)
  }, [products, category, search, hiddenIds])

  const shown = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [category, search])

  const hideProduct = (id: string) => {
    setHiddenIds((prev) => new Set(prev).add(id))
  }

  const catLabel = (cat?: ProductCategory) => {
    const found = PRODUCT_CATEGORIES.find((c) => c.id === cat)
    return found ? found.label[lang] : ''
  }

  return (
    <section id="products" className="py-12 md:py-16 bg-cream-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-warm-dark mb-2">
              {lang === 'zh' ? '产品展示' : 'Product Showcase'}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              {lang === 'zh' ? '热销产品' : 'Hot Products'}
            </h2>
          </div>
          <p className="text-sm text-charcoal-light">
            {search.trim()
              ? lang === 'zh'
                ? `搜索「${search.trim()}」共 ${filtered.length} 款`
                : `${filtered.length} result(s) for "${search.trim()}"`
              : lang === 'zh'
                ? `共 ${filtered.length} 款产品 · 支持 OEM/ODM 定制`
                : `${filtered.length} products · OEM/ODM available`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-charcoal-light">
            <p className="mb-2">
              {lang === 'zh' ? '暂无匹配产品' : 'No products found'}
            </p>
            {search.trim() && (
              <p className="text-sm">
                {lang === 'zh'
                  ? `未找到与「${search.trim()}」相关的结果，请尝试中文名、英文名或香型关键词`
                  : `No results for "${search.trim()}". Try product name, scent, or category.`}
              </p>
            )}
          </div>
        ) : (
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {shown.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                categoryLabel={catLabel(product.category)}
                onImageFailed={() => hideProduct(product.id)}
                onContact={() =>
                  onContact(lang === 'zh' ? product.name : product.name_en)
                }
              />
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-10">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="px-8 py-3 border border-charcoal/20 text-charcoal text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors"
              >
                {lang === 'zh'
                  ? `加载更多（还有 ${filtered.length - visibleCount} 款）`
                  : `Load more (${filtered.length - visibleCount} left)`}
              </button>
            </div>
          )}
          </>
        )}
      </div>
    </section>
  )
}

function ProductCard({
  product,
  lang,
  categoryLabel,
  onImageFailed,
  onContact,
}: {
  product: Product
  lang: Lang
  categoryLabel: string
  onImageFailed: () => void
  onContact: () => void
}) {
  const [imageOk, setImageOk] = useState(true)
  const moq = product.moq ?? DEFAULT_MOQ

  if (!imageOk) return null

  return (
    <article className="group bg-white rounded-sm overflow-hidden border border-cream-dark/50 hover:border-gold/30 hover:shadow-md transition-all duration-300">
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-cream-dark/20">
        <SafeImage
          src={product.image_url}
          alt={lang === 'zh' ? product.name : product.name_en}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onLoadFailed={() => {
            setImageOk(false)
            onImageFailed()
          }}
        />
        {categoryLabel && (
          <span className="absolute top-3 left-3 bg-charcoal/75 text-cream text-[10px] tracking-widest uppercase px-2.5 py-1">
            {categoryLabel}
          </span>
        )}
      </Link>
      <div className="p-4 md:p-5">
        <h3 className="font-serif text-lg text-charcoal mb-1 line-clamp-2 min-h-[3.5rem]">
          {lang === 'zh' ? product.name : product.name_en}
        </h3>
        <p className="text-xs text-charcoal-light mb-3 line-clamp-2 min-h-[2rem]">
          {lang === 'zh' ? product.description : product.description_en}
        </p>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-serif text-xl text-gold">${product.price.toFixed(2)}</span>
          <span className="text-[10px] text-charcoal-light/70 uppercase">
            / {lang === 'zh' ? '件' : 'piece'}
          </span>
        </div>
        <p className="text-xs text-charcoal-light mb-4">
          MOQ: {moq} {lang === 'zh' ? '件起订' : 'pcs min. order'}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onContact}
            className="flex-1 min-w-[120px] py-2 bg-[#25D366] text-white text-xs tracking-widest uppercase hover:bg-[#1da851] transition-colors inline-flex items-center justify-center gap-1.5"
          >
            WhatsApp
          </button>
          <Link
            to={`/product/${product.id}`}
            className="flex-1 min-w-[80px] py-2 border border-charcoal/15 text-xs text-charcoal-light text-center hover:border-gold/40 hover:text-gold transition-colors"
          >
            {lang === 'zh' ? '查看详情' : 'View Details'}
          </Link>
        </div>
      </div>
    </article>
  )
}
