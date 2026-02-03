type TintedImageProps = {
  src: string
  alt?: string
  title: string
  tintColor?: string // tailwind color class e.g. "from-indigo-500"
}

export function TintedImage({
                              src,
                              alt,
                              title,
                              tintColor = 'green-800',
                            }: TintedImageProps) {


  // Keep these for tailwind whitelist
  // bg-red-500 bg-green-800
  return (
    <div className="relative overflow-hidden group w-28 h-28">
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to top, var(--color-black) 10%, transparent 40%),
            linear-gradient(to bottom, color-mix(in oklch, var(--color-${tintColor}) 50%, transparent) 0%, transparent 10%),
            linear-gradient(to right, color-mix(in oklch, var(--color-${tintColor}) 50%, transparent) 0%, transparent 10%),
            linear-gradient(to left, color-mix(in oklch, var(--color-${tintColor}) 50%, transparent) 0%, transparent 10%)
          `,
        }}
      />

      {/* Bottom text */}
      <div className="absolute bottom-0 w-full p-4">
        <h3 className="text-white text-[8px] font-semibold drop-shadow">
          {title}
        </h3>
      </div>
    </div>
  )
}
