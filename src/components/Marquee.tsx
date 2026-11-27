const items = [
  'PINTURA AUTOMOTIVA',
  '—',
  'FUNILARIA',
  '—',
  'POLIMENTO TÉCNICO',
  '—',
  'ESTÉTICA AUTOMOTIVA',
  '—',
  'REPARAÇÃO DE PINTURA',
  '—',
  'THE ART OF AUTOMOTIVE PERFECTION',
  '—',
]

interface MarqueeProps {
  className?: string
  inverted?: boolean
}

export default function Marquee({ className = '', inverted = false }: MarqueeProps) {
  const repeated = [...items, ...items]

  return (
    <div className={`overflow-hidden select-none ${className}`}>
      <div
        className="marquee-track"
        style={inverted ? { animationDirection: 'reverse' } : {}}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`font-display text-xs tracking-[0.3em] uppercase whitespace-nowrap px-6 ${
              item === '—' ? 'text-ae-red' : 'text-ae-white/30'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
