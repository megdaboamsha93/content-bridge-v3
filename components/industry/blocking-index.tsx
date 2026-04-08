"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Info } from "lucide-react"

const bots = [
  { name: "CCBot", percentage: 69.9 },
  { name: "GPTBot", percentage: 68.3 },
  { name: "ClaudeBot", percentage: 65.9 },
  { name: "Bytespider", percentage: 62.6 },
  { name: "Google-Extended", percentage: 61 },
  { name: "Applebot-Extended", percentage: 53.7 },
  { name: "PerplexityBot", percentage: 52.8 },
  { name: "anthropic-ai", percentage: 50.4 },
]

export function BlockingIndex() {
  return (
    <Card className="border-border/50">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">Crawler Blocking Index</h3>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          <Tabs defaultValue="full-site" className="w-auto">
            <TabsList>
              <TabsTrigger value="full-site">Full site</TabsTrigger>
              <TabsTrigger value="path-level">Path-level</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search bot..." 
              className="pl-9 bg-muted/30 border-border/50"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-48 bg-muted/30 border-border/50">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="ai">AI Crawlers</SelectItem>
              <SelectItem value="search">Search Engines</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          {bots.map((bot) => (
            <div 
              key={bot.name} 
              className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <span className="text-sm">{bot.name}</span>
              <span className="text-sm font-medium">{bot.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
