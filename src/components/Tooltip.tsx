import {
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import {
  useState,
} from 'react'

interface TooltipProps {
  content: string
}

export function Tooltip({ content }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="text-gray-500 hover:text-gray-300 transition-colors"
        aria-label="More information"
      >
        <InformationCircleIcon className="h-4 w-4" />
      </button>
      {visible && (
        <span className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-48 rounded-md bg-gray-800 px-3 py-2 text-xs text-gray-200 shadow-lg ring-1 ring-white/10">
          {content}
        </span>
      )}
    </span>
  )
}
