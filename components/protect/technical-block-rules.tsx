"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Shield, ShieldAlert, Database, Network } from "lucide-react"

export function TechnicalBlockRules() {
  const rules = [
    {
      id: "spoofed",
      title: "Spoofed IP Addresses",
      description: "Match and block requests from bots claiming to be search engines but failing reverse DNS/IP validation",
      icon: <ShieldAlert className="w-4 h-4 text-red-500" />,
      checked: true
    },
    {
      id: "data-center",
      title: "Data Center Traffic",
      description: "Restrict access from known commercial hosting, cloud provider, and transit networks",
      icon: <Database className="w-4 h-4 text-blue-500" />,
      checked: false
    },
    {
      id: "rotating-proxy",
      title: "Rotating Proxy Networks",
      description: "Detect and block high-frequency IP switching typical of professional scraper networks",
      icon: <Network className="w-4 h-4 text-purple-500" />,
      checked: true
    }
  ]

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          Technical Blocking Rules
        </CardTitle>
        <p className="text-sm text-muted-foreground">Apply advanced filters based on infrastructure and request characteristics</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/30">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center mt-0.5 border border-border/50 shadow-sm">
                {rule.icon}
              </div>
              <div>
                <p className="font-medium text-sm">{rule.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[400px]">
                  {rule.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={rule.checked} />
              <span className={`text-[10px] font-bold uppercase tracking-wider min-w-[50px] ${rule.checked ? "text-emerald-500" : "text-muted-foreground"}`}>
                {rule.checked ? "Active" : "Disabled"}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
