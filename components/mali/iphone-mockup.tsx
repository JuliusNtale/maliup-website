"use client"

import { useId } from "react"

interface IPhoneMockupProps {
  src: string
  alt: string
  width?: number
  accentColor?: string
  priority?: boolean
  className?: string
  animate?: boolean
}

/**
 * iPhone 17-style mockup that renders a real app screenshot clipped inside
 * an accurate SVG phone frame. Uses a plain <img> tag (not next/image fill)
 * to avoid the DOM Image constructor collision with next/image.
 *
 * The frame includes:
 *  - Titanium-tone body with multi-stop gradient sheen
 *  - Dynamic Island pill
 *  - Side buttons (volume + power)
 *  - Lens cluster (decorative)
 *  - Home indicator bar
 *  - Animated screen glare sweep
 *  - Accent glow ring around the screen
 */
export function IPhoneMockup({
  src,
  alt,
  width = 260,
  accentColor = "#F5A623",
  className = "",
  animate = true,
}: IPhoneMockupProps) {
  const uid = useId().replace(/:/g, "")

  // iPhone 17 proportions — 393 × 852 logical px → ratio ≈ 1 : 2.168
  const W = width
  const H = Math.round(W * 2.168)

  // Frame geometry
  const R = Math.round(W * 0.155)        // outer corner radius

  // Screen insets (tight to match real iPhone bezel)
  const sx = Math.round(W * 0.055)
  const sy = Math.round(H * 0.088)
  const sw = W - sx * 2
  const sh = Math.round(H * 0.822)
  const sr = Math.round(W * 0.075)      // screen corner radius

  // Dynamic Island
  const diW = Math.round(W * 0.26)
  const diH = Math.round(H * 0.027)
  const diX = W / 2 - diW / 2
  const diY = sy + Math.round(H * 0.01)

  // Clip IDs (unique per instance)
  const screenClipId    = `sc-${uid}`
  const glareClipId     = `gc-${uid}`
  const bodySheenId     = `bs-${uid}`
  const screenGlowId    = `sg-${uid}`
  const glareGradId     = `gg-${uid}`

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
        xmlnsXlink="http://www.w3.org/1999/xlink"
        role="img"
        aria-label={alt}
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          {/* ── Body sheen gradient (titanium look) ── */}
          <linearGradient id={bodySheenId} x1="0" y1="0" x2={W} y2={H} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#3A3A3C" />
            <stop offset="18%"  stopColor="#2C2C2E" />
            <stop offset="45%"  stopColor="#1C1C1E" />
            <stop offset="72%"  stopColor="#2C2C2E" />
            <stop offset="100%" stopColor="#3A3A3C" />
          </linearGradient>

          {/* ── Screen glow gradient ── */}
          <radialGradient id={screenGlowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={accentColor} stopOpacity="0.18" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>

          {/* ── Glare sweep gradient ── */}
          <linearGradient id={glareGradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="40%"  stopColor="white" stopOpacity="0.18" />
            <stop offset="55%"  stopColor="white" stopOpacity="0.07" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* ── Screen clip ── */}
          <clipPath id={screenClipId}>
            <rect x={sx} y={sy} width={sw} height={sh} rx={sr} />
          </clipPath>

          {/* ── Glare clip (same as screen) ── */}
          <clipPath id={glareClipId}>
            <rect x={sx} y={sy} width={sw} height={sh} rx={sr} />
          </clipPath>
        </defs>

        {/* ── Drop shadow behind device ── */}
        <rect
          x={4} y={8}
          width={W - 8} height={H - 12}
          rx={R}
          fill="rgba(0,0,0,0.55)"
          style={{ filter: "blur(18px)" }}
        />

        {/* ── Phone body ── */}
        <rect x={0} y={0} width={W} height={H} rx={R} fill={`url(#${bodySheenId})`} />

        {/* ── Outer titanium edge ring ── */}
        <rect
          x={1} y={1} width={W - 2} height={H - 2} rx={R - 1}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1.5"
        />
        <rect
          x={0.5} y={0.5} width={W - 1} height={H - 1} rx={R}
          fill="none"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="1"
        />

        {/* ── Screen glow halo ── */}
        <rect
          x={sx - 4} y={sy - 4}
          width={sw + 8} height={sh + 8}
          rx={sr + 4}
          fill={`url(#${screenGlowId})`}
        />

        {/* ── Screen bezel (black backing) ── */}
        <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#080808" />

        {/* ── App screenshot clipped to screen ── */}
        <image
          href={src}
          x={sx} y={sy}
          width={sw} height={sh}
          preserveAspectRatio="xMidYMin slice"
          clipPath={`url(#${screenClipId})`}
          style={{ imageRendering: "auto" }}
        />

        {/* ── Screen glare sweep (animated) ── */}
        <rect
          x={sx} y={sy} width={sw} height={sh}
          rx={sr}
          fill={`url(#${glareGradId})`}
          clipPath={`url(#${glareClipId})`}
          opacity="1"
        >
          {animate && (
            <animateTransform
              attributeName="transform"
              type="translate"
              from={`${-sw * 1.5} 0`}
              to={`${sw * 1.5} 0`}
              dur="3.5s"
              repeatCount="indefinite"
              begin="0.8s"
            />
          )}
        </rect>

        {/* ── Accent glow ring around screen ── */}
        <rect
          x={sx - 1} y={sy - 1}
          width={sw + 2} height={sh + 2}
          rx={sr + 1}
          fill="none"
          stroke={accentColor}
          strokeWidth="1.2"
          opacity="0.3"
        />

        {/* ── Dynamic Island ── */}
        <rect
          x={diX} y={diY}
          width={diW} height={diH}
          rx={diH / 2}
          fill="#000"
        />
        {/* Camera dot inside island */}
        <circle
          cx={diX + diW - diH * 0.7}
          cy={diY + diH / 2}
          r={diH * 0.22}
          fill="#1a1a1a"
        />
        {/* Ambient light sensor dot */}
        <circle
          cx={diX + diH * 0.7}
          cy={diY + diH / 2}
          r={diH * 0.16}
          fill="#111"
        />

        {/* ── Status bar time (cosmetic) ── */}
        <text
          x={sx + 14}
          y={sy + Math.round(H * 0.058)}
          fontSize={Math.round(W * 0.046)}
          fontWeight="600"
          fill="white"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          9:41
        </text>

        {/* ── Status bar icons (battery + signal) ── */}
        {/* Signal bars */}
        {[0, 1, 2, 3].map((b) => (
          <rect
            key={b}
            x={sx + sw - 44 + b * 6}
            y={sy + Math.round(H * 0.045) - (b + 1) * 3}
            width={4}
            height={(b + 1) * 3}
            rx={1}
            fill={b < 3 ? "white" : "rgba(255,255,255,0.3)"}
          />
        ))}
        {/* WiFi arc (simplified) */}
        <path
          d={`M ${sx + sw - 22} ${sy + Math.round(H * 0.04)} q 4 -4 8 0`}
          stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"
        />
        <path
          d={`M ${sx + sw - 19} ${sy + Math.round(H * 0.044)} q 2.5 -2.5 5 0`}
          stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"
        />
        {/* Battery */}
        <rect
          x={sx + sw - 10} y={sy + Math.round(H * 0.038)}
          width={9} height={6}
          rx={1.5}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.8"
        />
        <rect
          x={sx + sw - 10 + 0.8} y={sy + Math.round(H * 0.038) + 0.8}
          width={5} height={4.4}
          rx={0.8}
          fill="white"
        />
        <rect
          x={sx + sw - 1.2} y={sy + Math.round(H * 0.041)}
          width={1.2} height={2.5}
          rx={0.6}
          fill="rgba(255,255,255,0.5)"
        />

        {/* ── Side buttons ── */}
        {/* Volume up */}
        <rect
          x={-3} y={H * 0.195}
          width={4} height={H * 0.065}
          rx={2}
          fill="#3A3A3C"
        />
        {/* Volume down */}
        <rect
          x={-3} y={H * 0.28}
          width={4} height={H * 0.065}
          rx={2}
          fill="#3A3A3C"
        />
        {/* Silent toggle */}
        <rect
          x={-3} y={H * 0.145}
          width={4} height={H * 0.038}
          rx={2}
          fill="#3A3A3C"
        />
        {/* Power / sleep */}
        <rect
          x={W - 1} y={H * 0.27}
          width={4} height={H * 0.1}
          rx={2}
          fill="#3A3A3C"
        />

        {/* ── Rear camera cluster (top-left, decorative) ── */}
        <rect
          x={W * 0.06} y={H * 0.012}
          width={W * 0.36} height={H * 0.055}
          rx={W * 0.04}
          fill="#151515"
          opacity="0.9"
        />
        <circle cx={W * 0.15} cy={H * 0.039} r={W * 0.036} fill="#0a0a0a" />
        <circle cx={W * 0.15} cy={H * 0.039} r={W * 0.024} fill="#111" />
        <circle cx={W * 0.15} cy={H * 0.039} r={W * 0.013} fill="#1a1a1a" />
        <circle cx={W * 0.26} cy={H * 0.039} r={W * 0.036} fill="#0a0a0a" />
        <circle cx={W * 0.26} cy={H * 0.039} r={W * 0.024} fill="#111" />
        <circle cx={W * 0.26} cy={H * 0.039} r={W * 0.013} fill="#1a1a1a" />
        {/* Flash */}
        <circle cx={W * 0.355} cy={H * 0.039} r={W * 0.018} fill="#2a2a2a" />

        {/* ── Home indicator ── */}
        <rect
          x={W / 2 - W * 0.15}
          y={sy + sh - Math.round(H * 0.032)}
          width={W * 0.3}
          height={Math.round(H * 0.006)}
          rx={Math.round(H * 0.003)}
          fill="rgba(255,255,255,0.38)"
        />

        {/* ── Inner edge highlight (screen border) ── */}
        <rect
          x={sx + 0.5} y={sy + 0.5}
          width={sw - 1} height={sh - 1}
          rx={sr}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}
