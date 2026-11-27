import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const observe = () => {
      document.querySelectorAll('.reveal:not(.is-revealed)').forEach((el) => observer.observe(el))
    }

    observe()
    const timer = setTimeout(observe, 400)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])
}
