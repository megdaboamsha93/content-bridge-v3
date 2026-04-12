"use client"

import { useState } from "react"
import { Bell, Download, RefreshCw, ChevronDown, Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

interface HeaderProps {
  title?: string
  minimalMode?: boolean
}

export function Header({ title = "Dashboard", minimalMode = false }: HeaderProps) {
  const isMonitorPage = title.toLowerCase() === "monitor"
  const [showFilters, setShowFilters] = useState(false)

  return (
    <header className="h-14 border-b border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-md font-medium text-foreground/80 lowercase tracking-tight">{title.toLowerCase()}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Page Specific Actions - Only for Monitor */}
        {isMonitorPage && !minimalMode && (
          <div className="flex items-center gap-2 pr-4 border-r border-border/50">
            <div className={cn(
              "flex items-center gap-2 transition-all duration-300 overflow-hidden",
              showFilters ? "max-w-md opacity-100" : "max-w-0 opacity-0 pointer-events-none"
            )}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Time Range</div>
                  <DropdownMenuItem className="text-xs">Last hour</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Last 6 hours</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Last 24 hours</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Last 30 days</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground shrink-0">
                <RefreshCw className="w-3.5 h-3.5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground shrink-0">
                <Download className="w-3.5 h-3.5" />
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "h-8 w-8 text-muted-foreground transition-transform duration-300",
                showFilters && "rotate-45"
              )}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Global Actions & Profile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Bell className="w-3.5 h-3.5" />
            </Button>
            <ModeToggle />
          </div>

          <div className="flex items-center gap-2 pl-4 border-l border-border/50">
            <div className="text-right mr-1">
              <div className="text-xs font-medium">Qureshi</div>
              <div className="text-[10px] text-muted-foreground text-right">Owner</div>
            </div>
            <Avatar className="w-8 h-8 ring-1 ring-border/50 ring-offset-background">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-[10px]">NQ</AvatarFallback>
            </Avatar>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/40" />
          </div>
        </div>
      </div>
    </header>
  )
}
