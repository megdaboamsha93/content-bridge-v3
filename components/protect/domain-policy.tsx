"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Shield, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DomainPolicy() {
  const [allowAll, setAllowAll] = useState(true)

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          Domain policy
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Settings className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/30">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center mt-0.5">
              <Shield className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm">Global default</p>
              <p className="text-sm text-muted-foreground">Baseline access level for all bots</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch 
              checked={allowAll} 
              onCheckedChange={setAllowAll}
            />
            <span className={`text-sm font-medium min-w-[70px] ${allowAll ? "text-emerald-500" : "text-red-500"}`}>
              {allowAll ? "Allow All" : "Block All"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
