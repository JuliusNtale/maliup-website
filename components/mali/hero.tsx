"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Staggered hero entrance animation via class toggle
    const els = heroRef.current?.querySelectorAll<HTMLElement>("[data-hero-item]")
    els?.forEach((el, i) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(32px)"
      el.style.transition = `opacity 0.7s ease ${i * 0.13}s, transform 0.7s ease ${i * 0.13}s`
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        })
      })
    })
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "#0C1B2E" }}
      aria-labelledby="hero-heading"
    >
      {/* Background pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url('/africa-pattern.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      {/* Decorative glow orbs */}
      <div
        className="absolute top-1/4 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -left-32 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #22C55E 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Spinning decorative ring (desktop) */}
      <div
        className="absolute right-8 top-20 w-64 h-64 rounded-full border border-dashed border-white/10 animate-spin-slow hidden lg:block"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 w-full" ref={heroRef}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div data-hero-item className="inline-flex items-center gap-2 self-start">
              <span
                className="glass-amber text-[#F5A623] text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase"
              >
                Launching Soon · Africa-First ERP
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              data-hero-item
              className="font-heading font-bold text-white leading-[1.1] text-balance"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
            >
              Your Entire Business{" "}
              <span
                className="shimmer-btn bg-clip-text"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                In One App.
              </span>
            </h1>

            {/* Sub */}
            <p
              data-hero-item
              className="text-white/60 leading-relaxed text-lg max-w-md"
            >
              Mali Up is the pocket ERP built for African SMBs — manage sales,
              invoices, inventory, finance, customers, and analytics from your
              phone. Fast on 3G. Ready for tomorrow.
            </p>

            {/* Built by badge */}
            <p data-hero-item className="text-white/30 text-xs tracking-widest uppercase">
              Built by{" "}
              <span className="text-[#F5A623]/70 font-semibold">Neuraltale Technology</span>
            </p>

            {/* CTAs */}
            <div data-hero-item className="flex flex-wrap gap-4 items-center">
              <a
                href="#waitlist"
                className="shimmer-btn text-[#0C1B2E] font-bold px-7 py-3.5 rounded-2xl text-base shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center gap-2"
              >
                Get Early Access
                <ArrowRight size={18} />
              </a>
              <a
                href="#how-it-works"
                className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors font-medium text-sm group"
              >
                <span
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#F5A623] transition-colors"
                >
                  <Play size={14} className="ml-0.5 text-[#F5A623]" />
                </span>
                See how it works
              </a>
            </div>

            {/* Social proof strip */}
            <div data-hero-item className="flex items-center gap-5 pt-2">
              <div className="flex -space-x-2.5">
                {["#F5A623", "#22C55E", "#3B82F6", "#EF4444"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0C1B2E]"
                    style={{ background: c, opacity: 0.85 }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-white/50 text-sm">
                <span className="text-white font-semibold">2,400+</span> businesses on the waitlist
              </p>
            </div>
          </div>

          {/* Right — floating phone */}
          <div className="relative flex justify-center items-center" aria-hidden="true">
            {/* Glow behind phone */}
            <div
              className="absolute w-64 h-64 rounded-full animate-pulse-ring"
              style={{ background: "radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 70%)" }}
            />

            {/* Phone shell */}
            <div className="relative animate-float-phone z-10">
              <div
                className="w-[220px] md:w-[260px] rounded-[36px] overflow-hidden shadow-2xl"
                style={{
                  border: "2px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(245,166,35,0.15)",
                }}
              >
                {/* Phone status bar */}
                <div
                  className="flex items-center justify-between px-5 py-2.5"
                  style={{ backgroundColor: "#0C1B2E" }}
                >
                  <span className="text-white text-[10px] font-semibold">9:41</span>
                  <div className="w-16 h-4 rounded-full" style={{ backgroundColor: "#1a2d44" }} />
                  <div className="flex gap-1">
                    {[1, 2, 3].map((b) => (
                      <div key={b} className="w-1 rounded-sm" style={{ height: `${b * 4}px`, backgroundColor: "#F5A623", alignSelf: "flex-end" }} />
                    ))}
                    <div className="w-4 h-2.5 rounded-sm border border-white/40 ml-1 self-center" />
                  </div>
                </div>
                {/* App screen */}
                <Image
                  src="/maliup-dashboard.jpg"
                  alt="Mali Up dashboard showing sales, revenue charts and business analytics"
                  width={260}
                  height={480}
                  className="w-full object-cover"
                  priority
                />
              </div>

              {/* Floating mini-cards */}
              <div
                className="absolute -left-14 top-10 glass rounded-2xl px-3 py-2.5 flex items-center gap-2.5 shadow-xl"
                style={{ border: "1px solid rgba(245,166,35,0.2)" }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#22C55E20" }}>
                  <span className="text-[#22C55E] text-sm font-bold">↑</span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">+34%</p>
                  <p className="text-white/40 text-[10px]">Revenue</p>
                </div>
              </div>

              <div
                className="absolute -right-12 bottom-16 glass rounded-2xl px-3 py-2.5 flex items-center gap-2.5 shadow-xl"
                style={{ border: "1px solid rgba(34,197,94,0.2)" }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F5A62320" }}>
                  <span className="text-[#F5A623] text-sm">⚡</span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">247 Sales</p>
                  <p className="text-white/40 text-[10px]">This week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker bar */}
      <div
        className="relative w-full overflow-hidden border-t border-b border-white/5 py-3.5"
        style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
        aria-hidden="true"
      >
        <div className="animate-ticker flex gap-0 whitespace-nowrap select-none">
          {[
            "Sales Management",
            "Smart Invoicing",
            "Inventory Control",
            "Multi-Tenant",
            "Business Analytics",
            "Customer CRM",
            "Finance Tracking",
            "Africa-First",
            "Works on 3G",
            "Flutter Powered",
          ]
            .concat([
              "Sales Management",
              "Smart Invoicing",
              "Inventory Control",
              "Multi-Tenant",
              "Business Analytics",
              "Customer CRM",
              "Finance Tracking",
              "Africa-First",
              "Works on 3G",
              "Flutter Powered",
            ])
            .map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-6 text-xs text-white/40 uppercase tracking-widest font-semibold">
                <span className="w-1 h-1 rounded-full bg-[#F5A623] inline-block" />
                {item}
              </span>
            ))}
        </div>
      </div>
    </section>
  )
}
