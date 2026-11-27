import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 280

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Skip WebGL on mobile — too heavy and causes hangs
    if (window.innerWidth < 768) return

    // ── Renderer ───────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setClearColor(0x000000, 0)

    // ── Scene / Camera ─────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100)
    camera.position.z = 5

    // ── Particles ──────────────────────────────────
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)

    const colWhite = new THREE.Color('#F4F4F4')
    const colRed   = new THREE.Color('#D71920')
    const colGray  = new THREE.Color('#8A8D93')

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6

      const roll = Math.random()
      const c = roll < 0.12 ? colRed : roll < 0.3 ? colGray : colWhite
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i] = Math.random() * 2.2 + 0.6
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes,     1))

    const mat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
      depthWrite: false,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // ── Mouse parallax ─────────────────────────────
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ─────────────────────────────────────
    const onResize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Individual particle velocities (drift up) ──
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      velocities[i * 3]     = (Math.random() - 0.5) * 0.0004
      velocities[i * 3 + 1] = Math.random() * 0.0012 + 0.0003 // drift up
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0003
    }

    // ── Animate ────────────────────────────────────
    let raf = 0
    const posAttr = geo.attributes.position as THREE.BufferAttribute

    const animate = () => {
      raf = requestAnimationFrame(animate)

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.025
      targetY += (mouseY - targetY) * 0.025
      camera.position.x = targetX * 0.4
      camera.position.y = -targetY * 0.25

      // Drift particles
      const pos = posAttr.array as Float32Array
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3]     += velocities[i * 3]
        pos[i * 3 + 1] += velocities[i * 3 + 1]
        pos[i * 3 + 2] += velocities[i * 3 + 2]

        // Wrap at top → reset to bottom
        if (pos[i * 3 + 1] > 5.5) {
          pos[i * 3 + 1] = -5.5
          pos[i * 3]     = (Math.random() - 0.5) * 14
        }
      }
      posAttr.needsUpdate = true

      // Slow rotation
      points.rotation.y += 0.00015
      points.rotation.x += 0.00008

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
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
