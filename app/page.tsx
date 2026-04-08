import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Header } from "@/components/dashboard/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { TrafficChart } from "@/components/dashboard/traffic-chart"
import { DonutChart } from "@/components/dashboard/donut-chart"
import { ManagementChart } from "@/components/dashboard/management-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { BotActivityChart } from "@/components/dashboard/bot-activity-chart"
import { CountryChart } from "@/components/dashboard/country-chart"
import { Activity, Bot, ShieldBan, TrendingUp } from "lucide-react"

const trafficSplitData = [
  { name: "Human Requests", value: 734, color: "#3b82f6" },
  { name: "Bot Requests", value: 220, color: "#f97316" },
]

const managementData = [
  { name: "Allowed", value: 913, color: "#10b981" },
  { name: "Blocked", value: 41, color: "#ef4444" },
]

const categoryData = [
  { name: "Developer Tools", value: 53, color: "#8b5cf6" },
  { name: "Search Engines", value: 42, color: "#3b82f6" },
  { name: "AI Assistants", value: 63, color: "#f97316" },
  { name: "Other", value: 62, color: "#6b7280" },
]

const botNamesData = [
  { name: "wordpress", value: 42, color: "#3b82f6" },
  { name: "googlebot", value: 35, color: "#f97316" },
  { name: "petalbot", value: 39, color: "#8b5cf6" },
  { name: "Other", value: 100, color: "#6b7280" },
]

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Requests"
                value="954"
                subtitle="Last 24 hours"
                icon={<Activity className="w-4 h-4" />}
                trend={{ value: 12, label: "vs last period" }}
              />
              <StatsCard
                title="Top Requesting Bot"
                value="wordpress"
                subtitle="42 requests (21%)"
                icon={<Bot className="w-4 h-4" />}
              />
              <StatsCard
                title="Bot Management"
                value="41 blocked"
                subtitle="4.3% of total traffic"
                icon={<ShieldBan className="w-4 h-4" />}
              />
              <StatsCard
                title="Bot Percentage"
                value="38.1%"
                subtitle="286 total bot requests"
                icon={<TrendingUp className="w-4 h-4" />}
              />
            </div>

            {/* Traffic Sections Grouped */}
            <div className="space-y-6">
              {/* Traffic Split Section */}
              <div className="flex flex-col lg:flex-row gap-6 bg-card border border-border/50 rounded-xl overflow-hidden p-6 shadow-sm shadow-black/5 items-stretch">
                <div className="flex-[2] min-w-0">
                  <TrafficChart 
                    title="Traffic Split Timeline"
                    description="Human vs bot requests over time"
                  />
                </div>
                <div className="w-px bg-border/50 hidden lg:block" />
                <div className="flex-1 min-w-0">
                  <DonutChart 
                    title="Traffic Split Percentage" 
                    data={trafficSplitData} 
                  />
                </div>
              </div>

              {/* Traffic Management Section */}
              <div className="flex flex-col lg:flex-row gap-6 bg-card border border-border/50 rounded-xl overflow-hidden p-6 shadow-sm shadow-black/5 items-stretch">
                <div className="flex-[2] min-w-0">
                  <ManagementChart />
                </div>
                <div className="w-px bg-border/50 hidden lg:block" />
                <div className="flex-1 min-w-0">
                  <DonutChart 
                    title="Traffic Management" 
                    data={managementData} 
                  />
                </div>
              </div>

              {/* Bot Category Section */}
              <div className="flex flex-col lg:flex-row gap-6 bg-card border border-border/50 rounded-xl overflow-hidden p-6 shadow-sm shadow-black/5 items-stretch">
                <div className="flex-[2] min-w-0">
                  <CategoryChart />
                </div>
                <div className="w-px bg-border/50 hidden lg:block" />
                <div className="flex-1 min-w-0">
                  <DonutChart 
                    title="Bot Category Distribution" 
                    data={categoryData} 
                  />
                </div>
              </div>

              {/* Bot Activity Section */}
              <div className="flex flex-col lg:flex-row gap-6 bg-card border border-border/50 rounded-xl overflow-hidden p-6 shadow-sm shadow-black/5 items-stretch">
                <div className="flex-[2] min-w-0">
                  <BotActivityChart />
                </div>
                <div className="w-px bg-border/50 hidden lg:block" />
                <div className="flex-1 min-w-0">
                  <DonutChart 
                    title="Bot Names Distribution" 
                    data={botNamesData} 
                  />
                </div>
              </div>
            </div>

            {/* Country Breakdown */}
            <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm shadow-black/5">
              <CountryChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
