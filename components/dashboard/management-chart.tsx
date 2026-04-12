"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { time: "13:00", allowed: 65, blocked: 5 },
  { time: "14:00", allowed: 75, blocked: 5 },
  { time: "15:00", allowed: 85, blocked: 5 },
  { time: "16:00", allowed: 120, blocked: 5 },
  { time: "17:00", allowed: 115, blocked: 5 },
  { time: "18:00", allowed: 90, blocked: 5 },
  { time: "19:00", allowed: 140, blocked: 5 },
  { time: "20:00", allowed: 105, blocked: 5 },
  { time: "21:00", allowed: 80, blocked: 5 },
  { time: "22:00", allowed: 140, blocked: 5 },
  { time: "23:00", allowed: 90, blocked: 5 },
  { time: "00:00", allowed: 65, blocked: 5 },
  { time: "01:00", allowed: 50, blocked: 5 },
  { time: "04:00", allowed: 35, blocked: 5 },
  { time: "07:00", allowed: 75, blocked: 5 },
  { time: "10:00", allowed: 115, blocked: 5 },
]

export function ManagementChart() {
  return (
    <div className="border-none shadow-none bg-transparent h-full flex flex-col items-stretch">
      <div className="flex flex-col space-y-1.5 pb-4">
        <h3 className="text-base font-medium leading-none tracking-tight">Traffic Management Timeline</h3>
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAllowed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
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
            <Area 
              type="monotone" 
              dataKey="allowed" 
              stroke="#10b981" 
              fillOpacity={1}
              fill="url(#colorAllowed)"
              strokeWidth={2}
              name="Allowed Requests"
            />
            <Area 
              type="monotone" 
              dataKey="blocked" 
              stroke="#ef4444" 
              fillOpacity={1}
              fill="url(#colorBlocked)"
              strokeWidth={2}
              name="Blocked Requests"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
