import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import antesDepoisSrc from '../assets/antesedepois.jpg'

gsap.registerPlugin(ScrollTrigger)

// A imagem antesedepois.jpg é um split: lado esquerdo = antes, lado direito = depois.
// Usamos object-position para exibir a metade correta em cada painel.

function ImageSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(48)
  const dragging = useRef(false)

  const getPercent = useCallback((clientX: number) => {
    if (!containerRef.current) return 48
    const rect = containerRef.current.getBoundingClientRect()
    return Math.min(97, Math.max(3, ((clientX - rect.left) / rect.width) * 100))
  }, [])

  const onMove  = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragging.current) return
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    setPos(getPercent(x))
  }, [getPercent])
  const onUp    = useCallback(() => { dragging.current = false }, [])
  const onDown  = useCallback(() => { dragging.current = true  }, [])

  useEffect(() => {
    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseup',    onUp)
    document.addEventListener('touchmove',  onMove, { passive: true })
    document.addEventListener('touchend',   onUp)
    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseup',    onUp)
      document.removeEventListener('touchmove',  onMove)
      document.removeEventListener('touchend',   onUp)
    }
  }, [onMove, onUp])

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden select-none cursor-ew-resize"
      onMouseDown={onDown}
      onTouchStart={onDown}
    >
      {/* ── DEPOIS panel (lado direito da imagem, sempre visível) ── */}
      <div className="absolute inset-0">
        <img
          src={antesDepoisSrc}
          alt="Depois"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'right center' }}
          draggable={false}
        />
      </div>

      {/* ── ANTES panel (lado esquerdo da imagem, clipado pelo slider) ── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={antesDepoisSrc}
          alt="Antes"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'left center' }}
          draggable={false}
        />
      </div>

      {/* ── Divider line ── */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/70 z-20 pointer-events-none"
        style={{ left: `${pos}%` }}
      />

      {/* ── Handle ── */}
      <div
        className="absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        {/* Outer ring */}
        <div className="w-14 h-14 rounded-full border border-ae-white/20 flex items-center justify-center backdrop-blur-sm bg-ae-black/30">
          {/* Inner circle */}
          <div className="w-9 h-9 rounded-full bg-ae-red flex items-center justify-center shadow-[0_0_20px_rgba(215,25,32,0.5)]">
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
              <path d="M1 5H17M1 5L4.5 1.5M1 5L4.5 8.5M17 5L13.5 1.5M17 5L13.5 8.5"
                stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Labels ── */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none"
        style={{ opacity: pos > 15 ? 1 : 0, transition: 'opacity 0.3s' }}>
        <span className="font-display text-ae-white/70 text-[10px] tracking-[0.3em] uppercase bg-ae-black/50 px-3 py-1.5 backdrop-blur-sm">
          ANTES
        </span>
      </div>
      <div className="absolute top-4 right-4 z-20 pointer-events-none"
        style={{ opacity: pos < 85 ? 1 : 0, transition: 'opacity 0.3s' }}>
        <span className="font-display text-ae-white/70 text-[10px] tracking-[0.3em] uppercase bg-ae-black/50 px-3 py-1.5 backdrop-blur-sm">
          DEPOIS
        </span>
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ba-label', {
        opacity: 0, x: -20, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.ba-heading', start: 'top 82%' },
      })
      gsap.from('.ba-line', {
        yPercent: 115, stagger: 0.08, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: '.ba-heading', start: 'top 82%' },
      })
      gsap.from('.ba-slider-wrap', {
        opacity: 0, y: 50, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ba-slider-wrap', start: 'top 82%' },
      })
      gsap.from('.ba-hint', {
        opacity: 0, y: 10, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.ba-hint', start: 'top 90%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-ae-black py-32 md:py-52 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="ba-heading mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-5 bg-ae-red" />
            <p className="ba-label section-label text-ae-red">TRANSFORMAÇÃO</p>
          </div>
          <h2 className="font-display font-bold leading-none tracking-[-0.02em]">
            <span className="block overflow-hidden" style={{ paddingBottom: '0.05em' }}>
              <span className="ba-line block text-ae-white" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 6rem)' }}>
                O RESULTADO
              </span>
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: '0.05em' }}>
              <span className="ba-line block text-ae-white" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 6rem)' }}>
                FALA <span className="text-ae-red">POR SI.</span>
              </span>
            </span>
          </h2>
        </div>

        {/* Slider */}
        <div className="ba-slider-wrap max-w-5xl">
          <ImageSlider />
        </div>

        {/* Hint */}
        <p className="ba-hint mt-5 font-display text-ae-white/20 text-[10px] tracking-[0.35em] uppercase flex items-center gap-3">
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
            <path d="M1 5H19M1 5L5 1M1 5L5 9M19 5L15 1M19 5L15 9"
              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Arraste para comparar
        </p>
      </div>
    </section>
  )
}
