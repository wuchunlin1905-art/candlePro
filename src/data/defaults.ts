import type { Product, SiteImage, ProductCategory } from '../types'
import alibabaData from './alibaba-products.json'

/** 首页动态背景（温馨烛光视频 + 封面图） */
export const HERO_VIDEO = '/videos/hero-candle.mp4'
export const HERO_POSTER = '/images/hero-1.jpg'
export const HERO_CONTENT = {
  tagline: { zh: '跨境蜡烛 · 香薰', en: 'Candles & Aromatherapy' },
  title: { zh: '温暖如家 · 光晕随行', en: 'Warm as home — gentle glow' },
  subtitle: {
    zh: 'Handcrafted candles for your sanctuary',
    en: 'Handcrafted candles for your sanctuary',
  },
}

/** 本地图片路径（已下载到 public/images/） */
export const HERO_SLIDES = [HERO_POSTER, '/images/hero-2.jpg']

export const COMPANY = {
  name: { zh: 'Molly Chenguang 晨光科技', en: 'Molly Chenguang Technology' },
  years: 4,
  location: { zh: '中国 · 四川成都', en: 'Chengdu, Sichuan, China' },
  type: { zh: '跨境香氛供应商', en: 'Cross-border Fragrance Supplier' },
  categories: {
    zh: ['无火香薰', '香薰蜡烛', '车载香氛', '香氛礼盒', '空气清新'],
    en: ['Reed Diffuser', 'Scented Candles', 'Car Freshener', 'Fragrance Gift Set', 'Air Freshener'],
  },
  whatsapp: '19882990195',
  responseTime: { zh: 'WhatsApp 快速回复', en: 'Quick reply on WhatsApp' },
}

export const TRUST_BADGES = [
  {
    icon: '✦',
    title: { zh: '全定制服务', en: 'Full Customization' },
    desc: { zh: 'Logo · 包装 · 香型', en: 'Logo · Packaging · Scent' },
  },
  {
    icon: '◈',
    title: { zh: '成品检验', en: 'Quality Inspection' },
    desc: { zh: '出货前全检', en: 'Pre-shipment QC' },
  },
  {
    icon: '◎',
    title: { zh: '全球发货', en: 'Global Shipping' },
    desc: { zh: '50+ 国家直邮', en: 'Ship to 50+ countries' },
  },
  {
    icon: '◉',
    title: { zh: 'OEM / ODM', en: 'OEM / ODM' },
    desc: { zh: '支持贴牌代工', en: 'Private label ready' },
  },
]

export const PRODUCT_CATEGORIES: {
  id: ProductCategory | 'all'
  label: { zh: string; en: string }
}[] = [
  { id: 'all', label: { zh: '全部产品', en: 'All Products' } },
  { id: 'candles', label: { zh: '香薰蜡烛', en: 'Scented Candles' } },
  { id: 'diffuser', label: { zh: '无火香薰', en: 'Reed Diffuser' } },
  { id: 'gift', label: { zh: '礼盒套装', en: 'Gift Sets' } },
  { id: 'car', label: { zh: '车载香氛', en: 'Car Freshener' } },
]

export const DEFAULT_MOQ = 100

export const DEFAULT_IMAGES: SiteImage[] = [
  {
    id: 'hero-1',
    section: 'hero',
    title: '温暖如家 · 光晕随行',
    subtitle: 'Handcrafted candles for your sanctuary',
    image_url: '/images/hero-1.jpg',
    sort_order: 0,
    visible: true,
  },
  {
    id: 'hero-2',
    section: 'hero',
    title: '烛光摇曳 · 温暖如诉',
    subtitle: 'Flickering flames — warm and healing',
    image_url: '/images/hero-2.jpg',
    sort_order: 1,
    visible: false,
  },
  {
    id: 'hero-3',
    section: 'hero',
    title: '薰衣草梦 · 宁静致远',
    subtitle: 'Lavender dreams — serene and calm',
    image_url: '/images/hero-3.jpg',
    sort_order: 2,
    visible: false,
  },
  {
    id: 'hero-4',
    section: 'hero',
    title: '森林晨雾 · 自然之息',
    subtitle: 'Forest mist — breathe nature in',
    image_url: '/images/hero-4.jpg',
    sort_order: 3,
    visible: false,
  },
  {
    id: 'hero-5',
    section: 'hero',
    title: '柑橘阳光 · 活力满满',
    subtitle: 'Citrus sunshine — energize your day',
    image_url: '/images/hero-5.jpg',
    sort_order: 4,
    visible: false,
  },
  {
    id: 'hero-6',
    section: 'hero',
    title: '礼盒传情 · 心意之选',
    subtitle: 'Gift sets — share the sentiment',
    image_url: '/images/hero-6.jpg',
    sort_order: 5,
    visible: false,
  },
  {
    id: 'gallery-1',
    section: 'gallery',
    title: '匠心手作',
    image_url: '/images/gallery-1.jpg',
    sort_order: 0,
    visible: true,
  },
  {
    id: 'gallery-2',
    section: 'gallery',
    title: '大豆蜡浇注',
    image_url: '/images/gallery-2.jpg',
    sort_order: 1,
    visible: true,
  },
  {
    id: 'gallery-3',
    section: 'gallery',
    title: '无火扩香',
    image_url: '/images/gallery-3.jpg',
    sort_order: 2,
    visible: true,
  },
  {
    id: 'gallery-4',
    section: 'gallery',
    title: '精美礼盒',
    image_url: '/images/gallery-4.jpg',
    sort_order: 3,
    visible: true,
  },
  {
    id: 'gallery-5',
    section: 'gallery',
    title: '精油调配',
    image_url: '/images/gallery-5.jpg',
    sort_order: 4,
    visible: true,
  },
  {
    id: 'gallery-6',
    section: 'gallery',
    title: '薰衣草花田',
    image_url: '/images/gallery-6.jpg',
    sort_order: 5,
    visible: true,
  },
  {
    id: 'about-1',
    section: 'about',
    title: '关于我们',
    image_url: '/images/about-1.jpg',
    sort_order: 0,
    visible: true,
  },
]

const SPEC_WAX = {
  label: { zh: '蜡质', en: 'Wax' },
  value: { zh: '天然大豆蜡', en: 'Natural soy wax' },
}
const SPEC_WICK = {
  label: { zh: '烛芯', en: 'Wick' },
  value: { zh: '纯棉烛芯', en: 'Cotton wick' },
}
const SPEC_BURN = {
  label: { zh: '燃烧时长', en: 'Burn Time' },
  value: { zh: '40+ 小时', en: '40+ hours' },
}
const SPEC_WEIGHT = {
  label: { zh: '净重', en: 'Net Weight' },
  value: { zh: '200g', en: '200g' },
}

const LEGACY_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '暮光玫瑰',
    name_en: 'Twilight Rose',
    description: '保加利亚玫瑰与麝香，浪漫而深邃',
    description_en: 'Bulgarian rose & musk — romantic and deep',
    detail: {
      zh: '暮光玫瑰系列采用保加利亚大马士革玫瑰精油，搭配麝香与琥珀底调，营造浪漫而深邃的氛围。大豆蜡燃烧均匀，无黑烟，适合高端酒店、SPA 及礼品渠道。',
      en: 'Twilight Rose features Bulgarian Damask rose essential oil with musk and amber base notes. Even-burning soy wax with no soot — ideal for luxury hotels, spas and gift channels.',
    },
    price: 28.99,
    image_url: '/images/product-p1-main.jpg',
    images: ['/images/product-p1-b.jpg', '/images/product-p1-c.jpg'],
    scent: 'Floral',
    category: 'candles',
    moq: 100,
    specs: [SPEC_WAX, SPEC_WICK, SPEC_BURN, SPEC_WEIGHT],
    sort_order: 0,
    visible: true,
  },
  {
    id: 'p2',
    name: '森林晨雾',
    name_en: 'Forest Mist',
    description: '雪松、尤加利与苔藓，如置身北欧森林',
    description_en: 'Cedar, eucalyptus & moss — Nordic forest vibes',
    detail: {
      zh: '森林晨雾以雪松、尤加利和苔藓三重木质调构成，仿佛置身北欧清晨的森林。天然大豆蜡，燃烧时间 40+ 小时，支持定制标签与礼盒包装。',
      en: 'Forest Mist blends cedar, eucalyptus and moss for a Nordic forest atmosphere. Natural soy wax, 40+ hour burn, custom labels and gift packaging available.',
    },
    price: 26.99,
    image_url: '/images/product-p2-main.jpg',
    images: ['/images/product-p2-b.jpg', '/images/product-p2-c.jpg'],
    scent: 'Woody',
    category: 'candles',
    moq: 100,
    specs: [SPEC_WAX, SPEC_WICK, SPEC_BURN, SPEC_WEIGHT],
    sort_order: 1,
    visible: true,
  },
  {
    id: 'p3',
    name: '禅意白茶',
    name_en: 'Zen White Tea',
    description: '白毫银针与佛手柑，清冽而宁静',
    description_en: 'White tea & bergamot — crisp and serene',
    detail: {
      zh: '禅意白茶无火香薰采用高品质藤条扩香，白毫银针与佛手柑的清新组合，适合办公空间与冥想室。100ml 大容量，持续扩香 2-3 个月。',
      en: 'Zen White Tea reed diffuser with premium reeds. White tea and bergamot blend for offices and meditation spaces. 100ml capacity, 2-3 months diffusion.',
    },
    price: 24.99,
    image_url: '/images/product-p3-main.jpg',
    images: ['/images/product-p3-b.jpg', '/images/product-p3-c.jpg'],
    scent: 'Fresh',
    category: 'diffuser',
    moq: 200,
    specs: [
      { label: { zh: '容量', en: 'Volume' }, value: { zh: '100ml', en: '100ml' } },
      { label: { zh: '扩香时长', en: 'Diffusion' }, value: { zh: '2-3 个月', en: '2-3 months' } },
      { label: { zh: '藤条数', en: 'Reeds' }, value: { zh: '6 根', en: '6 pcs' } },
      SPEC_WEIGHT,
    ],
    sort_order: 2,
    visible: true,
  },
  {
    id: 'p4',
    name: '香草焦糖',
    name_en: 'Vanilla Caramel',
    description: '马达加斯加香草与太妃糖，温暖治愈',
    description_en: 'Madagascar vanilla & toffee — warm comfort',
    detail: {
      zh: '香草焦糖系列使用马达加斯加香草提取物，混合太妃糖与焦糖底调，温暖治愈。适合家居、咖啡厅及甜品店渠道销售。',
      en: 'Vanilla Caramel uses Madagascar vanilla extract with toffee and caramel notes. Warm and comforting — perfect for home, café and bakery channels.',
    },
    price: 22.99,
    image_url: '/images/product-p4-main.jpg',
    images: ['/images/product-p4-b.jpg', '/images/product-p4-c.jpg'],
    scent: 'Gourmand',
    category: 'candles',
    moq: 100,
    specs: [SPEC_WAX, SPEC_WICK, SPEC_BURN, SPEC_WEIGHT],
    sort_order: 3,
    visible: true,
  },
  {
    id: 'p5',
    name: '薰衣草梦境',
    name_en: 'Lavender Dream',
    description: '普罗旺斯薰衣草，助眠与放松',
    description_en: 'Provence lavender — sleep & relaxation',
    detail: {
      zh: '薰衣草梦境礼盒含 2 支蜡烛 + 1 个无火扩香 + 精美礼盒包装，普罗旺斯薰衣草香型，是节日送礼的热门选择。支持企业定制 Logo。',
      en: 'Lavender Dream gift set includes 2 candles + 1 diffuser in premium packaging. Provence lavender scent — a holiday bestseller. Corporate logo customization available.',
    },
    price: 23.99,
    image_url: '/images/product-p5-main.jpg',
    images: ['/images/product-p5-b.jpg', '/images/product-p5-c.jpg'],
    scent: 'Herbal',
    category: 'gift',
    moq: 50,
    specs: [
      { label: { zh: '套装内容', en: 'Contents' }, value: { zh: '2 蜡烛 + 1 扩香', en: '2 candles + 1 diffuser' } },
      { label: { zh: '包装', en: 'Packaging' }, value: { zh: '精美礼盒', en: 'Premium gift box' } },
      SPEC_BURN,
      { label: { zh: '定制', en: 'Customization' }, value: { zh: '支持 Logo', en: 'Logo available' } },
    ],
    sort_order: 4,
    visible: true,
  },
  {
    id: 'p6',
    name: '柑橘阳光',
    name_en: 'Citrus Sunshine',
    description: '西西里柠檬与甜橙，活力满满',
    description_en: 'Sicilian lemon & sweet orange — energizing',
    detail: {
      zh: '柑橘阳光车载香氛采用固体扩香技术，西西里柠檬与甜橙的活力组合，持久扩香 30 天。小巧设计，适合汽车出风口及小空间使用。',
      en: 'Citrus Sunshine car freshener uses solid diffusion technology. Sicilian lemon and sweet orange blend, 30-day longevity. Compact design for car vents and small spaces.',
    },
    price: 21.99,
    image_url: '/images/product-p6-main.jpg',
    images: ['/images/product-p6-b.jpg', '/images/product-p6-c.jpg'],
    scent: 'Citrus',
    category: 'car',
    moq: 300,
    specs: [
      { label: { zh: '类型', en: 'Type' }, value: { zh: '固体扩香', en: 'Solid diffuser' } },
      { label: { zh: '持久度', en: 'Longevity' }, value: { zh: '30 天', en: '30 days' } },
      { label: { zh: '安装', en: 'Mount' }, value: { zh: '出风口夹式', en: 'Vent clip' } },
      { label: { zh: '净重', en: 'Weight' }, value: { zh: '50g', en: '50g' } },
    ],
    sort_order: 5,
    visible: true,
  },
]

export const DEFAULT_PRODUCTS: Product[] =
  alibabaData.products?.length > 0
    ? (alibabaData.products as Product[])
    : LEGACY_PRODUCTS

export const SITE_NAME = 'Molly Chenguang'
export const SITE_TAGLINE = {
  zh: '蜡烛 · 香薰 · 跨境供应',
  en: 'Candles & Aromatherapy · B2B',
}

export const CERTIFICATES = [
  {
    id: 'iso9001',
    name: { zh: 'ISO 9001 质量管理体系', en: 'ISO 9001 Quality Management' },
    issuer: { zh: '国际标准化组织', en: 'International Organization for Standardization' },
    year: '2022',
    color: '#b8956a',
  },
  {
    id: 'ce',
    name: { zh: 'CE 欧盟安全认证', en: 'CE European Conformity' },
    issuer: { zh: '欧盟合格评定', en: 'EU Conformity Assessment' },
    year: '2023',
    color: '#4a4540',
  },
  {
    id: 'msds',
    name: { zh: 'MSDS 安全数据表', en: 'MSDS Safety Data Sheet' },
    issuer: { zh: '化学品安全合规', en: 'Chemical Safety Compliance' },
    year: '2024',
    color: '#8b7355',
  },
  {
    id: 'gmp',
    name: { zh: 'ISO 22716 化妆品 GMP', en: 'ISO 22716 Cosmetics GMP' },
    issuer: { zh: '良好生产规范', en: 'Good Manufacturing Practice' },
    year: '2023',
    color: '#c4a882',
  },
  {
    id: 'reach',
    name: { zh: 'REACH 欧盟化学品法规', en: 'REACH EU Chemical Regulation' },
    issuer: { zh: '欧洲化学品管理局', en: 'European Chemicals Agency' },
    year: '2024',
    color: '#2c2825',
  },
  {
    id: 'fda',
    name: { zh: 'FDA 化妆品登记', en: 'FDA Cosmetic Registration' },
    issuer: { zh: '美国食品药品监督管理局', en: 'U.S. Food & Drug Administration' },
    year: '2023',
    color: '#b8956a',
  },
]

export const REVIEWS = [
  {
    id: 'r1',
    name: 'Sarah M.',
    country: { zh: '美国', en: 'United States' },
    flag: '🇺🇸',
    rating: 5,
    product: { zh: '暮光玫瑰蜡烛', en: 'Twilight Rose Candle' },
    text: {
      zh: '品质超出预期，玫瑰香氛非常纯正。已下单 500 件作为圣诞礼品，包装精美，客户反馈极好。',
      en: 'Quality exceeded expectations. The rose scent is authentic. Ordered 500 pcs for Christmas gifts — packaging is exquisite and clients love them.',
    },
    date: '2025-11',
  },
  {
    id: 'r2',
    name: 'James L.',
    country: { zh: '英国', en: 'United Kingdom' },
    flag: '🇬🇧',
    rating: 5,
    product: { zh: '森林晨雾蜡烛', en: 'Forest Mist Candle' },
    text: {
      zh: 'OEM 定制服务非常专业，从 Logo 设计到包装打样只用了两周。燃烧均匀，无黑烟，已通过我们的质检。',
      en: 'Professional OEM service — from logo design to packaging samples in just two weeks. Even burn, no soot, passed our QC inspection.',
    },
    date: '2025-10',
  },
  {
    id: 'r3',
    name: 'Yuki T.',
    country: { zh: '日本', en: 'Japan' },
    flag: '🇯🇵',
    rating: 5,
    product: { zh: '禅意白茶无火香薰', en: 'Zen White Tea Diffuser' },
    text: {
      zh: '香型清新淡雅，非常适合日本市场。MOQ 合理，物流速度快，已经是第三次返单了。',
      en: 'Fresh and elegant scent, perfect for the Japanese market. Reasonable MOQ, fast shipping — this is our third reorder.',
    },
    date: '2025-09',
  },
  {
    id: 'r4',
    name: 'Emma R.',
    country: { zh: '澳大利亚', en: 'Australia' },
    flag: '🇦🇺',
    rating: 4,
    product: { zh: '薰衣草梦境礼盒', en: 'Lavender Dream Gift Set' },
    text: {
      zh: '礼盒设计高档，非常适合节日促销。唯一建议是希望能提供更多香型选择，整体非常满意。',
      en: 'Premium gift set design, perfect for holiday promotions. Would love more scent options, but overall very satisfied.',
    },
    date: '2025-08',
  },
  {
    id: 'r5',
    name: 'Pierre D.',
    country: { zh: '法国', en: 'France' },
    flag: '🇫🇷',
    rating: 5,
    product: { zh: '暮光玫瑰蜡烛', en: 'Twilight Rose Candle' },
    text: {
      zh: '作为法国香氛品牌，我们对品质要求很高。Lumière 的产品完全符合欧盟标准，CE 证书齐全。',
      en: 'As a French fragrance brand, we have high standards. Lumière products fully meet EU standards with complete CE certification.',
    },
    date: '2025-07',
  },
  {
    id: 'r6',
    name: 'Lisa K.',
    country: { zh: '德国', en: 'Germany' },
    flag: '🇩🇪',
    rating: 5,
    product: { zh: '柑橘阳光车载香氛', en: 'Citrus Sunshine Car Freshener' },
    text: {
      zh: '车载香氛持久度很好，客户退货率极低。批量价格有竞争力，是我们稳定的供应商之一。',
      en: 'Car freshener longevity is excellent with very low return rate. Competitive bulk pricing — one of our reliable suppliers.',
    },
    date: '2025-06',
  },
]

/** 获取产品相册图片（主图 + 附加图，去重） */
export function getProductImages(product: Product): string[] {
  const imgs = [product.image_url, ...(product.images ?? [])].filter(Boolean)
  return [...new Set(imgs)]
}
