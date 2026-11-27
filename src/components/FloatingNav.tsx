import { useState, useEffect } from 'react'

const sections = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'acabamento', label: 'Acabamento' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'contato', label: 'Contato' },
]

export default function FloatingNav() {
  const [active, setActive] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.65)

      let current = ''
      for (const sec of sections) {
        const el = document.getElementById(sec.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.55) {
          current = sec.id
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Navegação de seções"
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5 pointer-events-none'
      }`}
    >
      {/* Vertical guide line */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-ae-white/[0.07] to-transparent pointer-events-none"
      />

      {sections.map((sec) => {
        const isActive = active === sec.id
        return (
          <button
            key={sec.id}
            onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' })}
            aria-label={`Ir para ${sec.label}`}
            title={sec.label}
            className="relative group flex items-center justify-center w-5 h-5"
          >
            <span
              className={`block rounded-full transition-all duration-300 ease-out ${
                isActive
                  ? 'w-2.5 h-2.5 bg-ae-red shadow-[0_0_10px_rgba(215,25,32,0.65)]'
                  : 'w-1.5 h-1.5 bg-ae-white/20 group-hover:bg-ae-white/55 group-hover:scale-125'
              }`}
            />
            {/* Label tooltip on hover */}
            <span
              aria-hidden
              className="absolute right-7 font-display text-[8px] tracking-[0.25em] uppercase whitespace-nowrap text-ae-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none pointer-events-none"
            >
              {sec.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
