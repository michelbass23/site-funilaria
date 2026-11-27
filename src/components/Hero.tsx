import { useEffect, useRef, lazy, Suspense } from 'react'
import React from 'react'
import { gsap } from 'gsap'
import Marquee from './Marquee'
import { ArrowRight } from 'lucide-react'

const HeroParticles = lazy(() => import('./HeroParticles'))

const WHATSAPP_NUMBER = '5571900000000'
const WHATSAPP_MSG = encodeURIComponent('Olá! Gostaria de solicitar um orçamento.')

function SplitLine({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`block whitespace-nowrap ${className ?? ''}`} style={style}>
      {text.split('').map((ch, i) => (
        <span key={i} className="char inline-block">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      tl.from('.hero-line-deco', {
        scaleX: 0, duration: 1.8, ease: 'power4.inOut', transformOrigin: 'left',
      })

      tl.from('.hero-eyebrow', { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=1.2')

      tl.from('.hero-t1 .char', {
        yPercent: 115, opacity: 0, stagger: 0.022, duration: 0.75, ease: 'power4.out',
      }, '-=0.6')
      tl.from('.hero-t2 .char', {
        yPercent: 115, opacity: 0, stagger: 0.025, duration: 0.85, ease: 'power4.out',
      }, '-=0.55')
      tl.from('.hero-t3 .char', {
        yPercent: 115, opacity: 0, stagger: 0.022, duration: 0.75, ease: 'power4.out',
      }, '-=0.55')

      tl.from('.hero-divider', {
        scaleX: 0, duration: 0.6, ease: 'power3.out', transformOrigin: 'left',
      }, '-=0.3')
      tl.from('.hero-sub', { opacity: 0, y: 18, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      tl.from('.hero-btn', { opacity: 0, y: 16, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      tl.from('.hero-side', { opacity: 0, x: 16, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      tl.from('.hero-scroll-hint', { opacity: 0, duration: 0.5 }, '-=0.3')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative w-full h-screen min-h-[700px] flex flex-col overflow-hidden"
    >
      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-[1.04]"
        autoPlay muted loop playsInline
        style={{ filter: 'brightness(0.5) saturate(0.8) contrast(1.05)' }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Three.js particles — lazy loaded */}
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* Cinematic overlays — layered for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-ae-black via-ae-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ae-black/75 via-ae-black/20 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 110% 110% at 50% 50%, transparent 35%, rgba(8,9,11,0.65) 100%)' }}
      />

      {/* Thin accent line across hero */}
      <div
        className="hero-line-deco absolute left-0 right-0 h-px pointer-events-none"
        style={{
          top: '53%',
          background: 'linear-gradient(to right, rgba(215,25,32,0.4), rgba(215,25,32,0.1) 40%, transparent)',
          transformOrigin: 'left',
        }}
      />

      {/* Right vertical label */}
      <div className="hero-side absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-3 z-10">
        <div className="w-px h-28 bg-gradient-to-b from-transparent via-ae-white/15 to-transparent" />
        <span className="writing-vertical text-ae-white/20 text-[9px] tracking-[0.5em] uppercase font-display">
          AUTOMOTIVE REFINEMENT / EST. ATELIÊ
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 w-full pt-24">

          {/* Eyebrow */}
          <div className="hero-eyebrow flex items-center gap-4 mb-8">
            <div className="w-5 h-px bg-ae-red" />
            <p className="font-display text-ae-white/35 tracking-[0.35em] text-[10px] uppercase">
              ATELIÊ AUTOMOTIVO / SALVADOR
            </p>
          </div>

          {/* Title — each line in its own overflow mask */}
          <h1 className="font-display font-bold leading-none tracking-[-0.02em] mb-10">
            <span className="block overflow-hidden" style={{ paddingBottom: '0.06em' }}>
              <SplitLine
                text="A ARTE DE"
                className="hero-t1 text-ae-white"
                style={{ fontSize: 'clamp(2.8rem,7.8vw,8.8rem)', lineHeight: 0.92 }}
              />
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: '0.06em' }}>
              <SplitLine
                text="TRANSFORMAR"
                className="hero-t2 text-ae-red"
                style={{ fontSize: 'clamp(2.8rem,7.8vw,8.8rem)', lineHeight: 0.92 }}
              />
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: '0.06em' }}>
              <SplitLine
                text="CADA DETALHE."
                className="hero-t3 text-ae-white"
                style={{ fontSize: 'clamp(2.8rem,7.8vw,8.8rem)', lineHeight: 0.92 }}
              />
            </span>
          </h1>

          {/* Subtitle row */}
          <div className="flex items-center gap-6 mb-10">
            <div className="hero-divider w-10 h-px bg-ae-red flex-shrink-0" style={{ transformOrigin: 'left' }} />
            <p className="hero-sub font-body text-ae-white/45 text-sm md:text-[0.95rem] leading-relaxed max-w-sm">
              Pintura automotiva e estética especializada.<br />
              Precisão em cada processo. Excelência em cada acabamento.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            <a
              href="#galeria"
              onClick={e => { e.preventDefault(); document.querySelector('#galeria')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="hero-btn btn-outline group"
            >
              CONHEÇA NOSSO TRABALHO
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn btn-primary group"
            >
              SOLICITAR ORÇAMENTO
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Marquee bar */}
      <div className="relative z-10 border-t border-ae-white/[0.05] py-3.5 bg-ae-black/40 backdrop-blur-md">
        <Marquee />
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint absolute bottom-[72px] right-10 md:right-14 flex items-center gap-3 z-10 pointer-events-none">
        <span className="font-display text-ae-white/20 text-[9px] tracking-[0.45em] uppercase">SCROLL</span>
        <div className="w-12 h-px bg-gradient-to-r from-ae-white/20 to-transparent" />
      </div>
    </section>
  )
}
