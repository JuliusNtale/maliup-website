"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Modules", href: "#modules" },
    { label: "Stats", href: "#stats" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 glass border-b border-white/10" : "py-5 bg-transparent"
      }`}
      style={{ backgroundColor: scrolled ? "rgba(12,27,46,0.85)" : "transparent" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shimmer-btn shadow-lg">
            <span className="font-heading font-bold text-[#0C1B2E] text-sm tracking-tight">M↑</span>
          </div>
          <span className="font-heading font-bold text-white text-lg tracking-tight">
            Mali<span className="text-[#F5A623]">Up</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-[#F5A623] text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#waitlist"
            className="shimmer-btn text-[#0C1B2E] font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden mt-2 mx-4 rounded-2xl glass border border-white/10 p-5 flex flex-col gap-4"
          style={{ backgroundColor: "rgba(12,27,46,0.95)" }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-[#F5A623] font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setMenuOpen(false)}
            className="shimmer-btn text-center text-[#0C1B2E] font-bold text-sm px-5 py-2.5 rounded-xl"
          >
            Join Waitlist
          </a>
        </div>
      )}
    </header>
  )
}
