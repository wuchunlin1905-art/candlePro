import type { Product } from '../types'
import { PRODUCT_CATEGORIES } from '../data/defaults'

/** 构建可搜索文本（中英文名称、描述、香型、分类） */
export function getProductSearchText(product: Product): string {
  const cat = PRODUCT_CATEGORIES.find((c) => c.id === product.category)
  return [
    product.name,
    product.name_en,
    product.description,
    product.description_en,
    product.scent,
    cat?.label.zh,
    cat?.label.en,
  ]
    .filter(Boolean)
    .join(' ')
}

function normalizeLatin(text: string): string {
  return text.toLowerCase()
}

/** 子序列匹配：允许漏字，如 "twilig" → "twilight" */
function subsequenceMatch(text: string, query: string): boolean {
  let start = 0
  for (const ch of query) {
    const idx = text.indexOf(ch, start)
    if (idx === -1) return false
    start = idx + 1
  }
  return true
}

/** 编辑距离（短字符串，用于英文拼写容错） */
function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  const row = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = i
    for (let j = 1; j <= b.length; j++) {
      const val =
        a[i - 1] === b[j - 1]
          ? row[j - 1]
          : 1 + Math.min(row[j], row[j - 1], prev)
      row[j - 1] = prev
      prev = val
    }
    row[b.length] = prev
  }
  return row[b.length]
}

function fuzzyTokenMatch(text: string, token: string): boolean {
  const raw = text
  const q = token.trim()
  if (!q) return true

  // 中文及混合：直接包含 + 子序列
  if (raw.includes(q)) return true
  if (q.length >= 2 && subsequenceMatch(raw, q)) return true

  // 英文：小写包含 + 单词编辑距离容错
  const lower = normalizeLatin(raw)
  const qLower = normalizeLatin(q)
  if (lower.includes(qLower)) return true

  if (/^[a-z0-9]+$/i.test(q) && qLower.length >= 3) {
    const words = lower.split(/[\s·\-/]+/).filter(Boolean)
    for (const word of words) {
      if (word.includes(qLower)) return true
      if (qLower.length >= 4 && levenshtein(word, qLower) <= 1) return true
    }
    if (qLower.length >= 4 && levenshtein(lower, qLower) <= 2) return true
  }

  return subsequenceMatch(lower, qLower)
}

/** 单个商品是否匹配搜索词（支持空格分词，全部命中） */
export function matchProductSearch(product: Product, query: string): boolean {
  const q = query.trim()
  if (!q) return true

  const searchable = getProductSearchText(product)
  const tokens = q.split(/\s+/).filter(Boolean)

  return tokens.every(
    (token) =>
      fuzzyTokenMatch(searchable, token) ||
      fuzzyTokenMatch(product.name, token) ||
      fuzzyTokenMatch(product.name_en, token)
  )
}

export function filterProductsBySearch(
  products: Product[],
  query: string
): Product[] {
  return products.filter((p) => matchProductSearch(p, query))
}
