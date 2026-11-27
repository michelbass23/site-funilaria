import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Marquee from './Marquee'

const vermelho = '/vermelho.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to('.exp-bg', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Reveal the content block
      gsap.from('.exp-content', {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-content', start: 'top 75%' },
      })

      // Count up numbers
      const nums = document.querySelectorAll('.exp-num')
      nums.forEach(num => {
        const target = parseInt(num.getAttribute('data-target') || '0', 10)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => { num.textContent = Math.round(obj.val).toString() },
          scrollTrigger: { trigger: num, start: 'top 85%' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ae-black">
      {/* Full-bleed atmospheric background */}
      <div className="exp-bg absolute inset-0 scale-110">
        <div
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 80% 50%, rgba(133,13,19,0.25) 0%, transparent 55%),
              radial-gradient(ellipse 60% 60% at 15% 60%, rgba(215,25,32,0.08) 0%, transparent 50%),
              #08090B
            `,
          }}
        />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(244,244,244,1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,244,1) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Top marquee divider */}
      <div className="relative z-10 border-y border-ae-white/[0.05] py-3">
        <Marquee inverted />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-32 md:py-56">
        <div className="exp-content grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: photo */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-72 md:w-[400px] mx-auto">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={vermelho}
                  alt="Detalhe de pintura automotiva"
                  className="w-full h-full object-cover object-center"
                  style={{ filter: 'brightness(0.8) saturate(0.9) contrast(1.05)' }}
                />
                {/* Gradient overlay — fades bottom into section bg */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(8,9,11,0.5) 0%, transparent 50%)' }}
                />
              </div>
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-10 h-10 border-t-[1.5px] border-l-[1.5px] border-ae-red z-10" />
              <span className="absolute bottom-0 right-0 w-10 h-10 border-b-[1.5px] border-r-[1.5px] border-ae-red z-10" />
            </div>
          </div>

          {/* Right: text */}
          <div>
            <p className="section-label text-ae-red mb-8">FILOSOFIA</p>
            <h2
              className="section-title text-ae-white leading-none mb-10"
              style={{ fontSize: 'clamp(2.8rem,4.5vw,5rem)' }}
            >
              CADA DETALHE<br />
              FAZ A<br />
              <span className="text-ae-red">DIFERENÇA.</span>
            </h2>
            <p className="font-body text-ae-white/50 text-base leading-loose max-w-md mb-16">
              Acreditamos que um acabamento excepcional nasce da combinação entre técnica, dedicação e atenção aos detalhes. Cada veículo que entra no Ateliê recebe um tratamento único.
            </p>

            {/* Stat tiles */}
            <div className="grid grid-cols-3 gap-6 border-t border-ae-white/[0.07] pt-10">
              {[
                { label: 'Anos de experiência', target: 10, suffix: '+' },
                { label: 'Veículos atendidos', target: 500, suffix: '+' },
                { label: 'Satisfação', target: 100, suffix: '%' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-ae-white leading-none tabular-nums" style={{ fontSize: 'clamp(2rem,3.5vw,3.5rem)' }}>
                    <span className="exp-num" data-target={stat.target}>0</span>
                    <span className="text-ae-red">{stat.suffix}</span>
                  </p>
                  <p className="font-body text-ae-white/35 text-xs mt-2 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-10 border-y border-ae-white/[0.05] py-3">
        <Marquee />
      </div>
    </section>
  )
}
