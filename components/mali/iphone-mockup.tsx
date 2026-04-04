"use client"

import { useId } from "react"

interface IPhoneMockupProps {
  src: string
  alt: string
  width?: number
  accentColor?: string
  className?: string
  animate?: boolean
}

export function IPhoneMockup({
  src,
  alt,
  width = 260,
  accentColor = "#F5A623",
  className = "",
  animate = true,
}: IPhoneMockupProps) {
  const uid = useId().replace(/:/g, "")

  const W = width
  const H = Math.round(W * 2.168)
  const R = Math.round(W * 0.155)

  const sx = Math.round(W * 0.055)
  const sy = Math.round(H * 0.088)
  const sw = W - sx * 2
  const sh = Math.round(H * 0.822)
  const sr = Math.round(W * 0.075)

  const diW = Math.round(W * 0.28)
  const diH = Math.round(H * 0.026)
  const diX = W / 2 - diW / 2
  const diY = sy + Math.round(H * 0.012)

  const screenClipId = `sc-${uid}`
  const glareClipId  = `gc-${uid}`
  const bodySheenId  = `bs-${uid}`
  const screenGlowId = `sg-${uid}`
  const glareGradId  = `gg-${uid}`

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width: W, height: H }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt}
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <linearGradient id={bodySheenId} x1="0" y1="0" x2={W} y2={H} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#48484A" />
            <stop offset="15%"  stopColor="#3A3A3C" />
            <stop offset="40%"  stopColor="#1C1C1E" />
            <stop offset="68%"  stopColor="#2C2C2E" />
            <stop offset="100%" stopColor="#48484A" />
          </linearGradient>

          <radialGradient id={screenGlowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={accentColor} stopOpacity="0.22" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>

          <linearGradient id={glareGradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="38%"  stopColor="white" stopOpacity="0.22" />
            <stop offset="52%"  stopColor="white" stopOpacity="0.06" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <clipPath id={screenClipId}>
            <rect x={sx} y={sy} width={sw} height={sh} rx={sr} />
          </clipPath>
          <clipPath id={glareClipId}>
            <rect x={sx} y={sy} width={sw} height={sh} rx={sr} />
          </clipPath>
        </defs>

        {/* Drop shadow */}
        <rect x={6} y={10} width={W - 12} height={H - 16} rx={R} fill="rgba(0,0,0,0.5)" style={{ filter: "blur(20px)" }} />

        {/* Body */}
        <rect x={0} y={0} width={W} height={H} rx={R} fill={`url(#${bodySheenId})`} />

        {/* Outer ring highlight */}
        <rect x={1} y={1} width={W-2} height={H-2} rx={R-1} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" />
        <rect x={0.5} y={0.5} width={W-1} height={H-1} rx={R} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="1" />

        {/* Screen glow halo */}
        <rect x={sx-5} y={sy-5} width={sw+10} height={sh+10} rx={sr+5} fill={`url(#${screenGlowId})`} />

        {/* Screen black backing */}
        <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#060606" />

        {/* App screenshot — uses SVG image element, NO next/image, avoids DOM Image collision */}
        <image
          href={src}
          x={sx}
          y={sy}
          width={sw}
          height={sh}
          preserveAspectRatio="xMidYMin slice"
          clipPath={`url(#${screenClipId})`}
        />

        {/* Animated glare sweep */}
        <rect
          x={sx} y={sy} width={sw} height={sh}
          rx={sr}
          fill={`url(#${glareGradId})`}
          clipPath={`url(#${glareClipId})`}
        >
          {animate && (
            <animateTransform
              attributeName="transform"
              type="translate"
              from={`${-sw * 1.6} 0`}
              to={`${sw * 1.6} 0`}
              dur="4s"
              repeatCount="indefinite"
              begin="1.2s"
            />
          )}
        </rect>

        {/* Accent screen ring */}
        <rect x={sx-1} y={sy-1} width={sw+2} height={sh+2} rx={sr+1} fill="none" stroke={accentColor} strokeWidth="1.2" opacity="0.28" />

        {/* Dynamic Island */}
        <rect x={diX} y={diY} width={diW} height={diH} rx={diH/2} fill="#000" />
        <circle cx={diX + diW - diH*0.72} cy={diY + diH/2} r={diH*0.23} fill="#1a1a1a" />
        <circle cx={diX + diH*0.72} cy={diY + diH/2} r={diH*0.17} fill="#111" />

        {/* Status bar — time */}
        <text x={sx+12} y={sy + Math.round(H*0.056)} fontSize={Math.round(W*0.044)} fontWeight="600" fill="white" fontFamily="system-ui,-apple-system,sans-serif">9:41</text>

        {/* Signal bars */}
        {[0,1,2,3].map((b) => (
          <rect
            key={b}
            x={sx+sw-44+b*6} y={sy+Math.round(H*0.043)-(b+1)*3}
            width={4} height={(b+1)*3} rx={1}
            fill={b < 3 ? "white" : "rgba(255,255,255,0.28)"}
          />
        ))}

        {/* Battery */}
        <rect x={sx+sw-11} y={sy+Math.round(H*0.037)} width={10} height={6} rx={1.5} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
        <rect x={sx+sw-10.2} y={sy+Math.round(H*0.037)+0.8} width={5.8} height={4.4} rx={0.8} fill="white" />
        <rect x={sx+sw-1.2} y={sy+Math.round(H*0.040)} width={1.2} height={2.5} rx={0.6} fill="rgba(255,255,255,0.45)" />

        {/* Volume up */}
        <rect x={-3} y={H*0.195} width={4} height={H*0.065} rx={2} fill="#3A3A3C" />
        {/* Volume down */}
        <rect x={-3} y={H*0.278} width={4} height={H*0.065} rx={2} fill="#3A3A3C" />
        {/* Silent toggle */}
        <rect x={-3} y={H*0.145} width={4} height={H*0.036} rx={2} fill="#3A3A3C" />
        {/* Power */}
        <rect x={W-1} y={H*0.265} width={4} height={H*0.1} rx={2} fill="#3A3A3C" />

        {/* Rear camera cluster */}
        <rect x={W*0.06} y={H*0.012} width={W*0.35} height={H*0.054} rx={W*0.04} fill="#151515" opacity="0.9" />
        <circle cx={W*0.15} cy={H*0.039} r={W*0.035} fill="#0a0a0a" />
        <circle cx={W*0.15} cy={H*0.039} r={W*0.022} fill="#111" />
        <circle cx={W*0.15} cy={H*0.039} r={W*0.012} fill="#1e1e1e" />
        <circle cx={W*0.26} cy={H*0.039} r={W*0.035} fill="#0a0a0a" />
        <circle cx={W*0.26} cy={H*0.039} r={W*0.022} fill="#111" />
        <circle cx={W*0.26} cy={H*0.039} r={W*0.012} fill="#1e1e1e" />
        <circle cx={W*0.35} cy={H*0.039} r={W*0.018} fill="#2a2a2a" />

        {/* Home indicator */}
        <rect
          x={W/2 - W*0.14} y={sy+sh-Math.round(H*0.031)}
          width={W*0.28} height={Math.round(H*0.005)}
          rx={Math.round(H*0.003)}
          fill="rgba(255,255,255,0.35)"
        />

        {/* Inner screen edge */}
        <rect x={sx+0.5} y={sy+0.5} width={sw-1} height={sh-1} rx={sr} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      </svg>
    </div>
  )
}
