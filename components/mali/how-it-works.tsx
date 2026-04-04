"use client"

import { useEffect, useRef } from "react"
import { Download, Store, TrendingUp } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Download,
    color: "#F5A623",
    title: "Download & Sign Up",
    desc: "Install Mali Up on Android or iOS. Create your tenant account in under 2 minutes — no paperwork, no delays.",
  },
  {
    number: "02",
    icon: Store,
    color: "#22C55E",
    title: "Set Up Your Business",
    desc: "Add your products, pricing, staff, and customers. Import existing data or start fresh — Mali Up adapts to you.",
  },
  {
    number: "03",
    icon: TrendingUp,
    color: "#3B82F6",
    title: "Grow with Data",
    desc: "Sell, invoice, and track in real time. Let the analytics surface insights that help you make smarter decisions every day.",
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)

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

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#0C1B2E" }}
      aria-labelledby="hiw-heading"
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#F5A623 1px, transparent 1px), linear-gradient(90deg, #F5A623 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 flex flex-col gap-4">
          <div className="reveal inline-flex justify-center">
            <span className="glass-amber text-[#F5A623] text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
              Simple Onboarding
            </span>
          </div>
          <h2
            id="hiw-heading"
            className="reveal font-heading font-bold text-white text-balance"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Up & Running in Minutes
          </h2>
          <p className="reveal text-white/50 max-w-lg mx-auto leading-relaxed">
            No IT team required. No steep learning curve. Just three steps from download to your first sale.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connecting line (desktop) */}
          <div
            className="absolute top-10 left-[16%] right-[16%] h-px hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, #F5A623 0%, #22C55E 50%, #3B82F6 100%)",
              opacity: 0.25,
            }}
            aria-hidden="true"
          />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="reveal relative flex flex-col items-center text-center gap-5"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {/* Number + icon */}
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                    style={{
                      backgroundColor: `${step.color}18`,
                      border: `1px solid ${step.color}30`,
                    }}
                  >
                    <Icon size={32} style={{ color: step.color }} />
                  </div>
                  {/* Step number badge */}
                  <span
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center font-heading font-bold text-xs text-[#0C1B2E]"
                    style={{ backgroundColor: step.color }}
                  >
                    {i + 1}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-white text-lg">{step.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm max-w-xs">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center reveal">
          <a
            href="#waitlist"
            className="shimmer-btn text-[#0C1B2E] font-bold px-8 py-4 rounded-2xl text-base shadow-2xl hover:scale-105 transition-transform duration-200 inline-flex items-center gap-2"
          >
            Start Your Free Account
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
