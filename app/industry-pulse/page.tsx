import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Header } from "@/components/dashboard/header"
import { BlockingIndex } from "@/components/industry/blocking-index"
import { AdoptionCurve } from "@/components/industry/adoption-curve"
import { IABCategoryChart } from "@/components/industry/iab-category-chart"

export default function IndustryPulsePage() {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Industry Pulse" minimalMode />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BlockingIndex />
              <AdoptionCurve />
            </div>

            <IABCategoryChart variant="full" />
            
            <IABCategoryChart variant="small" />
          </div>
        </main>
      </div>
    </div>
  )
}
