"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface DonutChartProps {
  title: string
  data: { name: string; value: number; color: string }[]
}

export function DonutChart({ title, data }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <div className="border-none shadow-none bg-transparent h-full flex flex-col items-stretch">
      <div className="flex flex-col space-y-1.5 pb-2">
        <h3 className="text-base font-medium leading-none tracking-tight">{title}</h3>
      </div>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #333',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelStyle={{ color: '#fff', marginBottom: '4px', fontWeight: 'bold' }}
              formatter={(value: any, name: any) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-muted-foreground line-clamp-1">{item.name}</span>
            </div>
            <span className="font-medium whitespace-nowrap">{item.value} ({((item.value / total) * 100).toFixed(1)}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
}
