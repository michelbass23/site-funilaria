import { useLenis } from './hooks/useLenis'
import { useScrollReveal } from './hooks/useScrollReveal'
import Cursor from './components/Cursor'
import Header from './components/Header'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Services from './components/Services'
import BeforeAfter from './components/BeforeAfter'
import Experience from './components/Experience'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import CTAFinal from './components/CTAFinal'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import FloatingNav from './components/FloatingNav'

export default function App() {
  useLenis()
  useScrollReveal()

  return (
    <>
      {/* Custom cursor — hidden on touch devices */}
      <div className="hidden md:block">
        <Cursor />
      </div>

      {/* Grain overlay */}
      <div className="grain pointer-events-none" aria-hidden />

      <div className="bg-ae-black text-ae-white overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <Manifesto />
          <Services />
          <BeforeAfter />
          <Experience />
          <Gallery />
          <Contact />
          <CTAFinal />
        </main>
        <Footer />
        <WhatsAppFloat />
        <FloatingNav />
      </div>
    </>
  )
}
