import { Twitter, Linkedin, Instagram, Globe } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const links = {
    Product: ["Features", "How It Works", "Pricing", "Roadmap"],
    Company: ["About Neuraltale", "Blog", "Careers", "Press"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  }
  const socials = [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Globe, label: "Website", href: "#" },
  ]

  return (
    <footer
      className="relative overflow-hidden pt-16 pb-8"
      style={{ backgroundColor: "#0C1B2E", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <Image
                src="/maliup-logo.png"
                alt="Mali Up logo"
                width={40}
                height={40}
                className="rounded-xl shadow-lg"
              />
              <span className="font-heading font-bold text-white text-lg tracking-tight">
                Mali<span className="text-[#F5A623]">Up</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              The pocket ERP for African SMBs. Built by{" "}
              <span className="text-[#F5A623]/70">Neuraltale Technology</span> — engineered for the continent, designed for growth.
            </p>
            {/* Social links */}
            <div className="flex gap-3" aria-label="Social media links">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/40 hover:text-[#F5A623] hover:border-[#F5A623]/30 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="flex flex-col gap-4">
              <h3 className="text-white font-bold text-sm tracking-wide">{section}</h3>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/40 text-sm hover:text-white/80 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/25 text-xs">
            &copy; {new Date().getFullYear()} Neuraltale Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" aria-hidden="true" />
            <span className="text-white/25 text-xs">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
