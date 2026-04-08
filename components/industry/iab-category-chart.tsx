"use client"

import { Card } from "@/components/ui/card"
import { Info } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const categories = [
  { name: "Unknown", color: "hsl(240, 5%, 26%)" },
  { name: "Developer & Integration Tools", color: "hsl(250, 95%, 63%)" },
  { name: "Advertising & Market Intelligence", color: "hsl(184, 100%, 50%)" },
  { name: "Search & Indexing", color: "hsl(160, 84%, 39%)" },
  { name: "SEO & Optimization", color: "hsl(28, 100%, 53%)" },
  { name: "Aggregators & Content Syndication", color: "hsl(330, 85%, 60%)" },
  { name: "AI Training & Data Acquisition", color: "hsl(189, 100%, 42%)" },
  { name: "AI Search & Answer Engines", color: "hsl(217, 91%, 60%)" },
  { name: "AI Assistant", color: "hsl(271, 91%, 65%)" },
  { name: "Security & Threat Detection", color: "hsl(0, 84%, 60%)" },
  { name: "AI Agent", color: "hsl(340, 82%, 52%)" },
  { name: "Compliance, Privacy And Accessibility", color: "hsl(291, 64%, 42%)" },
]

const fullData = [
  { category: "News and Journalism", values: [18, 12, 5, 8, 15, 10, 8, 12, 10, 1, 0, 1] },
  { category: "Business and Finance", values: [15, 14, 6, 2, 10, 12, 6, 15, 14, 2, 0, 4] },
  { category: "Technology & Computing", values: [10, 25, 8, 5, 12, 10, 4, 8, 12, 3, 1, 2] },
  { category: "Automotive", values: [12, 20, 4, 0, 18, 0, 4, 12, 18, 8, 2, 2] },
  { category: "Sports", values: [14, 22, 6, 8, 14, 8, 6, 10, 8, 2, 0, 2] },
  { category: "Hobby & Interests", values: [12, 8, 12, 10, 8, 10, 4, 8, 16, 8, 2, 2] },
  { category: "Medical Health", values: [18, 15, 4, 12, 10, 12, 6, 8, 12, 2, 0, 1] },
  { category: "Science", values: [20, 12, 8, 15, 10, 8, 4, 8, 10, 3, 1, 1] },
  { category: "Travel", values: [8, 25, 8, 6, 12, 8, 6, 10, 12, 3, 1, 1] },
  { category: "Pop Culture", values: [10, 20, 8, 0, 14, 12, 6, 15, 10, 3, 1, 1] },
  { category: "Style & Fashion", values: [8, 30, 4, 0, 12, 6, 8, 18, 10, 2, 1, 1] },
  { category: "Arts & Entertainment", values: [20, 0, 35, 0, 0, 0, 0, 22, 20, 2, 0, 1] },
  { category: "Family and Relationships", values: [8, 15, 4, 12, 18, 6, 6, 12, 14, 3, 1, 1] },
  { category: "Food & Drink", values: [6, 22, 0, 0, 20, 8, 6, 18, 14, 4, 1, 1] },
  { category: "Home & Garden", values: [10, 18, 8, 0, 16, 10, 6, 15, 12, 3, 1, 1] },
]

const smallData = fullData.map(item => ({
  category: item.category,
  total: item.values.reduce((a, b) => a + b, 0) / 10, // Scaled down for visual variety
}))

interface IABCategoryChartProps {
  variant?: "full" | "small"
}

export function IABCategoryChart({ variant = "full" }: IABCategoryChartProps) {
  if (variant === "small") {
    return (
      <Card className="border-border/50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-sm font-medium">Crawler blocking by IAB category</h3>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>

          <div className="space-y-3">
            {smallData.map((item, idx) => (
              <div key={item.category} className="space-y-1">
                <div className="text-xs text-muted-foreground text-right">{item.category}</div>
                <div className="flex gap-0.5 h-6">
                  {fullData[idx].values.map((value, i) => (
                    value > 0 && (
                      <div
                        key={i}
                        className="rounded-sm"
                        style={{
                          width: `${(value / fullData[idx].values.reduce((a, b) => a + b, 0)) * 100}%`,
                          backgroundColor: categories[i].color,
                        }}
                      />
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-xs">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-muted-foreground truncate">{cat.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              How to read: Among News and Journalism sites in the panel, 25 sites fall site-block at least one crawler we classify under Developer & Integration Tools.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-sm font-medium">Crawler blocking by IAB category</h3>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>

        <div className="space-y-3">
          {fullData.map((item, idx) => (
            <div key={item.category} className="flex items-center gap-4">
              <div className="w-48 text-xs text-muted-foreground text-right flex-shrink-0">
                {item.category}
              </div>
              <div className="flex-1 flex gap-0 h-7">
                {item.values.map((value, i) => {
                  const total = item.values.reduce((a, b) => a + b, 0)
                  const percentage = (value / total) * 100
                  return value > 0 ? (
                    <div
                      key={i}
                      className="first:rounded-l last:rounded-r"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: categories[i].color,
                      }}
                    />
                  ) : null
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-x-6 gap-y-2 flex-wrap text-xs">
            {categories.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: cat.color }} />
                <span className="text-muted-foreground">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
