import type { Product, SiteImage } from '../types'
import { DEFAULT_IMAGES, DEFAULT_PRODUCTS, DEFAULT_MOQ } from '../data/defaults'

/** 旧图片路径 → 新路径映射 */
const LEGACY_IMAGE_MAP: Record<string, string> = {
  '/images/product-1.jpg': '/images/product-p1-main.jpg',
  '/images/product-2.jpg': '/images/product-p2-main.jpg',
  '/images/product-3.jpg': '/images/product-p3-main.jpg',
  '/images/product-4.jpg': '/images/product-p4-main.jpg',
  '/images/product-5.jpg': '/images/product-p5-main.jpg',
  '/images/product-6.jpg': '/images/product-p6-main.jpg',
  '/images/hero-warm.jpg': '/images/hero-1.jpg',
  '/images/hero-warm-2.jpg': '/images/hero-2.jpg',
}

/** 本地路径、Supabase 存储、阿里巴巴 CDN 图片视为可靠 */
export function isReliableImageUrl(url: string | undefined): boolean {
  if (!url?.trim()) return false
  if (url.startsWith('/')) return true
  if (url.includes('.supabase.co/storage')) return true
  if (url.includes('alicdn.com')) return true
  return false
}

/** 已知在国内常无法加载的外链 */
export function isUnreliableExternalUrl(url: string): boolean {
  return (
    url.includes('unsplash.com') ||
    url.includes('images.pexels.com') ||
    url.includes('pexels.com/photos')
  )
}

export function resolveImageUrl(
  url: string | undefined,
  fallback?: string
): string {
  if (url && LEGACY_IMAGE_MAP[url]) return LEGACY_IMAGE_MAP[url]
  if (!url?.trim()) return fallback ?? ''
  if (isReliableImageUrl(url)) return url
  if (isUnreliableExternalUrl(url) && fallback) return fallback
  return url
}

export function mergeSiteImages(remote: SiteImage[]): SiteImage[] {
  const defaultsById = new Map(DEFAULT_IMAGES.map((i) => [i.id, i]))

  return remote
    .map((img) => {
      const fallback = defaultsById.get(img.id)?.image_url
      const resolved = resolveImageUrl(img.image_url, fallback)
      return resolved ? { ...img, image_url: resolved } : null
    })
    .filter((img): img is SiteImage => img !== null)
}

export function mergeProducts(remote: Product[]): Product[] {
  const defaultsById = new Map(DEFAULT_PRODUCTS.map((p) => [p.id, p]))

  const merged: Product[] = []
  for (const p of remote) {
    const fallback = defaultsById.get(p.id)
    const resolved = resolveImageUrl(p.image_url, fallback?.image_url)
    if (!resolved) continue
    merged.push({
      ...p,
      image_url: resolved,
      category: p.category ?? fallback?.category ?? 'candles',
      moq: p.moq ?? fallback?.moq ?? DEFAULT_MOQ,
      images: p.images?.length ? p.images : fallback?.images,
      specs: p.specs?.length ? p.specs : fallback?.specs,
      detail: p.detail ?? fallback?.detail,
    })
  }
  return merged
}

/** 预检测图片是否可加载 */
export function checkImageLoadable(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

export async function filterLoadableSiteImages(
  images: SiteImage[]
): Promise<SiteImage[]> {
  const checks = await Promise.all(
    images.map(async (img) => ({
      img,
      ok: await checkImageLoadable(img.image_url),
    }))
  )
  return checks.filter((c) => c.ok).map((c) => c.img)
}

export async function filterLoadableProducts(
  products: Product[]
): Promise<Product[]> {
  const checks = await Promise.all(
    products.map(async (p) => ({
      p,
      ok: isReliableImageUrl(p.image_url)
        ? true
        : await checkImageLoadable(p.image_url),
    }))
  )
  return checks.filter((c) => c.ok).map((c) => c.p)
}
