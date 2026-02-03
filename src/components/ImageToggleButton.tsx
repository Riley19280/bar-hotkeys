import { TintedImage } from '@/components/TintedImage.tsx'

interface ImageToggleButtonProps {
  label: string;
  imageSrc: string;
  enabled: boolean;
  onClick: () => void;
}

export function ImageToggleButton({ label, imageSrc, enabled, onClick }: ImageToggleButtonProps) {
  return (
    <button onClick={onClick}>
      <TintedImage src={imageSrc} title={label} tintColor={enabled ? 'green-500' : 'red-500'}/>
    </button>
  )
}
