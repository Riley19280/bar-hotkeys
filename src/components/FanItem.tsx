import { useLayoutEffect, useRef, useState } from 'react'

const CARD_WIDTH = 112 // w-28 = 7rem

interface FanItemProps {
  children: React.ReactNode
  index: number
  hoveredIndex: number | null
  onHover: (index: number | null) => void
  angle: number
  /** Negative = overlap, positive = gap */
  spacing: number
}

export function FanItem({ children, index, hoveredIndex, onHover, angle, spacing }: FanItemProps) {
  const isHovered = hoveredIndex === index

  let translateX = 0
  if (hoveredIndex !== null && !isHovered) {
    translateX = index < hoveredIndex ? -48 : 48
  }

  return (
    <div
      className="relative"
      style={{
        perspective: '120px',
        zIndex: isHovered ? 20 : 1,
        transform: `translateX(${translateX}px)`,
        transition: 'transform 0.2s ease',
        ...(index > 0 && { marginLeft: `${spacing}px` }),
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        style={{
          transform: isHovered
            ? 'rotateY(0deg) translateZ(30px) scale(1.15)'
            : `rotateY(${angle}deg)`,
          transition: 'transform 0.2s ease',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function FanRow({ items }: { items: Array<{ key: string; node: React.ReactNode }> }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useLayoutEffect(() => {
    const el = rowRef.current
    if (!el) return
    setContainerWidth(el.getBoundingClientRect().width)
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const numItems = items.length
  // Exact overlap so all N cards fit: first card is full width, each subsequent adds (CARD_WIDTH - overlap)
  const overlapPx = numItems > 1
    ? Math.max(0, Math.min(Math.round(CARD_WIDTH - (containerWidth - CARD_WIDTH) / (numItems - 1)), Math.round(CARD_WIDTH * 0.8)))
    : 0
  const ratio = 1 - overlapPx / (CARD_WIDTH * 0.8)
  const angle = Math.max(5, Math.round(45 * (1 - ratio)))
  const spacing = overlapPx > 0 ? -overlapPx : 16

  return (
    <div ref={rowRef} className="w-full flex items-center justify-center py-4">
        {items.map(({ key, node }, i) => (
          <FanItem
            key={key}
            index={i}
            hoveredIndex={hoveredIndex}
            onHover={setHoveredIndex}
            angle={angle}
            spacing={spacing}
          >
            {node}
          </FanItem>
        ))}
    </div>
  )
}
