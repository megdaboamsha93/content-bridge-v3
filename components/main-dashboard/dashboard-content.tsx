"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { BarChart3, Clock, LayoutGrid, ListTodo, Plus } from "lucide-react"

export function DashboardContent() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                <h3 className="text-2xl font-bold">1,284</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-600">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connected Tools</p>
                <h3 className="text-2xl font-bold">12 / 15</h3>
              </div>
            </div>
          </Card>

          {/* Placeholder Chart Box */}
          <Card className="md:col-span-2 p-6 h-[300px] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                System Uptime (Last 7 Days)
              </h3>
              <div className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-8 h-4 rounded-sm bg-blue-500/40" />
                ))}
              </div>
            </div>
            <div className="flex-1 rounded-lg bg-muted/30 border border-dashed border-border/50 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent" />
              <p className="text-xs text-muted-foreground font-medium z-10">Real-time performance metrics visualization placeholder</p>
            </div>
          </Card>
        </div>

        {/* To-Do List & Tools */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-muted-foreground" />
                Platform To-Dos
              </h3>
              <button className="p-1 hover:bg-muted rounded-md transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                "Update security patches for Zone A",
                "Review bot detection thresholds",
                "Optimize cache headers for US-East",
                "Backup database logs"
              ].map((task, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <Checkbox id={`task-${i}`} className="mt-1" />
                  <label htmlFor={`task-${i}`} className="text-sm text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors leading-tight">
                    {task}
                  </label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-muted/20 border-border/50">
            <h3 className="font-semibold mb-3 text-sm">Active Tools</h3>
            <div className="grid grid-cols-4 gap-2 text-muted-foreground/60">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-background border border-border/50 flex items-center justify-center hover:text-blue-500 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-current" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
