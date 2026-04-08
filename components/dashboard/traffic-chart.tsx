"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { time: "13:00", bot: 25, human: 45, total: 70 },
  { time: "14:00", bot: 30, human: 50, total: 80 },
  { time: "15:00", bot: 35, human: 55, total: 90 },
  { time: "16:00", bot: 40, human: 85, total: 125 },
  { time: "17:00", bot: 45, human: 75, total: 120 },
  { time: "18:00", bot: 35, human: 60, total: 95 },
  { time: "19:00", bot: 55, human: 90, total: 145 },
  { time: "20:00", bot: 40, human: 70, total: 110 },
  { time: "21:00", bot: 30, human: 55, total: 85 },
  { time: "22:00", bot: 50, human: 95, total: 145 },
  { time: "23:00", bot: 35, human: 60, total: 95 },
  { time: "00:00", bot: 25, human: 45, total: 70 },
  { time: "01:00", bot: 20, human: 35, total: 55 },
  { time: "04:00", bot: 15, human: 25, total: 40 },
  { time: "07:00", bot: 30, human: 50, total: 80 },
  { time: "10:00", bot: 45, human: 75, total: 120 },
]

interface TrafficChartProps {
  title: string
  description?: string
}

export function TrafficChart({ title, description }: TrafficChartProps) {
  return (
    <div className="border-none shadow-none bg-transparent h-full flex flex-col items-stretch">
      <div className="flex flex-col space-y-1.5 pb-4">
        <h3 className="text-base font-medium leading-none tracking-tight">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => `${value}`}
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
            <Area 
              type="monotone" 
              dataKey="human" 
              stroke="#3b82f6" 
              fillOpacity={1}
              fill="url(#colorHuman)"
              strokeWidth={2}
              name="Human Requests"
            />
            <Area 
              type="monotone" 
              dataKey="bot" 
              stroke="#f97316" 
              fillOpacity={1}
              fill="url(#colorBot)"
              strokeWidth={2}
              name="Bot Requests"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
