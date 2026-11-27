import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'
import logoSrc from '../assets/logo.png'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Nosso trabalho', href: '#galeria' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

const WHATSAPP_NUMBER = '5571900000000'
const WHATSAPP_MSG = encodeURIComponent('Olá! Gostaria de solicitar um orçamento.')

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.h-logo-wrap', {
        opacity: 0, x: -28, duration: 1.1, delay: 1.6, ease: 'power3.out',
      })
      gsap.from('.h-nav a', {
        opacity: 0, y: -10, stagger: 0.065, duration: 0.65, delay: 1.9, ease: 'power3.out',
      })
      gsap.from('.h-cta', {
        opacity: 0, x: 24, duration: 0.9, delay: 2.25, ease: 'power3.out',
      })
    }, headerRef)
    return () => ctx.revert()
  }, [])

  const nav = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ae-black/92 backdrop-blur-2xl border-b border-ae-white/[0.05]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-[76px] flex items-center justify-between gap-8">

        {/* ── Logo — principal destaque ───────────── */}
        <a
          href="#inicio"
          className="h-logo-wrap flex-shrink-0 relative group"
          onClick={e => { e.preventDefault(); nav('#inicio') }}
        >
          {/* Glow effect behind logo — aparece no hover e some quando scrollado */}
          <span
            className={`absolute inset-0 -m-3 rounded-sm transition-opacity duration-500 pointer-events-none ${
              scrolled ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
            }`}
            style={{
              background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(215,25,32,0.12), transparent)',
              filter: 'blur(8px)',
            }}
          />

          {/* Logo image */}
          <img
            src={logoSrc}
            alt="Ateliê Automotivo"
            className={`relative z-10 object-contain transition-all duration-500 ${
              scrolled
                ? 'h-11 drop-shadow-none'
                : 'h-[52px] drop-shadow-[0_0_20px_rgba(215,25,32,0.35)]'
            }`}
          />
        </a>

        {/* ── Desktop Nav ───────────────────────── */}
        <nav className="h-nav hidden lg:flex items-center gap-7 flex-1 justify-center">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); nav(link.href) }}
              className="relative font-display text-ae-white/50 hover:text-ae-white text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-ae-red group-hover:w-full transition-all duration-350 ease-out" />
            </a>
          ))}
        </nav>

        {/* ── CTA button ────────────────────────── */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="h-cta hidden lg:flex btn-primary text-[10px] tracking-[0.2em] px-6 py-3.5"
        >
          SOLICITAR ORÇAMENTO
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-ae-white p-2"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* ── Mobile menu ───────────────────────── */}
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-ae-black/96 backdrop-blur-2xl border-t border-ae-white/[0.05] px-6 pt-8 pb-10 flex flex-col gap-5">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); nav(link.href) }}
              className="flex items-center gap-4 group"
            >
              <span className="font-display text-ae-white/15 text-xs tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-ae-white text-xl tracking-wide group-hover:text-ae-red transition-colors duration-300">
                {link.label}
              </span>
            </a>
          ))}
          <div className="pt-4 border-t border-ae-white/[0.07]">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-fit text-[10px]"
            >
              SOLICITAR ORÇAMENTO
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
