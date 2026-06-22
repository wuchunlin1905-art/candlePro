/**
 * Scrape Molly Chenguang Alibaba store (cdmlcg.en.alibaba.com)
 * Run: node scripts/scrape-alibaba.mjs
 * Env: MAX_PAGES=68 (default all pages)
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_JSON = path.join(ROOT, 'src/data/alibaba-products.json')
const IMG_DIR = path.join(ROOT, 'public/images/alibaba')

const STORE = 'https://cdmlcg.en.alibaba.com'
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const INCLUDE = [
  'scented candle',
  'soy wax',
  'reed diffuser',
  'diffuser set',
  'car freshener',
  'car air',
  'car perfume',
  'car scent',
  'gift set',
  'fragrance gift',
  'air freshener',
  'aromatherapy',
  'pillar candle',
  'tealight',
  'tea light',
  'taper candle',
  'essential oil',
  'aroma candle',
  'wax candle',
  'bougie',
  'led candle',
  'flameless candle',
]

const EXCLUDE = [
  'empty bottle',
  'bottle without',
  'glass bottle thick bottom',
  'humidifier machine',
  'digital diffuser machine',
  'wall-mounted automatic',
  'backflow incense',
  'incense cone',
  'taper candle stick unscented only',
]

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function absUrl(u) {
  if (!u) return ''
  if (u.startsWith('//')) return `https:${u}`
  return u
}

function parsePrice(item) {
  if (item.priceFrom) return parseFloat(item.priceFrom)
  const m = (item.fobPrice || item.fobPriceWithoutUnit || '').match(
    /([\d.]+)(?:-([\d.]+))?/
  )
  if (!m) return 0.99
  const a = parseFloat(m[1])
  const b = m[2] ? parseFloat(m[2]) : a
  return Math.round(((a + b) / 2) * 100) / 100
}

function parseMoq(item) {
  const raw = item.moq || item.halfTrustMoq || '5'
  const m = String(raw).match(/([\d,]+)/)
  return m ? parseInt(m[1].replace(/,/g, ''), 10) : 5
}

function isRelevant(title) {
  const t = title.toLowerCase()
  if (EXCLUDE.some((k) => t.includes(k))) return false
  return INCLUDE.some((k) => t.includes(k))
}

function detectCategory(title) {
  const t = title.toLowerCase()
  if (t.includes('car ') || t.includes(' car') || t.includes('vehicle'))
    return 'car'
  if (t.includes('gift set') || t.includes('gift box')) return 'gift'
  if (
    t.includes('reed diffuser') ||
    t.includes('diffuser set') ||
    (t.includes('diffuser') && !t.includes('candle'))
  )
    return 'diffuser'
  if (
    t.includes('candle') ||
    t.includes('tealight') ||
    t.includes('tea light') ||
    t.includes('pillar') ||
    t.includes('taper')
  )
    return 'candles'
  if (t.includes('air freshener') || t.includes('essential oil'))
    return 'diffuser'
  return 'candles'
}

function extractProductList(html) {
  const re = /module-data='([^']+)'/g
  let m
  while ((m = re.exec(html)) !== null) {
    try {
      const blob = JSON.parse(decodeURIComponent(m[1]))
      const list = blob?.mds?.moduleData?.data?.productList
      if (Array.isArray(list) && list.length) return list
    } catch {}
  }
  return []
}

function getImageUrls(item) {
  const urls = []
  if (Array.isArray(item.imageUrlList)) {
    for (const img of item.imageUrlList) {
      const u = absUrl(img.original || img.x350 || img.x220)
      if (u) urls.push(u)
    }
  }
  if (Array.isArray(item.skuImg)) {
    for (const u of item.skuImg) urls.push(absUrl(u))
  }
  if (item.imageUrls?.original) urls.push(absUrl(item.imageUrls.original))
  return [...new Set(urls)].slice(0, 4)
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}

async function downloadImage(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) return true
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Referer: STORE } })
    if (!res.ok) return false
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 1000) return false
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, buf)
    return true
  } catch {
    return false
  }
}

async function main() {
  const maxPages = parseInt(process.env.MAX_PAGES || '68', 10)
  const downloadImages = process.env.DOWNLOAD_IMAGES === '1'
  const all = new Map()

  console.log(`Fetching ${maxPages} pages from ${STORE}...`)

  for (let page = 1; page <= maxPages; page++) {
    const url =
      page === 1 ? `${STORE}/productlist.html` : `${STORE}/productlist-${page}.html`
    try {
      const html = await fetchText(url)
      const list = extractProductList(html)
      let added = 0
      for (const item of list) {
        if (!item?.id || !item?.subject) continue
        if (!isRelevant(item.subject)) continue
        if (!all.has(String(item.id))) {
          all.set(String(item.id), item)
          added++
        }
      }
      console.log(`Page ${page}: +${added} (total ${all.size})`)
      if (list.length === 0) console.warn(`Page ${page}: empty response`)
    } catch (e) {
      console.warn(`Page ${page} failed:`, e.message)
    }
    await sleep(500)
  }

  const items = [...all.values()]
  console.log(`Processing ${items.length} products (downloadImages=${downloadImages})...`)
  if (downloadImages) fs.mkdirSync(IMG_DIR, { recursive: true })

  const products = []

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const id = String(item.id)
    const title = item.subject.trim()
    const category = detectCategory(title)
    const imageUrls = getImageUrls(item)
    const galleryUrls = []

    if (downloadImages) {
      for (let j = 0; j < Math.min(imageUrls.length, 3); j++) {
        const ext = imageUrls[j].includes('.png') ? 'png' : 'jpg'
        const localPath = `/images/alibaba/${id}-${j}.${ext}`
        const dest = path.join(ROOT, 'public', localPath.replace(/^\//, ''))
        const ok = await downloadImage(imageUrls[j], dest)
        if (ok) galleryUrls.push(localPath)
        await sleep(80)
      }
    } else {
      for (const u of imageUrls.slice(0, 4)) galleryUrls.push(u)
    }

    if (!galleryUrls.length) {
      console.warn(`Skip ${id}: no images`)
      continue
    }

    const moq = parseMoq(item)
    const price = parsePrice(item)
    const url = absUrl(item.url)
    const certs = item.productAuthTagList?.join(', ') || ''

    products.push({
      id: `ali-${id}`,
      name: title.length > 40 ? title.slice(0, 40) + '…' : title,
      name_en: title,
      description: title.slice(0, 100),
      description_en: title,
      detail: {
        zh: `${title}。大豆蜡/天然香氛，支持定制 Logo 与包装。MOQ ${moq} 件。${certs ? `认证：${certs}` : ''}`,
        en: `${title}. Custom logo & packaging. MOQ ${moq} pcs.${certs ? ` Certs: ${certs}` : ''}`,
      },
      price,
      image_url: galleryUrls[0],
      images: galleryUrls.slice(1),
      scent: category === 'candles' ? 'Custom Scent' : 'Home Fragrance',
      category,
      moq,
      specs: [
        {
          label: { zh: '材质', en: 'Material' },
          value: { zh: '天然大豆蜡/植物精油', en: 'Soy wax / plant oils' },
        },
        {
          label: { zh: '定制', en: 'Customization' },
          value: { zh: '支持 Logo/包装/香型', en: 'Logo, packaging, scent' },
        },
        {
          label: { zh: 'MOQ', en: 'MOQ' },
          value: { zh: `${moq} 件`, en: `${moq} pcs` },
        },
      ],
      sort_order: i,
      visible: true,
      source_url: url,
    })

    if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/${items.length} done`)
  }

  const out = {
    source: STORE,
    supplier: 'Molly Chenguang Chengdu Technology Co., Ltd.',
    scraped_at: new Date().toISOString(),
    count: products.length,
    products,
  }

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true })
  fs.writeFileSync(OUT_JSON, JSON.stringify(out, null, 2))
  console.log(`\nSaved ${products.length} products → ${OUT_JSON}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
