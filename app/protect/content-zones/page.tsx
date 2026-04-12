"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Header } from "@/components/dashboard/header"
import { ContentZones } from "@/components/protect/content-zones"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Info } from "lucide-react"
import Link from "next/link"

export default function ContentZonesPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Zone Management" minimalMode />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Content Zones</h1>
              <p className="text-muted-foreground italic text-sm">Configure paths and specific access rules for segmented content areas.</p>
            </div>

            <ContentZones />
            
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/50">
              <Button variant="outline">Discard Changes</Button>
              <Button>Apply Zone Rules</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
