import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_NUMBER = '5571900000000'

const services = [
  'Pintura Automotiva',
  'Funilaria',
  'Polimento Técnico',
  'Estética Automotiva',
  'Reparação de Pintura',
  'Outro',
]

interface FormData {
  name: string
  whatsapp: string
  vehicle: string
  service: string
  description: string
}

function buildWhatsAppMessage(data: FormData) {
  return encodeURIComponent(
    `Olá! Gostaria de solicitar um orçamento.\n\n` +
    `*Nome:* ${data.name}\n` +
    `*WhatsApp:* ${data.whatsapp}\n` +
    `*Veículo:* ${data.vehicle}\n` +
    `*Serviço:* ${data.service}\n` +
    `*Descrição:* ${data.description}`
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState<FormData>({
    name: '', whatsapp: '', vehicle: '', service: '', description: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title-line', {
        yPercent: 110,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.contact-heading', start: 'top 80%' },
      })

      gsap.from('.contact-form', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Informe seu nome'
    if (!form.whatsapp.trim()) e.whatsapp = 'Informe seu WhatsApp'
    if (!form.vehicle.trim()) e.vehicle = 'Informe o modelo do veículo'
    if (!form.service) e.service = 'Selecione um serviço'
    if (!form.description.trim()) e.description = 'Descreva o problema'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const msg = buildWhatsAppMessage(form)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const inputClass = (field: keyof FormData) =>
    `w-full bg-transparent border-b ${errors[field] ? 'border-ae-red' : 'border-ae-white/20'} py-4 font-body text-ae-white text-sm placeholder:text-ae-white/30 focus:outline-none focus:border-ae-red transition-colors duration-300`

  return (
    <section id="contato" ref={sectionRef} className="bg-ae-black-2 py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Heading */}
          <div className="contact-heading">
            <p className="section-label text-ae-red mb-6">ORÇAMENTO</p>
            <h2 className="section-title text-[clamp(2.5rem,5vw,5rem)] text-ae-white leading-none mb-10">
              <span className="text-reveal block">
                <span className="contact-title-line block">VAMOS</span>
              </span>
              <span className="text-reveal block">
                <span className="contact-title-line block">TRANSFORMAR</span>
              </span>
              <span className="text-reveal block">
                <span className="contact-title-line block text-ae-red">SEU VEÍCULO?</span>
              </span>
            </h2>
            <p className="font-body text-ae-white/50 text-base leading-relaxed max-w-sm">
              Preencha o formulário e enviaremos uma mensagem diretamente ao nosso WhatsApp para darmos início ao seu orçamento.
            </p>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="space-y-8">
              <div>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className={inputClass('name')}
                />
                {errors.name && <p className="mt-1 text-ae-red text-xs font-display">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Seu WhatsApp"
                  value={form.whatsapp}
                  onChange={e => handleChange('whatsapp', e.target.value)}
                  className={inputClass('whatsapp')}
                />
                {errors.whatsapp && <p className="mt-1 text-ae-red text-xs font-display">{errors.whatsapp}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Modelo do veículo (ex: Honda Civic 2020)"
                  value={form.vehicle}
                  onChange={e => handleChange('vehicle', e.target.value)}
                  className={inputClass('vehicle')}
                />
                {errors.vehicle && <p className="mt-1 text-ae-red text-xs font-display">{errors.vehicle}</p>}
              </div>

              <div>
                <select
                  value={form.service}
                  onChange={e => handleChange('service', e.target.value)}
                  className={`${inputClass('service')} appearance-none bg-ae-black-2`}
                >
                  <option value="" disabled>Serviço desejado</option>
                  {services.map(s => (
                    <option key={s} value={s} className="bg-ae-black-2">{s}</option>
                  ))}
                </select>
                {errors.service && <p className="mt-1 text-ae-red text-xs font-display">{errors.service}</p>}
              </div>

              <div>
                <textarea
                  rows={3}
                  placeholder="Descreva o problema ou o que precisa ser feito"
                  value={form.description}
                  onChange={e => handleChange('description', e.target.value)}
                  className={`${inputClass('description')} resize-none`}
                />
                {errors.description && <p className="mt-1 text-ae-red text-xs font-display">{errors.description}</p>}
              </div>

              <button type="submit" className="btn-primary w-full justify-center group">
                ENVIAR VIA WHATSAPP
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
