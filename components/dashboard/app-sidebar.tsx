"use client"

import { Activity, Shield, BarChart3, ChevronDown, LayoutGrid } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  description?: string
  href: string
  icon: React.ReactNode
  items?: { title: string; href: string }[]
}

const mainNav: NavItem[] = [
  {
    title: "Dashboard",
    href: "/main-dashboard",
    icon: <LayoutGrid className="w-4 h-4" />,
  },
  {
    title: "Monitor",
    href: "/",
    icon: <Activity className="w-4 h-4" />,
  },
  {
    title: "Protect",
    href: "/protect",
    icon: <Shield className="w-4 h-4" />,
    items: [
      { title: "Global Policy", href: "/protect/global-policy" },
      { title: "Content Zones", href: "/protect/content-zones" },
    ],
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

      <nav className="flex-1 py-8">
        <div className="space-y-4">
          {mainNav.map((item) => {
            const isActive = pathname === item.href || item.items?.some(sub => pathname === sub.href)
            const hasItems = item.items && item.items.length > 0

            return (
              <div key={item.title} className="space-y-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 transition-all relative group",
                    isActive
                      ? "text-sidebar-foreground"
                      : "text-muted-foreground hover:text-sidebar-foreground"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-[2px] h-14 bg-muted-foreground/30 rounded-full" />
                  )}
                  {item.icon}
                  <span className="font-medium text-sm">{item.title}</span>
                </Link>

                {hasItems && (
                  <div className="ml-11 space-y-3 pt-1 pb-2">
                    {item.items?.map((subItem) => {
                      const isSubActive = pathname === subItem.href
                      return (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className={cn(
                            "block text-xs font-medium transition-colors",
                            isSubActive
                              ? "text-sidebar-foreground"
                              : "text-muted-foreground hover:text-sidebar-foreground"
                          )}
                        >
                          {subItem.title}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      <div className="py-6 border-t border-border/50">
        <div className="space-y-4">
          {bottomNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-all relative group",
                  isActive
                    ? "text-sidebar-foreground"
                    : "text-muted-foreground hover:text-sidebar-foreground"
                )}
              >
                {isActive && (
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-muted-foreground/30 rounded-full" />
                )}
                {item.icon}
                <span className="font-medium text-sm">{item.title}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
