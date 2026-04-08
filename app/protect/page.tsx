import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Header } from "@/components/dashboard/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { DomainPolicy } from "@/components/protect/domain-policy"
import { CategoryRules } from "@/components/protect/category-rules"
import { BotSearch } from "@/components/protect/bot-search"
import { ContentZones } from "@/components/protect/content-zones"
import { Button } from "@/components/ui/button"
import { ShieldCheck, ShieldX, Layers, Bot } from "lucide-react"

export default function ProtectPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Protect" minimalMode />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Allowed"
                value="688"
                icon={<ShieldCheck className="w-4 h-4" />}
                className="[&_[data-value]]:text-emerald-500"
                valueClassName="text-emerald-500"
              />
              <StatsCard
                title="Blocked"
                value="9"
                icon={<ShieldX className="w-4 h-4" />}
                valueClassName="text-red-500"
              />
              <StatsCard
                title="Categories"
                value="14"
                icon={<Layers className="w-4 h-4" />}
              />
              <StatsCard
                title="Total bots"
                value="697"
                icon={<Bot className="w-4 h-4" />}
              />
            </div>

            {/* Policy Sections */}
            <DomainPolicy />
            <CategoryRules />
            <BotSearch />
            <ContentZones />

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
              <Button variant="outline">
                Discard
              </Button>
              <Button>
                Save changes
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
