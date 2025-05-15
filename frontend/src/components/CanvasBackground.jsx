import { useEffect, useRef } from 'react'

export default function CanvasBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const balls = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 1,
      dx: Math.random() - 0.5,
      dy: Math.random() - 0.5,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      balls.forEach(b => {
        b.x += b.dx
        b.y += b.dy

        if (b.x < 0 || b.x > canvas.width) b.dx *= -1
        if (b.y < 0 || b.y > canvas.height) b.dy *= -1

        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
<canvas
  ref={canvasRef}
  className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
/>

  )
}