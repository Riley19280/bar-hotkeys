import { useState } from 'react'

interface FanItemProps {
  children: React.ReactNode
  index: number
  hoveredIndex: number | null
  onHover: (index: number | null) => void
}

export function FanItem({ children, index, hoveredIndex, onHover }: FanItemProps) {
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
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        style={{
          transform: isHovered
            ? 'rotateY(0deg) translateZ(30px) scale(1.15)'
            : 'rotateY(45deg)',
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

  return (
    <div className="flex items-center [&>*+*]:-ml-16 py-4">
      {items.map(({ key, node }, i) => (
        <FanItem
          key={key}
          index={i}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
        >
          {node}
        </FanItem>
      ))}
    </div>
  )
}
