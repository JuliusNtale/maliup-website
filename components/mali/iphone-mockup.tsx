import Image from "next/image"

interface IPhoneMockupProps {
  src: string
  alt: string
  width?: number
  accentColor?: string
  priority?: boolean
  className?: string
}

/**
 * Renders an app screenshot inside a realistic iPhone 16 frame SVG.
 * The frame is drawn with SVG so it scales perfectly at any size.
 */
export function IPhoneMockup({
  src,
  alt,
  width = 260,
  accentColor = "#F5A623",
  priority = false,
  className = "",
}: IPhoneMockupProps) {
  // Aspect ratio of iPhone 16: ~393 × 852 px logical → ≈ 1 : 2.168
  const height = Math.round(width * 2.168)

  // Inner screen insets (as % of total frame size)
  // top: ~10%, bottom: ~8%, sides: ~5%
  const screenX = Math.round(width * 0.055)
  const screenY = Math.round(height * 0.095)
  const screenW = width - screenX * 2
  const screenH = Math.round(height * 0.815)
  const screenR = Math.round(width * 0.08) // inner corner radius

  const frameR = Math.round(width * 0.155) // outer corner radius

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width, height }}
      aria-label={alt}
    >
      {/* ── SVG iPhone frame ── */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Shadow ring */}
        <rect
          x="2" y="2"
          width={width - 4} height={height - 4}
          rx={frameR}
          fill="none"
          stroke="rgba(0,0,0,0.45)"
          strokeWidth="4"
        />
        {/* Outer body */}
        <rect
          x="0" y="0"
          width={width} height={height}
          rx={frameR}
          fill="#1C1C1E"
        />
        {/* Side sheen — left edge highlight */}
        <rect
          x="0" y="0"
          width={width} height={height}
          rx={frameR}
          fill="none"
          stroke="url(#frameSheen)"
          strokeWidth="1.5"
        />
        {/* Titanium-style border */}
        <rect
          x="1.5" y="1.5"
          width={width - 3} height={height - 3}
          rx={frameR - 1}
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth="1"
        />

        {/* Screen area cutout (clip) */}
        <clipPath id={`screenClip-${width}`}>
          <rect
            x={screenX} y={screenY}
            width={screenW} height={screenH}
            rx={screenR}
          />
        </clipPath>

        {/* Screen bezel (dark backing) */}
        <rect
          x={screenX} y={screenY}
          width={screenW} height={screenH}
          rx={screenR}
          fill="#000"
        />

        {/* Dynamic Island pill */}
        <rect
          x={width / 2 - width * 0.12}
          y={screenY + height * 0.012}
          width={width * 0.24}
          height={height * 0.028}
          rx={height * 0.014}
          fill="#000"
        />

        {/* Button details — right side volume buttons */}
        <rect x={-2} y={height * 0.22} width={3} height={height * 0.065} rx="1.5" fill="#2C2C2E" />
        <rect x={-2} y={height * 0.31} width={3} height={height * 0.065} rx="1.5" fill="#2C2C2E" />
        {/* Power button — left side */}
        <rect x={width - 1} y={height * 0.28} width={3} height={height * 0.1} rx="1.5" fill="#2C2C2E" />

        {/* Bottom home indicator */}
        <rect
          x={width / 2 - width * 0.14}
          y={screenY + screenH - height * 0.04}
          width={width * 0.28}
          height={height * 0.006}
          rx={height * 0.003}
          fill="rgba(255,255,255,0.35)"
        />

        {/* Accent glow ring */}
        <rect
          x={screenX - 1} y={screenY - 1}
          width={screenW + 2} height={screenH + 2}
          rx={screenR + 1}
          fill="none"
          stroke={accentColor}
          strokeWidth="1"
          opacity="0.25"
        />

        <defs>
          <linearGradient id="frameSheen" x1="0" y1="0" x2={width} y2={height} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
            <stop offset="25%"  stopColor="rgba(255,255,255,0.06)" />
            <stop offset="60%"  stopColor="rgba(0,0,0,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.14)" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── App screenshot (sits behind the SVG frame) ── */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: screenX,
          top: screenY,
          width: screenW,
          height: screenH,
          borderRadius: screenR,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${screenW}px`}
          className="object-cover object-top"
          priority={priority}
          draggable={false}
        />
      </div>
    </div>
  )
}
