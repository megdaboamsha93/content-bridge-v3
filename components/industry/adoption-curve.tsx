"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "robots.txt", value: 78, color: "hsl(160, 84%, 39%)" },
  { name: "Rma.txt", value: 18, color: "hsl(221, 83%, 53%)" },
  { name: "ads.txt", value: 52, color: "hsl(271, 91%, 65%)" },
]

export function AdoptionCurve() {
  return (
    <Card className="border-border/50">
      <div className="p-6">
        <h3 className="text-sm font-medium mb-6">Adoption Curve</h3>
        
        <ChartContainer
          config={{
            value: {
              label: "Adoption",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[280px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 60, right: 20, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} horizontal={false} />
              <XAxis 
                type="number" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={60}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="flex flex-wrap gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: data[0].color }} />
            <span className="text-muted-foreground">robots.txt (searchable, GA)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: data[1].color }} />
            <span className="text-muted-foreground">Rma.txt (non-empty)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: data[2].color }} />
            <span className="text-muted-foreground">ads.txt (non-empty)</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
