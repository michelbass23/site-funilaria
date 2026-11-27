import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.z = 4.5

    // Build ring of particles
    const COUNT = 600
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)

    const redColor   = new THREE.Color('#D71920')
    const whiteColor = new THREE.Color('#F4F4F4')
    const grayColor  = new THREE.Color('#8A8D93')

    for (let i = 0; i < COUNT; i++) {
      const isRing = i < COUNT * 0.7
      let x, y, z

      if (isRing) {
        // Distribute around 2–3 rings
        const ringIndex = Math.floor(Math.random() * 3)
        const radius = 1.6 + ringIndex * 0.55 + (Math.random() - 0.5) * 0.2
        const angle = Math.random() * Math.PI * 2
        const tilt = (Math.random() - 0.5) * 0.3
        x = Math.cos(angle) * radius
        y = Math.sin(angle) * radius * 0.3 + tilt
        z = Math.sin(angle) * radius * 0.7
      } else {
        // scattered background cloud
        x = (Math.random() - 0.5) * 7
        y = (Math.random() - 0.5) * 7
        z = (Math.random() - 0.5) * 3
      }

      pos[i * 3]     = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      const roll = Math.random()
      const c = roll < 0.18 ? redColor : roll < 0.35 ? grayColor : whiteColor
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    let mouse = { x: 0, y: 0 }
    let target = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      mouse.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      const w = canvas.offsetWidth
      camera.aspect = 1
      camera.updateProjectionMatrix()
      renderer.setSize(w, w)
    }
    window.addEventListener('resize', onResize)

    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      target.x += (mouse.x - target.x) * 0.03
      target.y += (mouse.y - target.y) * 0.03

      points.rotation.y += 0.0025 + target.x * 0.001
      points.rotation.x  = target.y * 0.15

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-square pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
