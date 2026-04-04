"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    img: "/maliup-dashboard.jpg",
    color: "#F5A623",
    headline: "Command your business at a glance",
    desc: "The home screen surfaces revenue trends, top-selling products, pending invoices, and inventory alerts — all in one clean view, optimised for small screens.",
    metrics: [
      { label: "Revenue Today", value: "GHS 4,820" },
      { label: "Sales", value: "64" },
      { label: "Stock Items", value: "318" },
    ],
  },
  {
    id: "invoicing",
    label: "Invoicing",
    img: "/maliup-invoice.jpg",
    color: "#22C55E",
    headline: "Professional invoices in seconds",
    desc: "Generate branded invoices, track payment status, send automated reminders, and record partial payments — no accounting degree required.",
    metrics: [
      { label: "Paid", value: "89%" },
      { label: "Outstanding", value: "GHS 1.2K" },
      { label: "Sent Today", value: "12" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    img: "/maliup-analytics.jpg",
    color: "#3B82F6",
    headline: "Data that drives real decisions",
    desc: "Visual charts, period comparisons, and product performance heat-maps help you understand your business and spot opportunities faster.",
    metrics: [
      { label: "Growth", value: "+34%" },
      { label: "Top Product", value: "Fabric A" },
      { label: "Forecasted", value: "GHS 28K" },
    ],
  },
]

export function PhoneShowcase() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const current = tabs[active]

  return (
    <section
      id="modules"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#0F1F35" }}
      aria-labelledby="showcase-heading"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #22C55E, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 flex flex-col gap-4">
          <div className="reveal inline-flex justify-center">
            <span className="glass-amber text-[#F5A623] text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
              App Screenshots
            </span>
          </div>
          <h2
            id="showcase-heading"
            className="reveal font-heading font-bold text-white text-balance"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Built for the Real World of African Business
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="reveal flex justify-center gap-3 mb-12 flex-wrap">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${
                active === i
                  ? "text-[#0C1B2E] scale-105"
                  : "glass text-white/60 hover:text-white border-white/10"
              }`}
              style={
                active === i
                  ? { backgroundColor: tab.color, borderColor: tab.color }
                  : {}
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Phone */}
          <div className="reveal-left flex justify-center">
            <div className="relative">
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-[40px] blur-2xl opacity-30 transition-all duration-500"
                style={{ backgroundColor: current.color }}
                aria-hidden="true"
              />
              <div
                className="relative w-[220px] md:w-[250px] rounded-[36px] overflow-hidden"
                style={{
                  border: `2px solid ${current.color}40`,
                  boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 40px ${current.color}25`,
                  transition: "box-shadow 0.5s ease, border-color 0.5s ease",
                }}
              >
                {/* Status bar */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ backgroundColor: "#0C1B2E" }}
                >
                  <span className="text-white text-[10px] font-semibold">9:41</span>
                  <div className="w-14 h-3.5 rounded-full" style={{ backgroundColor: "#1a2d44" }} />
                  <div className="w-5 h-2.5 rounded-sm border border-white/30" />
                </div>
                <Image
                  key={current.id}
                  src={current.img}
                  alt={`Mali Up ${current.label} screen`}
                  width={250}
                  height={460}
                  className="w-full object-cover"
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="reveal-right flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: current.color }}
              >
                {current.label} Module
              </span>
              <h3 className="font-heading font-bold text-white text-2xl md:text-3xl text-balance">
                {current.headline}
              </h3>
              <p className="text-white/55 leading-relaxed">{current.desc}</p>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-3 gap-3">
              {current.metrics.map((m) => (
                <div
                  key={m.label}
                  className="glass rounded-2xl p-4 flex flex-col gap-1"
                  style={{ borderColor: `${current.color}20` }}
                >
                  <span className="font-heading font-bold text-lg" style={{ color: current.color }}>
                    {m.value}
                  </span>
                  <span className="text-white/40 text-xs">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="flex gap-2" aria-label="Slide indicator">
              {tabs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to ${tabs[i].label}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? "28px" : "8px",
                    height: "8px",
                    backgroundColor: active === i ? current.color : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
