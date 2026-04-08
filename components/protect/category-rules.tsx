"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Sparkles } from "lucide-react"

export function CategoryRules() {
  return (
    <Card className="border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center mt-0.5">
              <Sparkles className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm">Category rules</p>
              <p className="text-sm text-muted-foreground">Override global policy for specific bot types</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  )
}
