"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const perks = [
  "Early access before public launch",
  "Free onboarding & data import",
  "Priority support for 6 months",
  "Locked-in founder pricing forever",
]

export function Waitlist() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    )
    sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Simulate async submit
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <section
      id="waitlist"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#0F1F35" }}
      aria-labelledby="waitlist-heading"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,166,35,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div className="reveal inline-flex justify-center mb-6">
          <span className="glass-amber text-[#F5A623] text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
            Limited Spots Available
          </span>
        </div>

        {/* Logo mark */}
        <div className="reveal flex justify-center mb-4">
          <Image
            src="/maliup-logo.png"
            alt="Mali Up logo"
            width={64}
            height={64}
            className="rounded-2xl shadow-2xl"
            style={{ boxShadow: "0 0 40px rgba(245,166,35,0.3)" }}
          />
        </div>

        <h2
          id="waitlist-heading"
          className="reveal font-heading font-bold text-white mb-4 text-balance"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
        >
          Be First in Line When{" "}
          <span
            className="shimmer-btn bg-clip-text"
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Mali Up Launches.
          </span>
        </h2>
        <p className="reveal text-white/50 leading-relaxed mb-10 max-w-xl mx-auto">
          Join thousands of African entrepreneurs who are ready to take their
          business to the next level. Spots are limited — secure yours today.
        </p>

        {/* Perks */}
        <ul className="reveal flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle2 size={14} className="text-[#22C55E] shrink-0" />
              {perk}
            </li>
          ))}
        </ul>

        {/* Form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="reveal flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            aria-label="Waitlist signup form"
          >
            <label htmlFor="waitlist-email" className="sr-only">
              Your email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 glass rounded-2xl px-5 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-[#F5A623] transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            />
            <button
              type="submit"
              disabled={loading}
              className="shimmer-btn text-[#0C1B2E] font-bold px-7 py-3.5 rounded-2xl text-sm shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2 min-w-[160px] disabled:opacity-70"
            >
              {loading ? (
                <span className="w-5 h-5 rounded-full border-2 border-[#0C1B2E]/40 border-t-[#0C1B2E] animate-spin inline-block" />
              ) : (
                <>
                  Get Early Access
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        ) : (
          <div
            className="reveal-left inline-flex items-center gap-3 glass-amber rounded-2xl px-8 py-4 mx-auto"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 size={22} className="text-[#22C55E]" />
            <div className="text-left">
              <p className="text-white font-bold">You&apos;re on the list!</p>
              <p className="text-white/50 text-sm">We&apos;ll reach out as soon as Mali Up launches.</p>
            </div>
          </div>
        )}

        <p className="reveal text-white/25 text-xs mt-6">
          No spam, ever. Unsubscribe any time. Your data stays private.
        </p>
      </div>
    </section>
  )
}
