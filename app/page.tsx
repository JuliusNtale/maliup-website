import { Nav } from "@/components/mali/nav"
import { Hero } from "@/components/mali/hero"
import { Features } from "@/components/mali/features"
import { HowItWorks } from "@/components/mali/how-it-works"
import { PhoneShowcase } from "@/components/mali/phone-showcase"
import { Stats } from "@/components/mali/stats"
import { Waitlist } from "@/components/mali/waitlist"
import { Footer } from "@/components/mali/footer"

export default function MaliUpPage() {
  return (
    <main style={{ backgroundColor: "#0C1B2E" }}>
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <PhoneShowcase />
      <Stats />
      <Waitlist />
      <Footer />
    </main>
  )
}
