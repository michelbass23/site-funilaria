import { useState } from 'react'

interface Paint {
  id: string
  label: string
  sub: string
  description: string
  swatchColor: string
  gradient: string
  glow: string
  shimmer: boolean
  chameleon?: boolean
}

const paints: Paint[] = [
  {
    id: 'metalica',
    label: 'Metálica',
    sub: 'Partículas de alumínio',
    description: 'Micropartículas de alumínio incorporadas ao verniz criam reflexos profundos e variados conforme o ângulo de incidência da luz.',
    swatchColor: '#8B9EA8',
    gradient: 'linear-gradient(145deg, #9BA8B5 0%, #6B7A8A 25%, #B8C5D0 45%, #5A6A78 65%, #90A0AE 85%, #7A8D9B 100%)',
    glow: 'rgba(139,158,168,0.28)',
    shimmer: true,
  },
  {
    id: 'perolizada',
    label: 'Perolizada',
    sub: 'Pigmentos de mica',
    description: 'Pigmentos de mica natural refletem a luz com suavidade iridescente, criando profundidade e elegância incomparáveis.',
    swatchColor: '#D4C4A0',
    gradient: 'linear-gradient(145deg, #DDD0B8 0%, #C2AA8C 25%, #EAE0CC 45%, #B89A7A 65%, #D4C4A8 85%, #C8B898 100%)',
    glow: 'rgba(212,196,160,0.32)',
    shimmer: false,
  },
  {
    id: 'fosca',
    label: 'Fosca',
    sub: 'Acabamento aveludado',
    description: 'Verniz especial que elimina reflexos, criando uma superfície aveludada com aparência sofisticada e exclusiva.',
    swatchColor: '#3C3838',
    gradient: 'linear-gradient(145deg, #3A3838 0%, #242222 25%, #464444 45%, #1E1C1C 65%, #383636 85%, #2E2C2C 100%)',
    glow: 'rgba(80,70,70,0.22)',
    shimmer: false,
  },
  {
    id: 'camaleao',
    label: 'Camaleão',
    sub: 'Pigmentos iridescentes',
    description: 'Pigmentos de cristal líquido que mudam de cor conforme o ângulo da luz, criando um efeito visual único e hipnótico.',
    swatchColor: '#6B4FA0',
    gradient: 'linear-gradient(145deg, #3DC48C 0%, #5B9BD4 25%, #6B4FA0 45%, #E84B6B 65%, #4CAF8A 85%, #3DC48C 100%)',
    glow: 'rgba(107,79,160,0.4)',
    shimmer: true,
    chameleon: true,
  },
]

export default function PaintSelector() {
  const [active, setActive] = useState<Paint>(paints[0])
  const [descKey, setDescKey] = useState(0)

  const selectPaint = (paint: Paint) => {
    if (paint.id === active.id) return
    setActive(paint)
    setDescKey((k) => k + 1)
  }

  return (
    <section id="acabamento" className="relative bg-ae-black py-32 md:py-52 overflow-hidden">
      {/* Ambient glow — changes with active paint */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 72% 50%, ${active.glow}, transparent)`,
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20 items-center">

          {/* ── Left: text + swatches ── */}
          <div className="flex flex-col">
            <p className="section-label text-ae-red mb-6 reveal">ACABAMENTOS</p>
            <h2
              className="section-title text-ae-white mb-6 reveal"
              data-delay="1"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 5rem)' }}
            >
              ESCOLHA SEU<br />
              <span className="text-ae-red">ACABAMENTO.</span>
            </h2>
            <p
              className="font-body text-ae-white/40 text-sm leading-relaxed mb-14 max-w-sm reveal"
              data-delay="2"
            >
              Cada tipo de tinta oferece características únicas. Selecione para visualizar o resultado.
            </p>

            {/* Swatches */}
            <div className="flex gap-5 mb-12">
              {paints.map((paint) => {
                const isActive = active.id === paint.id
                return (
                  <button
                    key={paint.id}
                    onClick={() => selectPaint(paint)}
                    aria-label={paint.label}
                    aria-pressed={isActive}
                    className="group flex flex-col items-center gap-3 focus:outline-none"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ease-out ${
                        isActive
                          ? 'w-14 h-14 shadow-[0_0_0_2px_rgba(244,244,244,0.45),0_0_0_5px_#08090B]'
                          : 'w-11 h-11 opacity-50 group-hover:opacity-85 group-hover:scale-110'
                      }`}
                      style={{
                        background:
                          paint.id === 'camaleao'
                            ? 'conic-gradient(from 0deg, #3DC48C, #5B9BD4, #6B4FA0, #E84B6B, #3DC48C)'
                            : paint.swatchColor,
                      }}
                    />
                    <span
                      className={`font-display text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                        isActive
                          ? 'text-ae-white'
                          : 'text-ae-white/30 group-hover:text-ae-white/55'
                      }`}
                    >
                      {paint.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Description — re-animates on paint change */}
            <div
              key={descKey}
              className="border-l-2 border-ae-red/50 pl-6 paint-desc-enter"
            >
              <p className="font-display text-[10px] text-ae-red/80 tracking-[0.22em] uppercase mb-2">
                {active.sub}
              </p>
              <p className="font-body text-ae-white/55 text-sm leading-relaxed max-w-xs">
                {active.description}
              </p>
            </div>
          </div>

          {/* ── Right: paint preview ── */}
          <div className="flex justify-center lg:justify-end items-center">
            <div className="relative">
              {/* Paint surface — key forces remount + enter animation on change */}
              <div
                key={active.id}
                className={`relative overflow-hidden ${
                  active.chameleon ? 'paint-chameleon' : 'paint-preview-enter'
                }`}
                style={{
                  width: 'clamp(260px, 34vw, 480px)',
                  height: 'clamp(260px, 34vw, 480px)',
                  borderRadius: '45% 55% 60% 40% / 45% 40% 60% 55%',
                  background: active.gradient,
                  boxShadow: `0 0 100px 0 ${active.glow}, 0 24px 60px rgba(0,0,0,0.6)`,
                }}
              >
                {/* Top-left highlight — simulates light source */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 55% 40% at 25% 20%, rgba(255,255,255,0.18) 0%, transparent 65%)',
                  }}
                />

                {/* Shimmer stripe (metallic & chameleon) */}
                {active.shimmer && <div className="paint-shimmer-stripe" aria-hidden />}

                {/* Pearl iridescence overlay */}
                {active.id === 'perolizada' && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(135deg, transparent 20%, rgba(180,210,255,0.08) 45%, rgba(255,200,220,0.07) 60%, transparent 80%)',
                      mixBlendMode: 'screen',
                    }}
                  />
                )}

                {/* Deep shadow — bottom-right */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 55% 50% at 78% 85%, rgba(0,0,0,0.5) 0%, transparent 65%)',
                  }}
                />
              </div>

              {/* Floor reflection */}
              <div
                aria-hidden
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 blur-3xl opacity-20 rounded-full transition-all duration-700"
                style={{
                  width: '65%',
                  height: '50px',
                  background: active.swatchColor,
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
