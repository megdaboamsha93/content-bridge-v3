"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  User, 
  Mail, 
  ShieldCheck, 
  CreditCard, 
  Settings, 
  MessageSquare, 
  Key, 
  ChevronLeft,
  Edit2
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const settingsNav = [
  { name: "Personal Information", icon: User, active: true },
  { name: "Communication", icon: MessageSquare },
  { name: "API Tokens", icon: Key },
  { name: "Security Settings", icon: ShieldCheck },
  { name: "Usage & Billing", icon: CreditCard },
  { name: "Account Management", icon: Settings },
]

export default function SettingsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Account Settings" />
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="flex h-full">
            {/* Settings Sidebar */}
            <aside className="w-64 border-r border-border/50 bg-background/50 p-4 space-y-6">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>

              <div className="space-y-1">
                <nav className="space-y-1">
                  {settingsNav.map((item) => (
                    <button
                      key={item.name}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        item.active 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground w-full transition-colors">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full border border-muted-foreground text-[10px]">?</span>
                  Help & Support
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <section className="flex-1 p-8">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Personal Information Card */}
                <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-lg">Personal Information</h3>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="salutation" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Salutation
                        </Label>
                        <Select defaultValue="mr">
                          <SelectTrigger id="salutation" className="bg-muted/30 border-border/50">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mr">Mr.</SelectItem>
                            <SelectItem value="ms">Ms.</SelectItem>
                            <SelectItem value="mrs">Mrs.</SelectItem>
                            <SelectItem value="dr">Dr.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          First Name
                        </Label>
                        <Input 
                          id="first-name" 
                          defaultValue="Nadeem" 
                          className="bg-muted/30 border-border/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Last Name
                        </Label>
                        <Input 
                          id="last-name" 
                          defaultValue="Qureshi" 
                          className="bg-muted/30 border-border/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="display-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Display Name
                        </Label>
                        <Input 
                          id="display-name" 
                          defaultValue="Nadeem Qureshi" 
                          className="bg-muted/30 border-border/50"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Email
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue="nadmoqu+ummah@gmail.com" 
                          className="bg-muted/30 border-border/50"
                        />
                        <p className="text-[10px] text-muted-foreground">
                          Contact support to change your email
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-border/50 grid grid-cols-2 gap-8">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</p>
                        <p className="text-sm font-bold">Ummah Mosque</p>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">Publisher</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</p>
                        <p className="text-sm font-bold">Owner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
