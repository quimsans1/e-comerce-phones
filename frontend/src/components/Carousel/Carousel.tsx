import { useCallback, useEffect, useRef, useState } from 'react'
import type { Product } from '../../types/Product'
import { ProductCard } from '../ProductCard/ProductCard'
import './Carousel.scss'

interface CarouselProps {
  products: Product[]
}

export const Carousel = ({ products }: CarouselProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef(false)
  const movedRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartScrollLeftRef = useRef(0)

  // Visual states for cursor and progress bar
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [thumbWidth, setThumbWidth] = useState(100)

  const updateProgress = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const maxScroll = track.scrollWidth - track.clientWidth
    const nextProgress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0
    const nextThumbWidth = track.scrollWidth > 0
      ? (track.clientWidth / track.scrollWidth) * 100
      : 100

    setProgress(Math.max(0, Math.min(1, nextProgress)))
    setThumbWidth(Math.max(0, Math.min(100, nextThumbWidth)))
  }, [])

  useEffect(() => {
    // Sync after paint to avoid setState directly in effect body
    const frameId = window.requestAnimationFrame(updateProgress)

    const handleResize = () => updateProgress()
    window.addEventListener('resize', handleResize)
    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [products.length, updateProgress])

  // End drag
  const stopDragging = useCallback(() => {
    if (!draggingRef.current) return

    draggingRef.current = false
    setIsDragging(false)
  }, [])

  // Move carousel while dragging (used by mouse/touch listeners)
  const handleDragMove = useCallback((clientX: number) => {
    if (!draggingRef.current) return

    const track = trackRef.current
    if (!track) return

    const deltaX = clientX - dragStartXRef.current
    if (Math.abs(deltaX) > 2) {
      movedRef.current = true
    }

    track.scrollLeft = dragStartScrollLeftRef.current - deltaX
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      handleDragMove(event.clientX)
      if (draggingRef.current) {
        event.preventDefault()
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      handleDragMove(touch.clientX)
      if (draggingRef.current) {
        event.preventDefault()
      }
    }

    const handleDragEnd = () => stopDragging()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleDragEnd)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleDragEnd)
    window.addEventListener('touchcancel', handleDragEnd)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleDragEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleDragEnd)
      window.removeEventListener('touchcancel', handleDragEnd)
    }
  }, [handleDragMove, stopDragging])

  // Start drag with mouse
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return

    const track = trackRef.current
    if (!track) return

    draggingRef.current = true
    movedRef.current = false
    setIsDragging(true)
    dragStartXRef.current = event.clientX
    dragStartScrollLeftRef.current = track.scrollLeft
    event.preventDefault()
  }

  // Start drag with touch
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    if (!touch) return

    const track = trackRef.current
    if (!track) return

    draggingRef.current = true
    movedRef.current = false
    setIsDragging(true)
    dragStartXRef.current = touch.clientX
    dragStartScrollLeftRef.current = track.scrollLeft
  }

  const displayedThumbWidth = Math.min(thumbWidth, 18)
  const maxThumbLeft = Math.max(0, 100 - displayedThumbWidth)
  const thumbLeft = progress * maxThumbLeft

  return (
    <div className="similar-products-carousel">
      <div
        ref={trackRef}
        className={`similar-products-carousel-viewport ${isDragging ? 'is-dragging' : ''}`}
        onScroll={updateProgress}
        onDragStart={(event) => event.preventDefault()}
        onMouseDown={handleMouseDown}
        onMouseMove={(event) => {
          if (!draggingRef.current) return
          handleDragMove(event.clientX)
          event.preventDefault()
        }}
        onMouseUp={stopDragging}
        onTouchStart={handleTouchStart}
        onTouchMove={(event) => {
          const touch = event.touches[0]
          if (!touch) return
          handleDragMove(touch.clientX)
          if (draggingRef.current) {
            event.preventDefault()
          }
        }}
        onTouchEnd={stopDragging}
        onTouchCancel={stopDragging}
        onClickCapture={(event) => {
          if (!movedRef.current) return
          event.preventDefault()
          event.stopPropagation()
          movedRef.current = false
        }}
        aria-label="Carrusel de productos similares"
      >
        <div className="similar-products-carousel-track">
          {products.map((product) => (
            <div key={product.id} className="similar-products-carousel-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="similar-products-carousel-progress" aria-hidden="true">
        <div
          className="similar-products-carousel-progress-thumb"
          style={{
            width: `${displayedThumbWidth}%`,
            left: `${thumbLeft}%`,
          }}
        />
      </div>
    </div>
  )
}