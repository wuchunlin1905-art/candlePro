import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Product, SiteImage } from '../types'
import { DEFAULT_IMAGES, DEFAULT_PRODUCTS } from '../data/defaults'
import {
  filterLoadableProducts,
  filterLoadableSiteImages,
  mergeProducts,
  mergeSiteImages,
} from './images'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

export async function fetchSiteImages(): Promise<SiteImage[]> {
  if (!supabase) {
    return filterLoadableSiteImages(DEFAULT_IMAGES)
  }

  const { data, error } = await supabase
    .from('site_images')
    .select('*')
    .order('sort_order')

  if (error || !data?.length) {
    return filterLoadableSiteImages(DEFAULT_IMAGES)
  }

  const merged = mergeSiteImages(data as SiteImage[])
  const loadable = await filterLoadableSiteImages(merged)
  return loadable.length > 0 ? loadable : filterLoadableSiteImages(DEFAULT_IMAGES)
}

export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) {
    return filterLoadableProducts(DEFAULT_PRODUCTS)
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order')

  if (error || !data?.length) {
    return filterLoadableProducts(DEFAULT_PRODUCTS)
  }

  const merged = mergeProducts(data as Product[])
  const remoteLooksLegacy =
    merged.length < 20 && !merged.some((p) => p.id.startsWith('ali-'))

  if (remoteLooksLegacy && DEFAULT_PRODUCTS.length > merged.length) {
    return filterLoadableProducts(DEFAULT_PRODUCTS)
  }

  const loadable = await filterLoadableProducts(merged)
  return loadable.length > 0 ? loadable : filterLoadableProducts(DEFAULT_PRODUCTS)
}

export async function upsertSiteImage(image: SiteImage): Promise<void> {
  if (!supabase) throw new Error('Supabase 未配置')
  const { error } = await supabase.from('site_images').upsert(image)
  if (error) throw error
}

export async function deleteSiteImage(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase 未配置')
  const { error } = await supabase.from('site_images').delete().eq('id', id)
  if (error) throw error
}

export async function upsertProduct(product: Product): Promise<void> {
  if (!supabase) throw new Error('Supabase 未配置')
  const { error } = await supabase.from('products').upsert(product)
  if (error) throw error
}

export async function deleteProduct(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase 未配置')
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export async function uploadImage(file: File): Promise<string> {
  if (!supabase) throw new Error('Supabase 未配置')

  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage
    .from('site-assets')
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { data } = supabase.storage.from('site-assets').getPublicUrl(path)
  return data.publicUrl
}

export async function adminLogin(
  email: string,
  password: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!supabase) return { ok: false, message: 'Supabase 未配置' }

  if (!supabaseUrl?.includes('.supabase.co')) {
    return { ok: false, message: 'VITE_SUPABASE_URL 格式不正确，应为 https://xxx.supabase.co' }
  }

  if (!supabaseAnonKey?.startsWith('eyJ')) {
    return { ok: false, message: 'VITE_SUPABASE_ANON_KEY 不正确，请复制 anon public key（以 eyJ 开头）' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    const msg =
      error.message === 'Invalid login credentials'
        ? '邮箱或密码错误，请检查 Supabase 后台是否已创建该用户'
        : error.message
    return { ok: false, message: msg }
  }
  return { ok: true }
}

export async function adminLogout(): Promise<void> {
  if (supabase) await supabase.auth.signOut()
}

export async function getSession() {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function seedDefaultsIfEmpty(): Promise<void> {
  if (!supabase) return

  const { count } = await supabase
    .from('site_images')
    .select('*', { count: 'exact', head: true })

  if (count === 0) {
    await supabase.from('site_images').insert(DEFAULT_IMAGES)
  }

  const { count: pCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  if (pCount === 0) {
    await supabase.from('products').insert(DEFAULT_PRODUCTS)
  }
}
