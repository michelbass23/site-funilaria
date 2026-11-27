import logoSrc from '../assets/logo.png'
import Marquee from './Marquee'

const WHATSAPP_NUMBER = '5571900000000'
const WHATSAPP_MSG = encodeURIComponent('Olá! Gostaria de mais informações.')

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Nosso trabalho', href: '#galeria' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const nav = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-ae-black border-t border-ae-white/[0.06]">
      {/* Marquee stripe */}
      <div className="border-b border-ae-white/[0.05] py-3">
        <Marquee />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-ae-white/[0.05]">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logoSrc} alt="Ateliê Automotivo" className="h-11 w-auto object-contain mb-5" />
            <p className="font-display text-[10px] tracking-[0.35em] text-ae-white/20 uppercase mb-3">
              THE ART OF AUTOMOTIVE PERFECTION
            </p>
            <p className="font-body text-ae-white/35 text-sm leading-relaxed mt-3 max-w-xs">
              Pintura automotiva e estética especializada.<br />
              Precisão em cada processo. Excelência em cada acabamento.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="section-label text-ae-gray mb-6">NAVEGAÇÃO</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); nav(link.href) }}
                  className="font-body text-ae-white/40 hover:text-ae-white text-sm transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label text-ae-gray mb-6">CONTATO</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-body text-ae-white/40 hover:text-ae-white text-sm transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-ae-red flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-ae-white/15 text-xs">
            © {year} Ateliê Automotivo. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-ae-red" />
            <p className="font-display text-ae-white/15 text-[10px] tracking-[0.3em] uppercase">
              Salvador, BA — Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
