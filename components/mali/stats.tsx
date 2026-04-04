"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 2400, suffix: "+", label: "Businesses on Waitlist", color: "#F5A623" },
  { value: 8, suffix: "", label: "Core Business Modules", color: "#22C55E" },
  { value: 3, suffix: "G", label: "Works on 3G Networks", color: "#3B82F6" },
  { value: 99, suffix: "%", label: "Uptime Guaranteed", color: "#F5A623" },
]

function useCountUp(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, started])
  return count
}

function StatCard({
  stat,
  started,
}: {
  stat: (typeof stats)[0]
  started: boolean
}) {
  const count = useCountUp(stat.value, 1600, started)
  return (
    <div className="reveal flex flex-col items-center text-center gap-2">
      <div
        className="text-5xl md:text-6xl font-heading font-bold tabular-nums"
        style={{ color: stat.color }}
      >
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <p className="text-white/50 text-sm font-medium">{stat.label}</p>
      <div
        className="w-8 h-0.5 rounded-full mt-1"
        style={{ backgroundColor: stat.color }}
        aria-hidden="true"
      />
    </div>
  )
}

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible")
            setStarted(true)
          }
        })
      },
      { threshold: 0.3 }
    )
    const targets = sectionRef.current?.querySelectorAll(".reveal")
    targets?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#0C1B2E" }}
      aria-labelledby="stats-heading"
    >
      {/* Amber line top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, #F5A623 30%, #22C55E 70%, transparent 100%)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 flex flex-col gap-4">
          <h2
            id="stats-heading"
            className="reveal font-heading font-bold text-white text-balance"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Growing Fast Across Africa
          </h2>
          <p className="reveal text-white/50 max-w-md mx-auto leading-relaxed">
            From Ghana to Nigeria, Kenya to Senegal — African businesses are choosing Mali Up to modernise their operations.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  )
}
