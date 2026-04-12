"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Trash2, ChevronRight, FileText, Plus, ExternalLink, Ban, Eye } from "lucide-react"

interface ContentZone {
  id: string
  title: string
  paths: string[]
  pathCount: number
  rules?: number
}

export function ContentZones() {
  const [zones] = useState<ContentZone[]>([
    {
      id: "1",
      title: "Imported paths",
      paths: ["/*tid_external_content_proxy/", "/.ei=", "/.linkId="],
      pathCount: 22,
    },
    {
      id: "2",
      title: "Imported paths",
      paths: ["/finanzen/versichern-und-vorsorgen/"],
      pathCount: 1,
      rules: 8,
    },
  ])

  const [expanded, setExpanded] = useState<string>("")

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          Content zones
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search zones..."
              className="w-44 h-8 text-sm bg-muted/30 border-border/50"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {zones.map((zone) => (
          <Collapsible 
            key={zone.id} 
            open={expanded === zone.id} 
            onOpenChange={() => setExpanded(expanded === zone.id ? "" : zone.id)}
          >
              <div className="border border-border/50 rounded-lg overflow-hidden relative">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-3 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === zone.id ? "rotate-90" : ""}`} />
                      <div className="text-left">
                        <p className="font-medium text-sm">
                          {zone.title} ({zone.pathCount})
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {zone.paths.slice(0, 2).join(", ")}
                          {zone.pathCount > 2 && ` ... and ${zone.pathCount - 2} more`}
                        </p>
                      </div>
                    </div>
                    {/* Spacer for the absolute positioned buttons */}
                    <div className="w-32" /> 
                  </div>
                </CollapsibleTrigger>
                
                <div className="absolute right-3 top-3 flex items-center gap-2 z-10">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={(e) => e.stopPropagation()}>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={(e) => e.stopPropagation()}>
                    <Ban className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={(e) => e.stopPropagation()}>
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                  {zone.rules && (
                    <span className="text-xs text-muted-foreground px-2">{zone.rules} rules</span>
                  )}
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-500" onClick={(e) => e.stopPropagation()}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>

              <CollapsibleContent>
                <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-2">
                  {zone.paths.map((path, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-muted/30 rounded border border-border/30">
                      <code className="text-xs text-muted-foreground font-mono">{path}</code>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}

        <button className="w-full py-3 border border-dashed border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-colors flex items-center justify-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          Add zone
        </button>
      </CardContent>
    </Card>
  )
}
