"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Header } from "@/components/dashboard/header"
import { PolicyTable } from "@/components/protect/policy-table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

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
  { name: "Spoofed IP Detection", status: "Active: RDNS Validation" },
  { name: "Data Center Traffic", status: "Asset Protection: Restricted" },
  { name: "Proxy Exit Nodes", status: "Heuristic: Explicitly Blocked" }
]

export default function ProtectPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Protect" minimalMode />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 pt-2">
          <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
            
            {/* Main Domain Policy */}
            <section className="space-y-4">
                <div className="border-b border-border/10 pb-2">
                    <h2 className="text-sm font-semibold tracking-tight text-foreground/70">Main Domain Perimeter</h2>
                </div>
                
                <PolicyTable 
                  categories={botCategories} 
                  technicalRules={technicalRules}
                  variant="global"
                />
            </section>

            {/* Content Zones Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/10 pb-2">
                <h2 className="text-sm font-semibold tracking-tight text-foreground/70">Segmented Content Zones</h2>
                <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 hover:text-blue-500 transition-colors">Manage +</button>
              </div>
              
              <div className="space-y-3">
                {/* Zone A - Collapsible */}
                <Collapsible className="group border border-border/40 rounded-xl overflow-hidden shadow-sm shadow-black/5">
                  <CollapsibleTrigger className="w-full text-left bg-card hover:bg-muted/10 transition-colors p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-data-[state=open]:rotate-90 transition-transform" />
                        <h3 className="text-sm font-semibold tracking-tight text-foreground/80">External Content Proxy</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-muted-foreground/30">/api/v2/external/*</span>
                        <div className="bg-emerald-500/10 text-emerald-500 text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase">Compliant</div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-background animate-in slide-in-from-top-2 duration-300">
                    <div className="p-4 border-t border-border/10">
                      <PolicyTable 
                        variant="zone"
                        categories={botCategories.map(c => ({...c, allowed: c.allowed.slice(0, 2), blocked: c.blocked.slice(0, 1)}))}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Zone B - Collapsible */}
                <Collapsible className="group border border-border/40 rounded-xl overflow-hidden shadow-sm shadow-black/5">
                  <CollapsibleTrigger className="w-full text-left bg-card hover:bg-muted/10 transition-colors p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-data-[state=open]:rotate-90 transition-transform" />
                        <h3 className="text-sm font-semibold tracking-tight text-foreground/80">Insurance Knowledge Base</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-muted-foreground/30">/kb/insurance/*</span>
                        <div className="bg-orange-500/10 text-orange-500 text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase">Policy Mismatch</div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-background animate-in slide-in-from-top-2 duration-300">
                    <div className="p-4 border-t border-border/10">
                      <PolicyTable 
                        variant="zone"
                        categories={botCategories.map(c => ({...c, allowed: [], blocked: [...c.allowed, ...c.blocked]}))}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
