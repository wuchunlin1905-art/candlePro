import { useState, type ImgHTMLAttributes } from 'react'

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  onLoadFailed?: () => void
}

/** 加载失败时不渲染，并通知父组件 */
export default function SafeImage({
  onLoadFailed,
  onError,
  alt = '',
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed || !props.src) return null

  return (
    <img
      {...props}
      alt={alt}
      onError={(e) => {
        setFailed(true)
        onLoadFailed?.()
        onError?.(e)
      }}
    />
  )
}
