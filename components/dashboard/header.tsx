"use client"

import { Bell, Download, RefreshCw, ChevronDown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ModeToggle } from "@/components/mode-toggle"

interface HeaderProps {
  title?: string
  minimalMode?: boolean
}

export function Header({ title = "Monitor", minimalMode = false }: HeaderProps) {
  return (
    <header className="h-14 border-b border-border/50 bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      </div>
      
      <div className="flex items-center gap-2">
        <ModeToggle />
        {!minimalMode && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Last 24 hours
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Last hour</DropdownMenuItem>
                <DropdownMenuItem>Last 6 hours</DropdownMenuItem>
                <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
                <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <RefreshCw className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Download className="w-4 h-4" />
            </Button>
          </>
        )}
        
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border/50">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback className="bg-orange-500 text-white text-xs">NQ</AvatarFallback>
          </Avatar>
          <div className="hidden lg:block">
            <div className="text-sm font-medium">Qureshi</div>
            <div className="text-xs text-muted-foreground">Owner</div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  )
}
