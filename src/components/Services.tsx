import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.from('.sv-h-line', {
        yPercent: 110,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.sv-heading', start: 'top 80%' },
      })

      // Each row: animated in from bottom, staggered
      document.querySelectorAll('.sv-row').forEach((row) => {
        const number = row.querySelector('.sv-number')
        const title = row.querySelector('.sv-title')
        const desc = row.querySelector('.sv-desc')
        const line = row.querySelector('.sv-accent')

        gsap.from([number, title, desc], {
          opacity: 0,
          y: 40,
          stagger: 0.07,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 85%' },
        })
        if (line) {
          gsap.from(line, {
            scaleX: 0,
            duration: 0.8,
            ease: 'power4.out',
            transformOrigin: 'left',
            scrollTrigger: { trigger: row, start: 'top 85%' },
          })
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="servicos" ref={sectionRef} className="relative bg-ae-black-2 py-32 md:py-52 overflow-hidden">
      {/* Decorative large number backdrop */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden
        style={{ transform: 'translate(5%, -50%)' }}
      >
        <span
          className="font-display font-bold text-stroke text-ae-white/[0.025]"
          style={{ fontSize: 'clamp(14rem, 30vw, 32rem)', lineHeight: 1 }}
        >
          05
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        {/* Heading */}
        <div className="sv-heading mb-20 md:mb-32">
          <p className="section-label text-ae-red mb-6">PROCESSOS</p>
          <h2 className="section-title text-ae-white leading-none" style={{ fontSize: 'clamp(2.8rem,5.5vw,6rem)' }}>
            <span className="block overflow-hidden pb-1">
              <span className="sv-h-line block">EXCELÊNCIA EM</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="sv-h-line block">CADA PROCESSO.</span>
            </span>
          </h2>
        </div>

        {/* Service rows */}
        <div>
          {services.map((s, i) => (
            <div
              key={s.number}
              className="sv-row group relative border-t border-ae-white/[0.07] last:border-b py-10 md:py-14 grid grid-cols-[56px_1fr] md:grid-cols-[80px_280px_1fr] gap-6 md:gap-10 items-start hover:bg-ae-white/[0.015] transition-colors duration-500 -mx-4 px-4"
            >
              {/* Red accent left border */}
              <div
                className="sv-accent absolute left-0 top-0 bottom-0 w-[2px] bg-ae-red origin-top"
                style={{ transform: 'scaleX(1) scaleY(0)', transformOrigin: 'top' }}
              />

              {/* Number */}
              <span className="sv-number font-display text-ae-white/20 text-sm tracking-widest group-hover:text-ae-red/60 transition-colors duration-500 mt-1">
                {s.number}
              </span>

              {/* Title */}
              <h3
                className="sv-title font-display font-bold text-ae-white whitespace-pre-line leading-tight group-hover:text-ae-white transition-colors duration-300"
                style={{ fontSize: 'clamp(1.4rem,2.5vw,2.2rem)' }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p className="sv-desc font-body text-ae-white/40 text-sm leading-relaxed group-hover:text-ae-white/65 transition-colors duration-500 max-w-sm mt-1 col-start-2 md:col-start-auto">
                {s.description}
              </p>

              {/* Hover index indicator */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-display text-ae-white/5 font-bold text-5xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 select-none" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
