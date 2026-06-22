import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Lang } from '../types'

const STORAGE_KEY = 'lumiere-lang'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextValue>({
  lang: 'zh',
  setLang: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'en' ? 'en' : 'zh'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
