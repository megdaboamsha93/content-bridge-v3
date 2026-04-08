"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

export function BotSearch() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          Search & filter bots
        </CardTitle>
        <p className="text-sm text-muted-foreground">Find and manage individual bot permissions</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search bots by name, user agent, or description..."
            className="pl-9 bg-muted/30 border-border/50"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-3">
          <Select defaultValue="all-categories">
            <SelectTrigger className="bg-muted/30 border-border/50 md:w-1/2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              <SelectItem value="search-engines">Search Engines</SelectItem>
              <SelectItem value="crawlers">Crawlers</SelectItem>
              <SelectItem value="monitoring">Monitoring</SelectItem>
              <SelectItem value="social">Social Media</SelectItem>
              <SelectItem value="ai-agents">AI Agents</SelectItem>
              <SelectItem value="ai-assistants">AI Assistants</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-bots">
            <SelectTrigger className="bg-muted/30 border-border/50 md:w-1/2">
              <SelectValue placeholder="Select bot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-bots">All Bots</SelectItem>
              <SelectItem value="googlebot">Googlebot</SelectItem>
              <SelectItem value="bingbot">Bingbot</SelectItem>
              <SelectItem value="semrush">Semrush</SelectItem>
              <SelectItem value="chatgpt">ChatGPT</SelectItem>
              <SelectItem value="wordpress">WordPress</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
