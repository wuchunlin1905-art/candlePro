import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  isSupabaseConfigured,
  getSession,
  adminLogin,
  adminLogout,
  fetchSiteImages,
  fetchProducts,
  upsertSiteImage,
  deleteSiteImage,
  upsertProduct,
  deleteProduct,
  uploadImage,
  seedDefaultsIfEmpty,
} from '../lib/supabase'
import type { Product, SiteImage } from '../types'

type Tab = 'images' | 'products'

export default function Admin() {
  const [session, setSession] = useState<boolean | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('images')
  const [images, setImages] = useState<SiteImage[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getSession().then((s) => setSession(!!s))
  }, [])

  const loadData = async () => {
    const [imgs, prods] = await Promise.all([fetchSiteImages(), fetchProducts()])
    setImages(imgs)
    setProducts(prods)
  }

  useEffect(() => {
    if (session) loadData()
  }, [session])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = await adminLogin(email, password)
    if (result.ok) {
      setSession(true)
      await seedDefaultsIfEmpty()
    } else {
      setError(result.message)
    }
  }

  const handleLogout = async () => {
    await adminLogout()
    setSession(false)
  }

  const showMsg = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="max-w-lg bg-white rounded-sm shadow-lg p-8">
          <h1 className="font-serif text-2xl mb-4">管理后台</h1>
          <p className="text-charcoal-light mb-4">
            请先配置 Supabase 环境变量才能使用管理功能。配置完成后即可上传图片、编辑产品，无需自建服务器。
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-charcoal-light mb-6">
            <li>复制 <code className="bg-cream-dark px-1">.env.example</code> 为 <code className="bg-cream-dark px-1">.env</code></li>
            <li>在 supabase.com 创建免费项目</li>
            <li>运行 <code className="bg-cream-dark px-1">supabase/schema.sql</code> 初始化数据库</li>
            <li>填入 URL 和 Anon Key 后重启开发服务器</li>
          </ol>
          <Link to="/" className="text-gold hover:underline text-sm">
            ← 返回首页
          </Link>
        </div>
      </div>
    )
  }

  if (session === null) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="font-serif text-xl text-warm-dark animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-white rounded-sm shadow-lg p-8">
          <h1 className="font-serif text-2xl mb-6 text-center">Lumière 管理</h1>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-1">邮箱</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-warm/20 mb-4 text-sm focus:outline-none focus:border-gold"
            required
          />
          <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-1">密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-warm/20 mb-6 text-sm focus:outline-none focus:border-gold"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
          >
            登录
          </button>
          <Link to="/" className="block text-center text-xs text-charcoal-light mt-4 hover:text-gold">
            ← 返回首页
          </Link>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-dark/30">
      <header className="bg-charcoal text-cream px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-xl">Lumière 管理后台</h1>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs text-cream/60 hover:text-cream">查看网站</Link>
            <button onClick={handleLogout} className="text-xs tracking-widest uppercase border border-cream/30 px-3 py-1 hover:bg-cream/10">
              退出
            </button>
          </div>
        </div>
      </header>

      {message && (
        <div className="bg-gold/20 text-charcoal text-sm text-center py-2">{message}</div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          {(['images', 'products'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm tracking-widest uppercase transition-colors ${
                tab === t ? 'bg-charcoal text-cream' : 'bg-white text-charcoal-light hover:bg-cream'
              }`}
            >
              {t === 'images' ? '页面图片' : '产品管理'}
            </button>
          ))}
        </div>

        {tab === 'images' ? (
          <ImageManager
            images={images}
            saving={saving}
            onSave={async (img) => {
              setSaving(true)
              try {
                await upsertSiteImage(img)
                await loadData()
                showMsg('保存成功')
              } catch {
                showMsg('保存失败')
              } finally {
                setSaving(false)
              }
            }}
            onDelete={async (id) => {
              if (!confirm('确定删除？')) return
              setSaving(true)
              try {
                await deleteSiteImage(id)
                await loadData()
                showMsg('已删除')
              } catch {
                showMsg('删除失败')
              } finally {
                setSaving(false)
              }
            }}
          />
        ) : (
          <ProductManager
            products={products}
            saving={saving}
            onSave={async (p) => {
              setSaving(true)
              try {
                await upsertProduct(p)
                await loadData()
                showMsg('保存成功')
              } catch {
                showMsg('保存失败')
              } finally {
                setSaving(false)
              }
            }}
            onDelete={async (id) => {
              if (!confirm('确定删除？')) return
              setSaving(true)
              try {
                await deleteProduct(id)
                await loadData()
                showMsg('已删除')
              } catch {
                showMsg('删除失败')
              } finally {
                setSaving(false)
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

function ImageManager({
  images,
  saving,
  onSave,
  onDelete,
}: {
  images: SiteImage[]
  saving: boolean
  onSave: (img: SiteImage) => Promise<void>
  onDelete: (id: string) => Promise<void>
}) {
  const [editing, setEditing] = useState<SiteImage | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const empty: SiteImage = {
    id: crypto.randomUUID(),
    section: 'gallery',
    title: '',
    subtitle: '',
    image_url: '',
    sort_order: images.length,
    visible: true,
  }

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const url = await uploadImage(file)
      if (editing) {
        setEditing({ ...editing, image_url: url })
      }
      return url
    } catch {
      alert('上传失败')
      return null
    } finally {
      setUploading(false)
    }
  }

  const sectionLabel: Record<string, string> = {
    hero: '首页大图',
    gallery: '画廊',
    about: '关于我们',
    product: '产品',
  }

  return (
    <div>
      <button
        onClick={() => setEditing({ ...empty, id: crypto.randomUUID() })}
        className="mb-6 px-4 py-2 bg-gold text-cream text-sm tracking-widest uppercase"
      >
        + 添加图片
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-sm overflow-hidden shadow-sm">
            <div className="aspect-video relative">
              <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
              {!img.visible && (
                <span className="absolute top-2 right-2 bg-charcoal/70 text-cream text-xs px-2 py-0.5">隐藏</span>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs text-warm-dark uppercase tracking-widest">{sectionLabel[img.section]}</p>
              <p className="font-serif text-lg">{img.title || '(无标题)'}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setEditing(img)}
                  className="text-xs px-3 py-1 border border-charcoal/20 hover:bg-cream"
                >
                  编辑
                </button>
                <button
                  onClick={() => onDelete(img.id)}
                  className="text-xs px-3 py-1 border border-red-200 text-red-600 hover:bg-red-50"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-sm w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="font-serif text-xl mb-4">{editing.image_url ? '编辑图片' : '添加图片'}</h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs tracking-widest uppercase text-charcoal-light">区域</label>
                <select
                  value={editing.section}
                  onChange={(e) => setEditing({ ...editing, section: e.target.value as SiteImage['section'] })}
                  className="w-full mt-1 px-3 py-2 border border-warm/20 text-sm"
                >
                  <option value="hero">首页大图</option>
                  <option value="gallery">画廊</option>
                  <option value="about">关于我们</option>
                </select>
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-charcoal-light">标题</label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-warm/20 text-sm"
                />
              </div>

              {editing.section === 'hero' && (
                <div>
                  <label className="text-xs tracking-widest uppercase text-charcoal-light">副标题</label>
                  <input
                    value={editing.subtitle ?? ''}
                    onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-warm/20 text-sm"
                  />
                </div>
              )}

              <div>
                <label className="text-xs tracking-widest uppercase text-charcoal-light">图片</label>
                {editing.image_url && (
                  <img src={editing.image_url} alt="" className="w-full aspect-video object-cover mt-1 mb-2" />
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) await handleUpload(file)
                  }}
                />
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="text-xs px-3 py-2 border border-charcoal/20 hover:bg-cream disabled:opacity-50"
                  >
                    {uploading ? '上传中...' : '上传图片'}
                  </button>
                </div>
                <input
                  value={editing.image_url}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                  placeholder="或直接粘贴图片 URL"
                  className="w-full mt-2 px-3 py-2 border border-warm/20 text-sm"
                />
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-charcoal-light">排序</label>
                <input
                  type="number"
                  value={editing.sort_order}
                  onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                  className="w-full mt-1 px-3 py-2 border border-warm/20 text-sm"
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.visible}
                  onChange={(e) => setEditing({ ...editing, visible: e.target.checked })}
                />
                在页面上显示
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                disabled={saving || !editing.image_url}
                onClick={async () => {
                  await onSave(editing)
                  setEditing(null)
                }}
                className="flex-1 py-2 bg-charcoal text-cream text-sm tracking-widest uppercase disabled:opacity-50"
              >
                保存
              </button>
              <button
                onClick={() => setEditing(null)}
                className="flex-1 py-2 border border-charcoal/20 text-sm"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ProductManager({
  products,
  saving,
  onSave,
  onDelete,
}: {
  products: Product[]
  saving: boolean
  onSave: (p: Product) => Promise<void>
  onDelete: (id: string) => Promise<void>
}) {
  const [editing, setEditing] = useState<Product | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const empty: Product = {
    id: crypto.randomUUID(),
    name: '',
    name_en: '',
    description: '',
    description_en: '',
    price: 0,
    image_url: '',
    scent: '',
    sort_order: products.length,
    visible: true,
  }

  return (
    <div>
      <button
        onClick={() => setEditing({ ...empty, id: crypto.randomUUID() })}
        className="mb-6 px-4 py-2 bg-gold text-cream text-sm tracking-widest uppercase"
      >
        + 添加产品
      </button>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-sm p-4 flex items-center gap-4 shadow-sm">
            <img src={p.image_url} alt={p.name} className="w-16 h-16 object-cover rounded-sm shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-serif text-lg truncate">{p.name} / {p.name_en}</p>
              <p className="text-sm text-gold">${p.price.toFixed(2)} · {p.scent}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing(p)} className="text-xs px-3 py-1 border border-charcoal/20">编辑</button>
              <button onClick={() => onDelete(p.id)} className="text-xs px-3 py-1 border border-red-200 text-red-600">删除</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-sm w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="font-serif text-xl mb-4">编辑产品</h2>
            <div className="space-y-3">
              {([
                ['name', '中文名'],
                ['name_en', '英文名'],
                ['description', '中文描述'],
                ['description_en', '英文描述'],
                ['scent', '香型标签'],
              ] as const).map(([key, label]) => (
                <div key={key}>
                  <label className="text-xs tracking-widest uppercase text-charcoal-light">{label}</label>
                  <input
                    value={editing[key]}
                    onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-warm/20 text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs tracking-widest uppercase text-charcoal-light">价格 (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editing.price}
                  onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                  className="w-full mt-1 px-3 py-2 border border-warm/20 text-sm"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-charcoal-light">产品图片</label>
                {editing.image_url && <img src={editing.image_url} alt="" className="w-32 h-32 object-cover mt-1 mb-2" />}
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setUploading(true)
                    try {
                      const url = await uploadImage(file)
                      setEditing({ ...editing, image_url: url })
                    } catch { alert('上传失败') }
                    finally { setUploading(false) }
                  }}
                />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="text-xs px-3 py-2 border border-charcoal/20 mr-2">
                  {uploading ? '上传中...' : '上传'}
                </button>
                <input value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                  placeholder="或粘贴 URL" className="w-full mt-2 px-3 py-2 border border-warm/20 text-sm" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.visible}
                  onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} />
                在页面上显示
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button disabled={saving || !editing.image_url || !editing.name}
                onClick={async () => { await onSave(editing); setEditing(null) }}
                className="flex-1 py-2 bg-charcoal text-cream text-sm tracking-widest uppercase disabled:opacity-50">
                保存
              </button>
              <button onClick={() => setEditing(null)} className="flex-1 py-2 border border-charcoal/20 text-sm">取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
