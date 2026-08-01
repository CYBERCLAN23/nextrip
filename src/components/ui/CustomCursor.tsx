'use client'

import { useEffect } from 'react'

export function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    
    const dot = document.createElement('div')
    const ring = document.createElement('div')
    
    dot.style.cssText = `
      position: fixed; top: 0; left: 0; z-index: 9999;
      width: 6px; height: 6px; border-radius: 50%;
      background: #e4b04f; pointer-events: none;
      transform: translate(-50%, -50%);
      transition: transform 100ms, background 200ms;
    `
    
    ring.style.cssText = `
      position: fixed; top: 0; left: 0; z-index: 9998;
      width: 32px; height: 32px; border-radius: 50%;
      border: 1.5px solid rgba(228,176,79,0.6);
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: transform 150ms cubic-bezier(0.16,1,0.3,1), width 200ms, height 200ms, border-color 200ms;
    `
    
    document.body.appendChild(dot)
    document.body.appendChild(ring)
    
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }
    
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t
    
    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }
    const raf = requestAnimationFrame(animate)
    
    const onEnterHover = () => {
      ring.style.width = '56px'
      ring.style.height = '56px'
      ring.style.borderColor = 'rgba(228,176,79,0.9)'
      dot.style.background = '#75d4bc'
    }
    
    const onLeaveHover = () => {
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.borderColor = 'rgba(228,176,79,0.6)'
      dot.style.background = '#e4b04f'
    }

    const onMouseDown = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1.5)'
    }

    const onMouseUp = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
    }
    
    // Attach events using event delegation for dynamic content
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a') || target.closest('button') || target.closest('[data-cursor-hover]')) {
        onEnterHover()
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a') || target.closest('button') || target.closest('[data-cursor-hover]')) {
        onLeaveHover()
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(raf)
      dot.remove()
      ring.remove()
    }
  }, [])
  
  return null
}
