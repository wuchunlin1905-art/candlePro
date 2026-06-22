import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Lang } from '../types'
import { SITE_NAME } from '../data/defaults'

interface HeaderProps {
  lang: Lang
  onLangChange: (lang: Lang) => void
  search: string
  onSearchChange: (q: string) => void
  onContact: () => void
}

const nav = {
  zh: [
    { label: '首页', href: '#hero' },
    { label: '产品', href: '#products' },
    { label: '认证', href: '#certificates' },
    { label: '评价', href: '#reviews' },
    { label: '联系', href: '#contact' },
  ],
  en: [
    { label: 'Home', href: '#hero' },
    { label: 'Products', href: '#products' },
    { label: 'Certs', href: '#certificates' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ],
}

export default function Header({
  lang,
  onLangChange,
  search,
  onSearchChange,
  onContact,
}: HeaderProps) {
  const [open, setOpen] = useState(false)
  const items = nav[lang]

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSearchChange = (value: string) => {
    onSearchChange(value)
    if (value.trim()) scrollToProducts()
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    scrollToProducts()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-cream-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <a href="#hero" className="font-serif text-2xl md:text-3xl tracking-wide text-charcoal shrink-0">
            {SITE_NAME}
          </a>

          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-light/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={lang === 'zh' ? '中/英文搜索产品...' : 'Search in CN/EN...'}
                className="w-full pl-10 pr-4 py-2 bg-white/80 border border-cream-dark/60 text-sm focus:outline-none focus:border-gold rounded-full"
              />
            </div>
          </form>

          <nav className="hidden lg:flex items-center gap-6">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm tracking-widest uppercase text-charcoal-light hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onContact}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-xs tracking-widest uppercase hover:bg-[#1da851] transition-colors"
            >
              WhatsApp
            </button>
            <button
              onClick={() => onLangChange(lang === 'zh' ? 'en' : 'zh')}
              className="text-xs tracking-widest uppercase px-3 py-1.5 border border-warm/40 rounded-full hover:bg-warm/10 transition-colors"
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            <button
              className="lg:hidden p-2"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden bg-cream border-t border-cream-dark/50 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="search"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={lang === 'zh' ? '中/英文搜索产品...' : 'Search in CN/EN...'}
              className="w-full px-4 py-2 bg-white border border-cream-dark/60 text-sm focus:outline-none focus:border-gold mb-2"
            />
          </form>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-sm tracking-widest uppercase py-2 text-charcoal-light hover:text-gold"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => { onContact(); setOpen(false) }}
            className="w-full py-2 bg-[#25D366] text-white text-sm tracking-widest uppercase"
          >
            WhatsApp {lang === 'zh' ? '联系' : 'Contact'}
          </button>
          <Link
            to="/admin"
            className="block text-xs text-charcoal-light/60 pt-2"
            onClick={() => setOpen(false)}
          >
            Admin
          </Link>
        </nav>
      )}
    </header>
  )
}
