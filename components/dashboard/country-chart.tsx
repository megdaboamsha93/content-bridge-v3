"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { country: "Germany", bot: 180, human: 120 },
  { country: "United States", bot: 160, human: 140 },
  { country: "Singapore", bot: 100, human: 80 },
  { country: "Poland", bot: 50, human: 30 },
  { country: "United Kingdom", bot: 45, human: 25 },
  { country: "Netherlands", bot: 35, human: 20 },
  { country: "Vietnam", bot: 30, human: 15 },
  { country: "Ireland", bot: 28, human: 12 },
  { country: "Canada", bot: 25, human: 15 },
  { country: "Italy", bot: 20, human: 10 },
]

export function CountryChart() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-medium">Country Breakdown by Traffic</h3>
        <p className="text-sm text-muted-foreground">Top 10 countries sorted by total visitors, showing human vs bot traffic split</p>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <XAxis 
              type="number" 
              stroke="#666" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              type="category" 
              dataKey="country" 
              stroke="#666" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #333',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
            />
            <Bar dataKey="bot" stackId="a" fill="#f97316" name="Bot Traffic" radius={[0, 0, 0, 0]} />
            <Bar dataKey="human" stackId="a" fill="#3b82f6" name="Human Traffic" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
