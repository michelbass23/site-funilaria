import { useEffect, useRef } from 'react'
import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const video01 = '/video01.mp4'

gsap.registerPlugin(ScrollTrigger)

// Each word as its own animatable unit — prevents mid-word wrapping
function SplitWords({ text, className, style }: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span className={`block whitespace-nowrap ${className ?? ''}`} style={style}>
      {text.split('').map((ch, i) => (
        <span key={i} className="m-char inline-block">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Background stroke text parallax ────────
      gsap.to('.m-stroke', {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        },
      })

      // ── Label wipe in ──────────────────────────
      gsap.from('.m-label', {
        opacity: 0, x: -20, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.m-label', start: 'top 85%' },
      })
      gsap.from('.m-label-line', {
        scaleX: 0, duration: 0.6, ease: 'power3.out', transformOrigin: 'left',
        scrollTrigger: { trigger: '.m-label', start: 'top 85%' },
      })

      // ── Title lines — chars cascade ────────────
      const lineWraps = sectionRef.current?.querySelectorAll('.m-line-outer')
      lineWraps?.forEach((wrap, i) => {
        const chars = wrap.querySelectorAll('.m-char')
        gsap.from(chars, {
          yPercent: 115,
          opacity: 0,
          stagger: 0.022,
          duration: 0.85,
          ease: 'power4.out',
          scrollTrigger: { trigger: wrap, start: 'top 84%' },
          delay: i * 0.055,
        })
      })

      // ── Red accent bar on the body ─────────────
      gsap.from('.m-body-bar', {
        scaleY: 0,
        duration: 0.9,
        ease: 'power3.out',
        transformOrigin: 'top',
        scrollTrigger: { trigger: '.m-body-bar', start: 'top 82%' },
      })
      gsap.from('.m-body-text', {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.m-body-text', start: 'top 82%' },
      })

      // ── Image — clip-path reveal ───────────────
      gsap.from('.m-img-inner', {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.3,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: '.m-img', start: 'top 78%' },
      })

      // ── Corner accents draw ────────────────────
      gsap.from('.m-corner-tl', {
        width: 0, height: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.m-img', start: 'top 75%' },
      })
      gsap.from('.m-corner-br', {
        width: 0, height: 0, duration: 0.6, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: '.m-img', start: 'top 75%' },
      })

      // ── Badge slide in ─────────────────────────
      gsap.from('.m-badge', {
        opacity: 0, x: -30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.m-badge', start: 'top 90%' },
      })

      // ── Hover tilt on image ────────────────────
      const imgEl = sectionRef.current?.querySelector('.m-img') as HTMLElement
      if (imgEl) {
        imgEl.addEventListener('mousemove', (e) => {
          const rect = imgEl.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10
          const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10
          gsap.to(imgEl, { rotateY: x, rotateX: y, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
        })
        imgEl.addEventListener('mouseleave', () => {
          gsap.to(imgEl, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' })
        })
      }

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // clamp calculado para "PINTAR UM CARRO." (linha mais longa) caber na coluna mobile
  const fs = 'clamp(1.6rem, 2.8vw, 3.6rem)'

  return (
    <section ref={sectionRef} id="sobre" className="relative bg-ae-black py-32 md:py-56 overflow-hidden">

      {/* Decorative stroke text — parallax */}
      <div
        className="m-stroke absolute -left-6 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-display font-bold whitespace-nowrap"
          style={{
            fontSize: 'clamp(7rem, 18vw, 20rem)',
            lineHeight: 1,
            WebkitTextStroke: '1px rgba(244,244,244,0.025)',
            color: 'transparent',
          }}
        >
          ATELIÊ
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* ── Left: text ─────────────────────── */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-10">
              <div className="m-label-line h-px w-6 bg-ae-red" />
              <p className="m-label section-label text-ae-red">MANIFESTO</p>
            </div>

            {/* Title — 4 lines, each isolated so chars never wrap */}
            <h2 className="font-display font-bold leading-none tracking-[-0.02em] mb-14 space-y-[0.04em]">
              <span className="m-line-outer block overflow-hidden" style={{ paddingBottom: '0.05em' }}>
                <SplitWords text="NÃO É APENAS" className="text-ae-white" style={{ fontSize: fs }} />
              </span>
              <span className="m-line-outer block overflow-hidden" style={{ paddingBottom: '0.05em' }}>
                <SplitWords text="PINTAR UM CARRO." className="text-ae-white" style={{ fontSize: fs }} />
              </span>
              <span className="m-line-outer block overflow-hidden" style={{ paddingBottom: '0.05em' }}>
                <SplitWords text="É DEVOLVER SUA" className="text-ae-white" style={{ fontSize: fs }} />
              </span>
              <span className="m-line-outer block overflow-hidden" style={{ paddingBottom: '0.05em' }}>
                <SplitWords text="ESSÊNCIA." className="text-ae-red" style={{ fontSize: fs }} />
              </span>
            </h2>

            {/* Body */}
            <div className="m-body flex gap-5 items-stretch">
              <div className="m-body-bar w-[2px] bg-ae-red/50 flex-shrink-0" />
              <p className="m-body-text font-body text-ae-white/50 text-[0.95rem] leading-[1.9] max-w-[340px]">
                Cada veículo carrega uma história. Nosso trabalho é respeitar cada linha, cada curva e cada detalhe, utilizando técnica, precisão e cuidado para entregar um resultado à altura da sua expectativa.
              </p>
            </div>
          </div>

          {/* ── Right: image ───────────────────── */}
          <div className="m-img relative" style={{ transformStyle: 'preserve-3d' }}>
            <div className="relative aspect-[3/4] overflow-visible">
              <div className="m-img-inner absolute inset-0 overflow-hidden" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
                <div className="w-full h-full bg-ae-black-2 relative">
                  <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse 85% 70% at 25% 65%, rgba(215,25,32,0.14), transparent 60%)' }}
                  />
                  {/* Fine diagonal lines */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #F4F4F4 0px, #F4F4F4 1px, transparent 1px, transparent 20px)',
                    }}
                  />
                  <video
                    src={video01}
                    muted
                    loop
                    playsInline
                    preload="none"
                    ref={(el) => {
                      if (!el) return
                      const obs = new IntersectionObserver(
                        ([entry]) => { if (entry.isIntersecting) el.play() },
                        { threshold: 0.1 }
                      )
                      obs.observe(el)
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ filter: 'brightness(0.78) saturate(0.9) contrast(1.05)' }}
                  />
                </div>
              </div>

              {/* Corner brackets */}
              <span className="m-corner-tl absolute top-0 left-0 w-10 h-10 border-t-[1.5px] border-l-[1.5px] border-ae-red z-10" />
              <span className="m-corner-br absolute bottom-0 right-0 w-10 h-10 border-b-[1.5px] border-r-[1.5px] border-ae-red z-10" />
            </div>

            {/* Badge */}
            <div className="m-badge absolute -bottom-5 -left-5 bg-ae-red px-5 py-3 z-10">
              <p className="font-display text-ae-white text-[10px] tracking-[0.3em] uppercase">
                Precisão em cada detalhe
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
