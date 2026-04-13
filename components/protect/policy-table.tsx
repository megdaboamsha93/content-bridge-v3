"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown, ChevronRight, Activity, Layout, ShieldAlert, Database, Network } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BotCategory {
  name: string
  allowed: string[]
  blocked: string[]
}

const botCategoriesData: BotCategory[] = [
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

interface PolicyTableProps {
  categories: BotCategory[]
  technicalRules?: { name: string; status: string }[]
  variant?: "global" | "zone"
}

export function PolicyTable({ categories, technicalRules, variant = "global" }: PolicyTableProps) {
  const [openCategories, setOpenCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleCategory = (name: string) => {
    setOpenCategories(prev => 
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    )
  }

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    return categories.map(cat => ({
      ...cat,
      allowed: cat.allowed.filter(b => b.toLowerCase().includes(searchQuery.toLowerCase())),
      blocked: cat.blocked.filter(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
    })).filter(cat => cat.allowed.length > 0 || cat.blocked.length > 0)
  }, [categories, searchQuery])

  return (
    <div className="space-y-4">
      {/* Search Header for Zone Variation */}
      {variant === "zone" && (
        <div className="relative max-w-xs ml-auto">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/30" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bots..." 
            className="h-8 text-[11px] pl-8 bg-muted/5 border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      )}

      {/* Category List */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden divide-y divide-border/50 shadow-sm shadow-black/5">
        <div className="bg-muted/10 grid grid-cols-4 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
          <div className="col-span-1">Category</div>
          <div className="col-span-1 text-center">Allowed</div>
          <div className="col-span-1 text-center">Blocked</div>
          <div className="col-span-1 text-right">Shield</div>
        </div>

        {filteredCategories.length > 0 ? filteredCategories.map((cat, idx) => (
          <Collapsible 
            key={cat.name} 
            open={openCategories.includes(cat.name)}
            onOpenChange={() => toggleCategory(cat.name)}
          >
            <CollapsibleTrigger className="w-full">
              <div className="grid grid-cols-4 px-6 py-4 text-xs items-center hover:bg-muted/5 transition-colors text-left font-medium">
                <div className="col-span-1 flex items-center gap-2">
                  <div className="w-4 flex items-center justify-center">
                    {openCategories.includes(cat.name) ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/60" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />}
                  </div>
                  <span className="text-muted-foreground/80 font-semibold">{cat.name}</span>
                </div>
                <div className="col-span-1 text-center text-blue-500 font-bold">{cat.allowed.length}</div>
                <div className="col-span-1 text-center text-muted-foreground/30 font-medium">{cat.blocked.length}</div>
                <div className="col-span-1 text-right text-[10px] text-muted-foreground/40 font-mono italic">
                  {variant === "global" && idx === 0 ? "IP Validated" : "-"}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-muted/5 border-t border-border/20">
              <div className="p-6 grid grid-cols-2 gap-12">
                 <div className="space-y-3">
                    <p className="text-[9px] font-bold text-blue-500/50 uppercase tracking-widest border-b border-blue-500/10 pb-1">Permitted</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.allowed.length > 0 ? cat.allowed.map(bot => (
                        <span key={bot} className="text-[10px] bg-background border border-border/50 px-2 py-0.5 rounded text-muted-foreground shadow-sm">
                          {bot}
                        </span>
                      )) : <span className="text-[10px] text-muted-foreground/30 italic">No exceptions</span>}
                    </div>
                 </div>
                 <div className="space-y-3">
                    <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest border-b border-border/10 pb-1">Restricted</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.blocked.length > 0 ? cat.blocked.map(bot => (
                        <span key={bot} className="text-[10px] bg-background border border-border/50 px-2 py-0.5 rounded text-muted-foreground/40 font-light">
                          {bot}
                        </span>
                      )) : <span className="text-[10px] text-muted-foreground/30 italic">All granted</span>}
                    </div>
                 </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )) : (
          <div className="p-8 text-center text-[10px] text-muted-foreground/40 uppercase tracking-widest">No results matching filter</div>
        )}
      </div>

      {/* Technical Summary Inline */}
      {technicalRules && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {technicalRules.map(rule => (
            <Card key={rule.name} className="p-4 border-border/50 bg-muted/5 shadow-none group">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-background border border-border/50 flex items-center justify-center text-muted-foreground/40 group-hover:text-blue-500 transition-colors">
                     {rule.name.includes("Spoofed") ? <ShieldAlert className="w-4 h-4" /> : 
                      rule.name.includes("Data") ? <Database className="w-4 h-4" /> : 
                      <Network className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-muted-foreground/20 uppercase tracking-widest">{rule.name}</p>
                    <p className="text-[11px] font-semibold text-muted-foreground/70">{rule.status}</p>
                  </div>
               </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
