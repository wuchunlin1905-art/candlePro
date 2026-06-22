export interface SiteImage {
  id: string
  section: 'hero' | 'gallery' | 'product' | 'about'
  title: string
  subtitle?: string
  image_url: string
  sort_order: number
  visible: boolean
}

export type ProductCategory = 'candles' | 'diffuser' | 'gift' | 'car'

export interface ProductSpec {
  label: { zh: string; en: string }
  value: { zh: string; en: string }
}

export interface Product {
  id: string
  name: string
  name_en: string
  description: string
  description_en: string
  detail?: { zh: string; en: string }
  price: number
  image_url: string
  images?: string[]
  scent: string
  category?: ProductCategory
  moq?: number
  specs?: ProductSpec[]
  sort_order: number
  visible: boolean
  source_url?: string
}

export interface Certificate {
  id: string
  name: { zh: string; en: string }
  issuer: { zh: string; en: string }
  year: string
  color: string
}

export interface Review {
  id: string
  name: string
  country: { zh: string; en: string }
  flag: string
  rating: number
  product: { zh: string; en: string }
  text: { zh: string; en: string }
  date: string
}

export type Lang = 'zh' | 'en'
