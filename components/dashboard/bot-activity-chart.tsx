"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { time: "13:00", wordpress: 5, googlebot: 4, petalbot: 5 },
  { time: "15:00", wordpress: 7, googlebot: 5, petalbot: 6 },
  { time: "17:00", wordpress: 12, googlebot: 8, petalbot: 9 },
  { time: "19:00", wordpress: 15, googlebot: 10, petalbot: 13 },
  { time: "21:00", wordpress: 10, googlebot: 7, petalbot: 10 },
  { time: "23:00", wordpress: 8, googlebot: 5, petalbot: 8 },
  { time: "01:00", wordpress: 4, googlebot: 3, petalbot: 4 },
  { time: "04:00", wordpress: 3, googlebot: 2, petalbot: 3 },
  { time: "07:00", wordpress: 6, googlebot: 4, petalbot: 6 },
  { time: "10:00", wordpress: 14, googlebot: 9, petalbot: 13 },
]

const colors = {
  wordpress: "#3b82f6",
  googlebot: "#f97316",
  petalbot: "#8b5cf6"
}

export function BotActivityChart() {
  return (
    <div className="border-none shadow-none bg-transparent h-full flex flex-col items-stretch">
      <div className="flex flex-col space-y-1.5 pb-4">
        <h3 className="text-base font-medium leading-none tracking-tight">Bot Activity Trend</h3>
      </div>
      <div className="flex-1 min-h-[250px]">
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
              labelStyle={{ color: '#fff', marginBottom: '4px', fontWeight: 'bold' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
            />
            <Line type="monotone" dataKey="wordpress" stroke={colors.wordpress} strokeWidth={2} dot={false} name="wordpress" />
            <Line type="monotone" dataKey="googlebot" stroke={colors.googlebot} strokeWidth={2} dot={false} name="googlebot" />
            <Line type="monotone" dataKey="petalbot" stroke={colors.petalbot} strokeWidth={2} dot={false} name="petalbot" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
