import Hero from '@/components/Hero'
import CompanyOverview from '@/components/CompanyOverview'
import CoreProducts from '@/components/CoreProducts'
import MarketPosition from '@/components/MarketPosition'
import FutureOutlook from '@/components/FutureOutlook'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero />
      <CompanyOverview />
      <CoreProducts />
      <MarketPosition />
      <FutureOutlook />
      <Footer />
    </main>
  )
}
