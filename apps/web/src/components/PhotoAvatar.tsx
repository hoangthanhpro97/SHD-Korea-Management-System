import { useState } from 'react'

interface PhotoAvatarProps {
  src?: string
  alt: string
  aspectRatio?: '3:4' | '1:1'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  show3x4Badge?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  fallbackType?: 'student' | 'father' | 'mother'
}

export default function PhotoAvatar({
  src,
  alt,
  aspectRatio = '3:4',
  size = 'md',
  className = '',
  show3x4Badge = false,
  rounded = 'md',
  fallbackType = 'student',
}: PhotoAvatarProps) {
  const [imgError, setImgError] = useState(false)

  // Sizing definitions
  const sizeClasses3x4 = {
    xs: 'w-6 h-8 text-[10px]',
    sm: 'w-9 h-12 text-xs',
    md: 'w-12 h-16 text-sm',
    lg: 'w-18 h-24 text-base',
    xl: 'w-24 h-32 text-xl',
  }

  const sizeClasses1x1 = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-9 h-9 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-xl',
  }

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-xl',
    full: 'rounded-full',
  }

  const dimensionClass = aspectRatio === '3:4' ? sizeClasses3x4[size] : sizeClasses1x1[size]
  const roundedClass = roundedClasses[rounded]

  // Fallback initial
  const initial = alt ? alt.trim().charAt(alt.trim().lastIndexOf(' ') + 1) || alt.charAt(0) : '?'

  const fallbackBg =
    fallbackType === 'father'
      ? 'bg-blue-800 text-blue-100'
      : fallbackType === 'mother'
      ? 'bg-rose-800 text-rose-100'
      : 'bg-[#033399] text-white'

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-slate-200/80 bg-slate-100 shadow-2xs ${dimensionClass} ${roundedClass} ${className}`}
      title={alt}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      ) : (
        <div className={`flex h-full w-full flex-col items-center justify-center font-bold select-none ${fallbackBg}`}>
          <span>{initial}</span>
          {aspectRatio === '3:4' && (size === 'md' || size === 'lg' || size === 'xl') && (
            <span className="text-[8px] font-mono tracking-tight opacity-75">3x4</span>
          )}
        </div>
      )}

      {/* 3x4 Badge Tag for authentic photo look */}
      {aspectRatio === '3:4' && show3x4Badge && (size === 'lg' || size === 'xl') && (
        <span className="absolute bottom-0 right-0 rounded-tl-md bg-slate-900/80 px-1.5 py-0.2 font-mono text-[9px] font-bold text-white backdrop-blur-xs">
          3×4
        </span>
      )}
    </div>
  )
}