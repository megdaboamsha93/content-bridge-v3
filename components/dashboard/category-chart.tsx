"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { time: "13:00", devTools: 8, searchEngine: 5, aiAssistant: 5, other: 9 },
  { time: "15:00", devTools: 10, searchEngine: 6, aiAssistant: 7, other: 8 },
  { time: "17:00", devTools: 15, searchEngine: 8, aiAssistant: 11, other: 11 },
  { time: "19:00", devTools: 22, searchEngine: 12, aiAssistant: 18, other: 14 },
  { time: "21:00", devTools: 14, searchEngine: 8, aiAssistant: 12, other: 9 },
  { time: "23:00", devTools: 10, searchEngine: 6, aiAssistant: 9, other: 7 },
  { time: "01:00", devTools: 5, searchEngine: 3, aiAssistant: 4, other: 4 },
  { time: "04:00", devTools: 4, searchEngine: 2, aiAssistant: 3, other: 3 },
  { time: "07:00", devTools: 8, searchEngine: 5, aiAssistant: 7, other: 8 },
  { time: "10:00", devTools: 18, searchEngine: 10, aiAssistant: 14, other: 12 },
]

const colors = {
  devTools: "#8b5cf6",
  searchEngine: "#3b82f6",
  aiAssistant: "#f97316",
  other: "#6b7280"
}

export function CategoryChart() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium">Bot Category Timelines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#666" 
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#666" 
                fontSize={11}
                tickLine={false}
                axisLine={false}
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
                wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
              />
              <Line type="monotone" dataKey="devTools" stroke={colors.devTools} strokeWidth={2} dot={false} name="Developer Tools" />
              <Line type="monotone" dataKey="searchEngine" stroke={colors.searchEngine} strokeWidth={2} dot={false} name="Search Engines" />
              <Line type="monotone" dataKey="aiAssistant" stroke={colors.aiAssistant} strokeWidth={2} dot={false} name="AI Assistants" />
              <Line type="monotone" dataKey="other" stroke={colors.other} strokeWidth={2} dot={false} name="Other" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
