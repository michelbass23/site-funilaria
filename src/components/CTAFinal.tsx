import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_NUMBER = '5571900000000'
const WHATSAPP_MSG = encodeURIComponent('Olá! Gostaria de solicitar um orçamento para meu veículo.')

export default function CTAFinal() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax light
      gsap.to('.cta-light', {
        xPercent: 10,
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })

      // Title chars
      const lines = document.querySelectorAll('.cta-line-wrap')
      lines.forEach((line, i) => {
        gsap.from(line.querySelectorAll('.char'), {
          yPercent: 115,
          opacity: 0,
          stagger: 0.028,
          duration: 0.95,
          ease: 'power4.out',
          scrollTrigger: { trigger: line, start: 'top 82%' },
          delay: i * 0.08,
        })
      })

      gsap.from('.cta-sub-el', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-sub-el', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const chars = (text: string) =>
    text.split('').map((ch, i) => (
      <span key={i} className="char inline-block">
        {ch === ' ' ? ' ' : ch}
      </span>
    ))

  return (
    <section ref={sectionRef} className="relative bg-ae-black overflow-hidden py-40 md:py-72">
      {/* Atmospheric red light */}
      <div
        className="cta-light absolute right-0 top-1/2 w-[600px] h-[600px] -translate-y-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(215,25,32,0.22) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute left-0 bottom-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(133,13,19,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(244,244,244,1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,244,1) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
        <p className="section-label text-ae-red mb-12">O PRÓXIMO PASSO</p>

        <h2 className="font-display font-bold leading-none mb-10" style={{ fontSize: 'clamp(4rem,10vw,11rem)' }}>
          <span className="cta-line-wrap block overflow-hidden pb-2">
            <span className="block text-ae-white">{chars('SEU CARRO')}</span>
          </span>
          <span className="cta-line-wrap block overflow-hidden pb-2">
            <span className="block text-ae-white">{chars('MERECE')}</span>
          </span>
          <span className="cta-line-wrap block overflow-hidden pb-2">
            <span className="block text-ae-red">{chars('MAIS.')}</span>
          </span>
        </h2>

        <p className="cta-sub-el font-body text-ae-white/40 text-lg mb-14">
          Vamos transformar o visual do seu veículo?
        </p>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-sub-el group inline-flex items-center gap-4 btn-primary text-sm px-14 py-5"
        >
          SOLICITAR ORÇAMENTO
          <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </a>
      </div>
    </section>
  )
}
