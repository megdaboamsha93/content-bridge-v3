"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown, ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BotCategory {
  name: string
  allowed: string[]
  blocked: string[]
}

interface PolicyTableProps {
  title?: string
  categories: BotCategory[]
  technicalRules?: { name: string; status: string }[]
  variant?: "global" | "zone"
}

export function PolicyTable({ title, categories, technicalRules, variant = "global" }: PolicyTableProps) {
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
      {/* Main Table Container with Monitor-page styling */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm shadow-black/5 ring-1 ring-foreground/5">
        
        {/* Integrated Header Box with Monitor Card Title Size */}
        {title && (
          <div className="px-6 py-4 border-b border-border/50 bg-background/40">
            <h3 className="text-sm font-medium tracking-tight text-foreground">{title}</h3>
          </div>
        )}

        {/* Column Labels - Smaller, standard metadata size */}
        <div className="grid grid-cols-4 px-6 py-3 border-b border-border/50 bg-muted/10 font-sans">
          <div className="text-[10px] font-black text-foreground/70 uppercase tracking-[0.1em]">Classification</div>
          <div className="text-[10px] font-black text-foreground/70 uppercase tracking-[0.1em] text-center">Permitted</div>
          <div className="text-[10px] font-black text-foreground/70 uppercase tracking-[0.1em] text-center">Restricted</div>
          <div className="flex items-center justify-end gap-2 text-[10px] font-black text-foreground/70 uppercase tracking-[0.1em]">
            {variant === "zone" && (
              <div className="relative w-28 mr-4">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-muted-foreground/60" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter..." 
                  className="h-5 text-[9px] pl-6 bg-background/50 border-border/30 focus-visible:ring-0 rounded-sm"
                />
              </div>
            )}
            Status
          </div>
        </div>

        <div className="divide-y divide-border/50">
          {filteredCategories.length > 0 ? filteredCategories.map((cat, idx) => (
            <Collapsible 
              key={cat.name} 
              open={openCategories.includes(cat.name)}
              onOpenChange={() => toggleCategory(cat.name)}
            >
              <CollapsibleTrigger className="w-full text-left outline-none hover:bg-muted/5 transition-colors group">
                <div className="grid grid-cols-4 px-6 py-3.5 items-center">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-foreground/30 group-data-[state=open]:rotate-90 transition-transform" />
                    <span className="text-[14px] font-semibold text-foreground/90">{cat.name}</span>
                  </div>
                  <div className="text-center font-mono text-[16px] text-blue-500 font-black tracking-tight">{cat.allowed.length}</div>
                  <div className="text-center font-mono text-[16px] text-orange-500 font-black tracking-tight">{cat.blocked.length}</div>
                  <div className="flex justify-end pr-1">
                    <div className={cn(
                      "px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-widest",
                      variant === "global" && idx === 0 
                        ? "text-emerald-500 bg-emerald-500/10 border border-emerald-500/20" 
                        : "text-foreground/40 bg-muted/20 border border-border/50"
                    )}>
                      {variant === "global" && idx === 0 ? "Validated" : "Standard"}
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 py-5 bg-muted/5 grid grid-cols-2 gap-8 border-t border-border/10">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-500 block border-b border-blue-500/10 pb-1.5 font-sans">Permitted Entities</span>
                    <div className="flex flex-wrap gap-2">
                      {cat.allowed.length > 0 ? cat.allowed.map(bot => (
                        <span key={bot} className="px-2 py-1 bg-background border border-border/50 rounded text-[11px] font-bold text-foreground/80 shadow-sm shadow-black/5 font-sans">
                          {bot}
                        </span>
                      )) : <span className="text-[11px] text-muted-foreground/50 italic font-medium">None detected</span>}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-500 block border-b border-orange-500/10 pb-1.5 font-sans">Restricted Entities</span>
                    <div className="flex flex-wrap gap-2">
                      {cat.blocked.length > 0 ? cat.blocked.map(bot => (
                        <span key={bot} className="px-2 py-1 bg-muted/20 border border-border/30 rounded text-[11px] font-bold text-foreground/60 font-sans">
                          {bot}
                        </span>
                      )) : <span className="text-[11px] text-muted-foreground/50 italic font-medium">None detected</span>}
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )) : (
            <div className="py-12 text-center text-[11px] font-bold text-muted-foreground/50 uppercase tracking-widest">No matching results found</div>
          )}
        </div>
      </div>

      {/* Technical Summary Support Cards - Exact Monitor Stats Font Sizes */}
      {technicalRules && (
        <div className="grid grid-cols-3 gap-4">
          {technicalRules.map(rule => (
            <Card key={rule.name} className="border-border/50 bg-card shadow-sm shadow-black/5 p-5 ring-1 ring-foreground/5 space-y-2 hover:bg-muted/5 transition-colors">
               <h4 className="text-[10px] text-muted-foreground font-medium">{rule.name}</h4>
               <p className="text-2xl font-semibold text-foreground tracking-tight">{rule.status.split(': ')[0]}</p>
               {rule.status.includes(': ') && (
                 <p className="text-xs text-muted-foreground mt-1">{rule.status.split(': ')[1]}</p>
               )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
