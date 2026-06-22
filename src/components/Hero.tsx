import { useEffect, useRef, useState } from 'react'
import type { Lang } from '../types'
import { HERO_CONTENT, HERO_POSTER, HERO_VIDEO } from '../data/defaults'

interface HeroProps {
  lang: Lang
}

export default function Hero({ lang }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [useVideo, setUseVideo] = useState(true)

  const title = HERO_CONTENT.title[lang]
  const subtitle = HERO_CONTENT.subtitle[lang]
  const tagline = HERO_CONTENT.tagline[lang]

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) setUseVideo(false)
  }, [])

  useEffect(() => {
    if (!useVideo || !videoRef.current) return
    const v = videoRef.current
    v.play().catch(() => setUseVideo(false))
  }, [useVideo])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 温馨封面 + Ken Burns（视频加载前 / 降级方案） */}
      <div
        className={`absolute inset-0 bg-charcoal transition-opacity duration-1000 ${
          videoReady && useVideo ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <img
          src={HERO_POSTER}
          alt=""
          className="w-full h-full object-cover animate-ken-burns"
        />
      </div>

      {/* 动态视频背景：茶蜡摇曳 */}
      {useVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          onError={() => setUseVideo(false)}
        />
      )}

      {/* 暖色遮罩 + 浮动光晕 */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-charcoal/55 via-amber-950/20 to-charcoal/70" />
      <div className="hero-ambient-glow absolute inset-0 z-[2] pointer-events-none" />
      <div className="hero-warm-vignette absolute inset-0 z-[2] pointer-events-none" />

      {/* 文案 */}
      <div className="relative z-10 text-center text-cream px-4 max-w-4xl mx-auto pt-20">
        <p className="animate-fade-up text-xs md:text-sm tracking-[0.4em] uppercase mb-6 text-cream/80">
          {tagline}
        </p>
        <h1 className="animate-fade-up animate-delay-100 font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6 drop-shadow-lg">
          {title}
        </h1>
        <p className="animate-fade-up animate-delay-200 font-serif text-lg md:text-2xl italic text-cream/90 mb-10 drop-shadow-md">
          {subtitle}
        </p>
        <div className="animate-fade-up animate-delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#products"
            className="inline-block px-8 py-3 bg-cream/95 text-charcoal text-sm tracking-widest uppercase hover:bg-blush transition-colors backdrop-blur-sm"
          >
            {lang === 'zh' ? '探索系列' : 'Explore Collection'}
          </a>
          <a
            href="#about"
            className="inline-block px-8 py-3 border border-cream/60 text-cream text-sm tracking-widest uppercase hover:bg-cream/10 transition-colors backdrop-blur-sm"
          >
            {lang === 'zh' ? '我们的故事' : 'Our Story'}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-cream/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
