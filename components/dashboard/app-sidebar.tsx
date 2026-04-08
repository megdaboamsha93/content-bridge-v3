"use client"

import { Activity, Shield, BarChart3, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  description?: string
  href: string
  icon: React.ReactNode
}

const mainNav: NavItem[] = [
  {
    title: "Monitor",
    description: "Track patterns & performance",
    href: "/",
    icon: <Activity className="w-4 h-4" />,
  },
  {
    title: "Protect",
    description: "Configure access",
    href: "/protect",
    icon: <Shield className="w-4 h-4" />,
  },
]

const bottomNav: NavItem[] = [
  {
    title: "Industry Pulse",
    href: "/industry-pulse",
    icon: <BarChart3 className="w-4 h-4" />,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border/50 bg-sidebar flex flex-col h-screen">
      <div className="h-14 flex items-center px-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">P</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground truncate font-medium">Ummah Mosque</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/50" />
            </div>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <div className="font-medium text-sm">{item.title}</div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </nav>
      
      <div className="p-3 border-t border-border/50">
        {bottomNav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.title}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
