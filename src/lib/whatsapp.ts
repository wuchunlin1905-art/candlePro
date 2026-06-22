import { COMPANY } from '../data/defaults'

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${COMPANY.whatsapp}`
  if (!message?.trim()) return base
  return `${base}?text=${encodeURIComponent(message.trim())}`
}

export function openWhatsApp(message?: string): void {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
}

export function defaultInquiryMessage(lang: 'zh' | 'en', productName?: string): string {
  if (productName) {
    return lang === 'zh'
      ? `您好，我想咨询产品：${productName}`
      : `Hello, I'd like to inquire about: ${productName}`
  }
  return lang === 'zh'
    ? '您好，我想咨询 Lumière 香氛产品，请提供报价。'
    : 'Hello, I would like to inquire about Lumière fragrance products. Please send me a quote.'
}

export function formatWhatsAppDisplay(): string {
  return `+${COMPANY.whatsapp}`
}
