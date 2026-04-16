"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Header } from "@/components/dashboard/header"
import { RuleBuilderContent } from "@/components/protect/rule-builder/rule-builder-content"

export default function ProtectPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Protect" minimalMode />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 pt-2">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <RuleBuilderContent />
          </div>
        </main>
      </div>
    </div>
  )
}
