"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown, ChevronRight, ShieldCheck, ShieldX } from "lucide-react"
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
      {/* Table Container */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm shadow-black/5">
        <div className="grid grid-cols-4 px-6 py-3 border-b border-border/50 bg-muted/20">
          <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Classification</div>
          <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest text-center">Permitted</div>
          <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest text-center">Restricted</div>
          <div className="flex items-center justify-end gap-2">
            {variant === "zone" && (
              <div className="relative w-28">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-muted-foreground/40" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter..." 
                  className="h-5 text-[9px] pl-6 bg-background/30 border-border/20 focus-visible:ring-0 rounded-sm"
                />
              </div>
            )}
            <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Status</div>
          </div>
        </div>

        <div className="divide-y divide-border/50">
          {filteredCategories.length > 0 ? filteredCategories.map((cat, idx) => (
            <Collapsible 
              key={cat.name} 
              open={openCategories.includes(cat.name)}
              onOpenChange={() => toggleCategory(cat.name)}
            >
              <CollapsibleTrigger className="w-full text-left outline-none hover:bg-muted/10 transition-colors group">
                <div className="grid grid-cols-4 px-6 py-3 items-center">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-muted-foreground/30 group-data-[state=open]:rotate-90 transition-transform" />
                    <span className="text-xs font-medium text-foreground/80">{cat.name}</span>
                  </div>
                  <div className="text-center text-xs text-blue-500 font-bold">{cat.allowed.length}</div>
                  <div className="text-center text-xs text-orange-500 font-bold">{cat.blocked.length}</div>
                  <div className="flex justify-end pr-1">
                    <div className={cn(
                      "px-1.5 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-tight",
                      variant === "global" && idx === 0 
                        ? "text-emerald-500/80 bg-emerald-500/5" 
                        : "text-muted-foreground/30"
                    )}>
                      {variant === "global" && idx === 0 ? "Validated" : "Standard"}
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 py-4 bg-muted/5 grid grid-cols-2 gap-6 border-t border-border/10">
                  <div className="space-y-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500/60 block border-b border-border/10 pb-1">Permitted Entities</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.allowed.length > 0 ? cat.allowed.map(bot => (
                        <span key={bot} className="px-1.5 py-0.5 bg-background border border-border/50 rounded text-[10px] text-muted-foreground">
                          {bot}
                        </span>
                      )) : <span className="text-[10px] text-muted-foreground/30 italic">None</span>}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-orange-500/60 block border-b border-border/10 pb-1">Restricted Entities</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.blocked.length > 0 ? cat.blocked.map(bot => (
                        <span key={bot} className="px-1.5 py-0.5 bg-muted/30 border border-border/30 rounded text-[10px] text-muted-foreground/60">
                          {bot}
                        </span>
                      )) : <span className="text-[10px] text-muted-foreground/30 italic">None</span>}
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )) : (
            <div className="py-8 text-center text-[10px] text-muted-foreground/30 uppercase tracking-widest">Filtered List Empty</div>
          )}
        </div>
      </div>

      {/* Technical Summary Support Cards */}
      {technicalRules && (
        <div className="grid grid-cols-3 gap-4">
          {technicalRules.map(rule => (
            <Card key={rule.name} className="border-border/50 bg-card shadow-sm shadow-black/5 p-4 space-y-2">
               <h4 className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">{rule.name}</h4>
               <p className="text-sm font-semibold text-foreground/80 tracking-tight">{rule.status}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
