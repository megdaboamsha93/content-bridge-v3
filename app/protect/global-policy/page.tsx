"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Header } from "@/components/dashboard/header"
import { DomainPolicy } from "@/components/protect/domain-policy"
import { CategoryRules } from "@/components/protect/category-rules"
import { BotSearch } from "@/components/protect/bot-search"
import { Button } from "@/components/ui/button"

export default function GlobalPolicyPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Global Policy" minimalMode />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="space-y-6">
              <DomainPolicy />
              <CategoryRules />
              <BotSearch />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
              <Button variant="outline">Discard</Button>
              <Button>Save changes</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
