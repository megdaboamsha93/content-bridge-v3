"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Header } from "@/components/dashboard/header"
import { PolicyTable } from "@/components/protect/policy-table"
import { Search } from "lucide-react"

const botCategories = [
  { 
    name: "Search Engines", 
    allowed: ["Googlebot", "Bingbot", "DuckDuckGo", "Baiduspider", "YandexBot"],
    blocked: ["Sogou Spider"]
  },
  { 
    name: "AI Crawlers", 
    allowed: ["ChatGPT-User"],
    blocked: ["GPTBot", "CCBot", "ClaudeBot", "PerplexityBot"]
  },
  { 
    name: "Social Media", 
    allowed: ["Twitterbot", "facebookexternalhit", "LinkedInBot", "Pinterestbot"],
    blocked: []
  },
  { 
    name: "Commercial Scrapers", 
    allowed: [],
    blocked: ["SemrushBot", "AhrefsBot", "DotBot", "MJ12bot", "PetalBot"]
  }
]

const technicalRules = [
  { name: "Spoofed IPs", status: "Validation Active" },
  { name: "Data Centers", status: "Access Restricted" },
  { name: "Proxy Networks", status: "Heuristic Block" }
]

export default function ProtectPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Protect" minimalMode />
        <main className="flex-1 overflow-y-auto p-12 lg:p-16 pt-8">
          <div className="max-w-6xl mx-auto space-y-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Main Domain Policy */}
            <section className="space-y-12">
                <h2 className="text-[14px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40 text-left">Main Domain Policy</h2>
                <PolicyTable 
                  categories={botCategories} 
                  technicalRules={technicalRules}
                  variant="global"
                />
            </section>

            {/* Content Zones Section */}
            <section className="space-y-20">
              <div className="flex items-center justify-end">
                <h2 className="text-[14px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40 text-right">Content Zones</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-32">
                {/* Zone A */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-border/20 pb-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-bold tracking-tight">External Content Proxy</h3>
                      <p className="text-[11px] text-muted-foreground/30 font-mono uppercase tracking-widest font-semibold">22 paths configured</p>
                    </div>
                    <div className="text-[10px] font-bold text-blue-500/50 uppercase tracking-[0.2em] bg-blue-500/5 px-2 py-1 rounded">Compliant</div>
                  </div>
                  <PolicyTable 
                    variant="zone"
                    categories={botCategories.map(c => ({...c, allowed: c.allowed.slice(0, 2), blocked: c.blocked.slice(0, 1)}))}
                  />
                </div>

                {/* Zone B */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-border/20 pb-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-bold tracking-tight">Insurance Content</h3>
                      <p className="text-[11px] text-muted-foreground/30 font-mono uppercase tracking-widest font-semibold">1 path configured</p>
                    </div>
                    <div className="text-[10px] font-bold text-amber-500/50 uppercase tracking-[0.2em] bg-amber-500/5 px-2 py-1 rounded">Mismatch detected</div>
                  </div>
                  <PolicyTable 
                    variant="zone"
                    categories={botCategories.map(c => ({...c, allowed: [], blocked: [...c.allowed, ...c.blocked]}))}
                  />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
