"use client"

import { useEffect, useRef } from "react"
import {
  ShoppingCart,
  FileText,
  Package,
  TrendingUp,
  Users,
  BarChart3,
  Building2,
  Zap,
} from "lucide-react"

const modules = [
  {
    icon: ShoppingCart,
    color: "#F5A623",
    title: "Sales & POS",
    desc: "Process sales instantly, manage products, apply discounts, and generate receipts in seconds — even offline.",
  },
  {
    icon: FileText,
    color: "#22C55E",
    title: "Smart Invoicing",
    desc: "Create professional invoices, track payment status, and send reminders automatically to your clients.",
  },
  {
    icon: Package,
    color: "#3B82F6",
    title: "Inventory Control",
    desc: "Real-time stock levels, low-stock alerts, multi-location support, and automated reorder triggers.",
  },
  {
    icon: TrendingUp,
    color: "#F5A623",
    title: "Finance & Accounting",
    desc: "Track income, expenses, cash flow, and profit margins with visual charts tailored for SMBs.",
  },
  {
    icon: Users,
    color: "#22C55E",
    title: "Customer CRM",
    desc: "Build customer profiles, track purchase history, and maintain lasting relationships across every touchpoint.",
  },
  {
    icon: BarChart3,
    color: "#3B82F6",
    title: "Business Analytics",
    desc: "Data-driven dashboards that surface actionable insights on sales, revenue, inventory, and growth trends.",
  },
  {
    icon: Building2,
    color: "#F5A623",
    title: "Multi-Tenant",
    desc: "One platform for multiple businesses. Each tenant gets isolated data, custom branding, and dedicated access.",
  },
  {
    icon: Zap,
    color: "#22C55E",
    title: "Works on 3G",
    desc: "Engineered for African connectivity — lightweight, fast-loading, and fully functional on mid-range devices.",
  },
]

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.12 }
    )
    const targets = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right")
    targets?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#0F1F35" }}
      aria-labelledby="features-heading"
    >
      {/* Subtle top border glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #F5A623, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 flex flex-col gap-4">
          <div className="reveal inline-flex justify-center">
            <span className="glass-amber text-[#F5A623] text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
              Everything You Need
            </span>
          </div>
          <h2
            id="features-heading"
            className="reveal font-heading font-bold text-white text-balance"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            One App. Eight Powerful Modules.
          </h2>
          <p className="reveal text-white/50 max-w-xl mx-auto leading-relaxed">
            From the market stall to the growing enterprise — Mali Up scales with your business,
            keeping every operation connected in one place.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod, i) => {
            const Icon = mod.icon
            const delay = (i % 4) * 0.1
            return (
              <div
                key={mod.title}
                className="reveal group glass rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{
                  transitionDelay: `${delay}s`,
                  transitionProperty: "opacity, transform",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${mod.color}15` }}
                >
                  <Icon size={20} style={{ color: mod.color }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading font-bold text-white text-base">{mod.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{mod.desc}</p>
                </div>
                {/* Hover accent line */}
                <div
                  className="w-0 group-hover:w-full h-0.5 rounded-full transition-all duration-500 mt-auto"
                  style={{ backgroundColor: mod.color }}
                  aria-hidden="true"
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
