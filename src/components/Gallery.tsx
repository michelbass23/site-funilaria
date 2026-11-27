import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Replace src with real photo paths — e.g. import p1 from '../assets/photos/01.jpg'
const items = [
  { label: 'Pintura Automotiva',    accent: 'rgba(215,25,32,0.12)',    col: 'col-span-12 md:col-span-7', aspect: 'aspect-[16/10]',  src: '/carro01.jpg' },
  { label: 'Funilaria Especializada', accent: 'rgba(138,141,147,0.07)', col: 'col-span-12 md:col-span-5', aspect: 'aspect-[4/3]',    src: '/carro02.jpg' },
  { label: 'Polimento Técnico',     accent: 'rgba(133,13,19,0.15)',    col: 'col-span-12 md:col-span-5', aspect: 'aspect-square',   src: '/carro03.jpg' },
  { label: 'Estética Premium',      accent: 'rgba(215,25,32,0.08)',    col: 'col-span-12 md:col-span-7', aspect: 'aspect-video',    src: '/carro04.jpg' },
  { label: 'Reparação de Pintura',  accent: 'rgba(138,141,147,0.08)', col: 'col-span-12 md:col-span-6', aspect: 'aspect-[4/3]',    src: '/carro05.jpg' },
  { label: 'Acabamento Final',      accent: 'rgba(215,25,32,0.1)',     col: 'col-span-12 md:col-span-6', aspect: 'aspect-[4/3]',    src: '/carro06.jpg' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.from('.gl-h', {
        yPercent: 110,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.gl-heading', start: 'top 80%' },
      })

      // Items staggered
      document.querySelectorAll('.gl-item').forEach(item => {
        gsap.from(item, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
        })
        // Zoom inner on scroll
        gsap.from(item.querySelector('.gl-inner'), {
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="galeria" ref={sectionRef} className="bg-ae-black py-32 md:py-52 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="gl-heading mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="section-label text-ae-red mb-5">PORTFÓLIO</p>
            <h2 className="section-title text-ae-white leading-none" style={{ fontSize: 'clamp(2.8rem,5.5vw,6rem)' }}>
              <span className="block overflow-hidden pb-1"><span className="gl-h block">NOSSO</span></span>
              <span className="block overflow-hidden pb-1"><span className="gl-h block">TRABALHO.</span></span>
            </h2>
          </div>
          <p className="font-body text-ae-white/30 text-sm max-w-[280px] leading-relaxed md:text-right">
            Adicione suas fotografias reais para substituir os placeholders.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          {items.map((item, i) => (
            <div key={i} className={`gl-item ${item.col} group relative overflow-hidden`}>
              <div className={`${item.aspect} w-full relative overflow-hidden`}>
                {/* Placeholder bg / photo */}
                <div
                  className="gl-inner absolute inset-0 bg-ae-black-2 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: `radial-gradient(ellipse 80% 70% at 40% 50%, ${item.accent}, #111317)` }}
                >
                  {item.src && (
                    <img
                      src={item.src}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      style={{ filter: 'brightness(0.82) saturate(0.9) contrast(1.05)' }}
                    />
                  )}
                </div>

                {/* Item number */}
                <span
                  className="absolute top-5 left-5 font-display text-ae-white/[0.07] font-bold select-none"
                  style={{ fontSize: '5rem', lineHeight: 1 }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ae-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6 w-full">
                    <div className="w-6 h-px bg-ae-red mb-3" />
                    <p className="font-display text-ae-white text-sm tracking-widest uppercase">{item.label}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
