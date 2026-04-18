"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Shield,
  Plus,
  ChevronRight,
  ChevronDown,
  Search,
  AlertTriangle,
  Layers,
  Globe,
  Eye,
  EyeOff,
  Trash2,
  Link2,
  Unlink,
  Info,
  CheckCircle2,
  Filter,
  Settings2,
  GripVertical,
  Import,
  FileText,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  ArrowUpDown,
  Bot,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

type RuleType = "category" | "behaviour" | "country"
type RuleAction = "allow" | "block" | "challenge"

interface Rule {
  id: string
  name: string
  type: RuleType
  action: RuleAction
  enabled: boolean
  targets: string[]
  description?: string
}

interface Zone {
  id: string
  name: string
  paths: string[]
  assignedRuleIds: string[]
}

interface Conflict {
  zoneId: string
  ruleA: string
  ruleB: string
  reason: string
}

// ──────────────────────────────────────────────
// Mock Data
// ──────────────────────────────────────────────

const BOT_CATEGORIES = [
  "Search Engines",
  "AI Crawlers",
  "AI Assistants",
  "Social Media",
  "Commercial Scrapers",
  "SEO Tools",
  "Feed Fetchers",
  "Monitoring Services",
  "Security Scanners",
  "Advertising",
  "Archiving",
  "Academic Research",
  "Developer Tools",
  "Unknown / Unclassified",
]

const COUNTRIES = [
  "Germany", "United States", "United Kingdom", "France", "China",
  "Russia", "India", "Japan", "Brazil", "Canada",
  "Australia", "Netherlands", "Singapore", "South Korea", "Ukraine",
]

const HIERARCHY_LEVELS = [
  { id: "behaviour", label: "Behaviour", description: "Transparent / Intransparent", icon: Eye },
  { id: "category", label: "Category", description: "Bot classification (14 types)", icon: Layers },
  { id: "country", label: "Country", description: "Geographic origin", icon: Globe },
  { id: "bot_name", label: "Bot Name", description: "Individual bot identity", icon: Bot },
]

const initialRules: Rule[] = [
  {
    id: "r1",
    name: "Block AI Crawlers",
    type: "category",
    action: "block",
    enabled: true,
    targets: ["AI Crawlers", "AI Assistants"],
    description: "Prevent AI training crawlers from accessing content",
  },
  {
    id: "r2",
    name: "Allow Search Engines",
    type: "category",
    action: "allow",
    enabled: true,
    targets: ["Search Engines"],
    description: "Ensure search engine indexing is not disrupted",
  },
  {
    id: "r3",
    name: "Block Intransparent Bots",
    type: "behaviour",
    action: "block",
    enabled: true,
    targets: ["Intransparent"],
    description: "Block bots that don't declare themselves or fail signal verification",
  },
  {
    id: "r4",
    name: "Block Russian Traffic",
    type: "country",
    action: "block",
    enabled: false,
    targets: ["Russia", "Ukraine"],
    description: "Geo-block traffic from specific countries",
  },
  {
    id: "r5",
    name: "Block Commercial Scrapers",
    type: "category",
    action: "block",
    enabled: true,
    targets: ["Commercial Scrapers", "SEO Tools"],
    description: "Block known commercial scraping and SEO tools",
  },
]

const initialZones: Zone[] = [
  {
    id: "z1",
    name: "Premium Content",
    paths: ["/premium/*", "/exclusive/*", "/paywall/*"],
    assignedRuleIds: ["r1", "r2", "r3", "r5"],
  },
  {
    id: "z2",
    name: "Public Blog",
    paths: ["/blog/*", "/news/*"],
    assignedRuleIds: ["r2", "r3"],
  },
  {
    id: "z3",
    name: "API Endpoints",
    paths: ["/api/v2/*", "/api/v3/*"],
    assignedRuleIds: ["r1", "r3", "r4", "r5"],
  },
  {
    id: "z4",
    name: "Insurance Knowledge Base",
    paths: ["/finanzen/versichern-und-vorsorgen/*"],
    assignedRuleIds: ["r1", "r2"],
  },
]

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function getRuleTypeIcon(type: RuleType) {
  switch (type) {
    case "category": return <Layers className="w-3.5 h-3.5" />
    case "behaviour": return <Eye className="w-3.5 h-3.5" />
    case "country": return <Globe className="w-3.5 h-3.5" />
  }
}

function getRuleTypeLabel(type: RuleType) {
  switch (type) {
    case "category": return "Category"
    case "behaviour": return "Behaviour"
    case "country": return "Country"
  }
}

function getActionIcon(action: RuleAction) {
  switch (action) {
    case "allow": return <ShieldCheck className="w-3.5 h-3.5" />
    case "block": return <ShieldAlert className="w-3.5 h-3.5" />
    case "challenge": return <ShieldQuestion className="w-3.5 h-3.5" />
  }
}

function getActionStyle(action: RuleAction) {
  switch (action) {
    case "allow": return "text-emerald-600 bg-emerald-500/8 border-emerald-500/15"
    case "block": return "text-red-600 bg-red-500/8 border-red-500/15"
    case "challenge": return "text-amber-600 bg-amber-500/8 border-amber-500/15"
  }
}

function detectConflicts(zones: Zone[], rules: Rule[]): Conflict[] {
  const conflicts: Conflict[] = []
  const ruleMap = new Map(rules.map(r => [r.id, r]))

  for (const zone of zones) {
    const assignedRules = zone.assignedRuleIds
      .map(id => ruleMap.get(id))
      .filter((r): r is Rule => r !== undefined && r.enabled)

    for (let i = 0; i < assignedRules.length; i++) {
      for (let j = i + 1; j < assignedRules.length; j++) {
        const a = assignedRules[i]
        const b = assignedRules[j]

        if (a.action !== b.action && a.type === b.type) {
          const overlap = a.targets.filter(t => b.targets.includes(t))
          if (overlap.length > 0) {
            conflicts.push({
              zoneId: zone.id,
              ruleA: a.id,
              ruleB: b.id,
              reason: `"${a.name}" (${a.action}) conflicts with "${b.name}" (${b.action}) on: ${overlap.join(", ")}`,
            })
          }
        }

        if (a.type === "behaviour" && b.type === "category" && a.action !== b.action) {
          if (a.targets.includes("Intransparent") && b.action === "allow") {
            conflicts.push({
              zoneId: zone.id,
              ruleA: a.id,
              ruleB: b.id,
              reason: `"${a.name}" blocks intransparent bots, but "${b.name}" allows category "${b.targets.join(", ")}" — intransparent bots from that category will still be blocked`,
            })
          }
        }
      }
    }
  }

  return conflicts
}

// ──────────────────────────────────────────────
// Sub-Components
// ──────────────────────────────────────────────

function RuleCard({
  rule,
  onToggle,
  onDelete,
  conflictCount,
  linkedZoneCount,
}: {
  rule: Rule
  onToggle: () => void
  onDelete: () => void
  conflictCount: number
  linkedZoneCount: number
}) {
  return (
    <div className={cn(
      "group border rounded-xl p-4 transition-all hover:shadow-sm",
      rule.enabled
        ? "border-border/60 bg-card"
        : "border-border/30 bg-muted/5 opacity-50"
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 border border-border/40 bg-muted/30 shrink-0 text-foreground/50">
            {getRuleTypeIcon(rule.type)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-foreground">{rule.name}</span>
              <span className={cn(
                "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border",
                getActionStyle(rule.action)
              )}>
                {rule.action}
              </span>
            </div>
            {rule.description && (
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rule.description}</p>
            )}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {rule.targets.map(target => (
                <span
                  key={target}
                  className="px-2 py-0.5 bg-muted/40 border border-border/40 rounded text-[10px] font-medium text-foreground/60"
                >
                  {target}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {conflictCount > 0 && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 cursor-help">
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                    <span className="text-[9px] font-bold text-amber-600">{conflictCount}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px] p-3">
                  <p className="text-xs">{conflictCount} conflict{conflictCount > 1 ? "s" : ""} detected across assigned zones</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted/30 border border-border/30">
            <Link2 className="w-3 h-3 text-muted-foreground" />
            <span className="text-[9px] font-bold text-foreground/50">{linkedZoneCount}</span>
          </div>
          <Switch
            checked={rule.enabled}
            onCheckedChange={onToggle}
            className="scale-[0.8]"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onDelete}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ZoneCard({
  zone,
  rules,
  conflicts,
  onUnlinkRule,
}: {
  zone: Zone
  rules: Rule[]
  conflicts: Conflict[]
  onUnlinkRule: (zoneId: string, ruleId: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const assignedRules = zone.assignedRuleIds
    .map(id => rules.find(r => r.id === id))
    .filter((r): r is Rule => r !== undefined)

  const zoneConflicts = conflicts.filter(c => c.zoneId === zone.id)
  const hasConflicts = zoneConflicts.length > 0

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={cn(
        "border rounded-xl overflow-hidden transition-all",
        hasConflicts
          ? "border-amber-500/30"
          : "border-border/60"
      )}>
        <CollapsibleTrigger className="w-full text-left bg-card hover:bg-muted/10 transition-colors p-4 outline-none group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChevronRight className="w-4 h-4 text-muted-foreground group-data-[state=open]:rotate-90 transition-transform" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">{zone.name}</h3>
                  {hasConflicts && (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      <span className="text-[9px] font-bold text-amber-600">{zoneConflicts.length}</span>
                    </div>
                  )}
                </div>
                <p className="text-[11px] font-mono text-foreground/40 mt-0.5">
                  {zone.paths.join(" · ")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {assignedRules.slice(0, 3).map(rule => (
                  <span
                    key={rule.id}
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border",
                      getActionStyle(rule.action)
                    )}
                  >
                    {rule.name.length > 18 ? rule.name.slice(0, 16) + "…" : rule.name}
                  </span>
                ))}
                {assignedRules.length > 3 && (
                  <span className="text-[10px] text-foreground/40 font-medium">+{assignedRules.length - 3}</span>
                )}
              </div>
              <div className={cn(
                "px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest border",
                hasConflicts
                  ? "text-amber-600 bg-amber-500/8 border-amber-500/15"
                  : "text-emerald-600 bg-emerald-500/8 border-emerald-500/15"
              )}>
                {hasConflicts ? "Conflicts" : "Clean"}
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t border-border/30 bg-background">
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/50">
                  Assigned Rules ({assignedRules.length})
                </span>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] text-foreground/60 hover:text-foreground gap-1">
                  <Plus className="w-3 h-3" />
                  Assign Rule
                </Button>
              </div>

              {assignedRules.length > 0 ? (
                <div className="space-y-1.5">
                  {assignedRules.map((rule, idx) => (
                    <div
                      key={rule.id}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors",
                        !rule.enabled
                          ? "bg-muted/5 border-border/20 opacity-40"
                          : "bg-muted/10 border-border/40 hover:bg-muted/20"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-mono text-foreground/30 w-4">{idx + 1}</span>
                        <div className="w-5 h-5 rounded flex items-center justify-center border border-border/40 bg-muted/30 text-foreground/40">
                          {getRuleTypeIcon(rule.type)}
                        </div>
                        <span className="text-xs font-medium text-foreground/80">{rule.name}</span>
                        <span className={cn(
                          "px-1 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border",
                          getActionStyle(rule.action)
                        )}>
                          {rule.action}
                        </span>
                        {!rule.enabled && (
                          <span className="text-[8px] font-bold uppercase tracking-wider text-foreground/30">disabled</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-foreground/40">
                          {rule.targets.join(", ")}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-foreground/20 hover:text-red-500"
                          onClick={() => onUnlinkRule(zone.id, rule.id)}
                        >
                          <Unlink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center border border-dashed border-border/30 rounded-lg">
                  <p className="text-xs text-foreground/40 font-medium">No rules assigned to this zone</p>
                  <p className="text-[11px] text-foreground/30 mt-1">This zone inherits the global policy</p>
                </div>
              )}
            </div>

            {zoneConflicts.length > 0 && (
              <div className="px-4 pb-4">
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-amber-600">
                      Conflict{zoneConflicts.length > 1 ? "s" : ""} Detected
                    </span>
                  </div>
                  {zoneConflicts.map((conflict, idx) => (
                    <p key={idx} className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed pl-5">
                      {conflict.reason}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className="px-4 pb-4">
              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/35 hover:text-foreground/60 transition-colors outline-none">
                  <ChevronRight className="w-3 h-3 [[data-state=open]>&]:rotate-90 transition-transform" />
                  Resolved Config Preview
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 bg-muted/15 border border-border/30 rounded-lg p-3">
                    <pre className="text-[10px] font-mono text-foreground/50 leading-relaxed whitespace-pre-wrap">
{`{
  "zone": "${zone.name}",
  "paths": ${JSON.stringify(zone.paths)},
  "rules": [
${assignedRules.filter(r => r.enabled).map(r => `    { "action": "${r.action}", "type": "${r.type}", "targets": ${JSON.stringify(r.targets)} }`).join(",\n")}
  ],
  "hasConflicts": ${hasConflicts}
}`}
                    </pre>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

// ──────────────────────────────────────────────
// Settings Tab Content
// ──────────────────────────────────────────────

function SettingsTabContent({
  hierarchy,
  setHierarchy,
  aggressiveness,
  setAggressiveness,
}: {
  hierarchy: string[]
  setHierarchy: (h: string[]) => void
  aggressiveness: number
  setAggressiveness: (v: number) => void
}) {
  const aggressivenessLabels: Record<number, { label: string; description: string; color: string }> = {
    1: { label: "Permissive", description: "Allow most traffic. Only flag clearly malicious bots.", color: "text-emerald-600" },
    2: { label: "Balanced", description: "Standard detection. Good default for most publishers.", color: "text-blue-600" },
    3: { label: "Strict", description: "Aggressive detection. May challenge legitimate bots.", color: "text-amber-600" },
    4: { label: "Lockdown", description: "Maximum protection. Challenge or block all unverified traffic.", color: "text-red-600" },
  }

  const currentLevel = aggressivenessLabels[aggressiveness] || aggressivenessLabels[2]

  const moveHierarchyItem = (index: number, direction: "up" | "down") => {
    const newHierarchy = [...hierarchy]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newHierarchy.length) return
    ;[newHierarchy[index], newHierarchy[targetIndex]] = [newHierarchy[targetIndex], newHierarchy[index]]
    setHierarchy(newHierarchy)
  }

  return (
    <div className="space-y-6">

      {/* Actions Explanation */}
      <div className="border border-border/60 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border/30 bg-muted/5">
          <h3 className="text-sm font-semibold text-foreground">Rule Actions</h3>
          <p className="text-xs text-foreground/50 mt-0.5">Every rule uses one of these three actions when a match is found</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-emerald-500/15 rounded-lg p-4 bg-emerald-500/3">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-foreground">Allow</span>
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Traffic is permitted through. The request is served normally with no restrictions.
              </p>
            </div>
            <div className="border border-red-500/15 rounded-lg p-4 bg-red-500/3">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-foreground">Block</span>
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Traffic is denied. The request is rejected and the bot receives a 403 or equivalent response.
              </p>
            </div>
            <div className="border border-amber-500/15 rounded-lg p-4 bg-amber-500/3">
              <div className="flex items-center gap-2 mb-2">
                <ShieldQuestion className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-foreground">Challenge</span>
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Traffic is tested before access. A verification challenge is issued — only verified requests pass through.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rule Hierarchy */}
      <div className="border border-border/60 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border/30 bg-muted/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Rule Priority</h3>
              <p className="text-xs text-foreground/50 mt-0.5">When rules conflict, higher priority rules override lower ones</p>
            </div>
            <Button variant="ghost" size="sm" className="text-[10px] h-7 text-foreground/40 hover:text-foreground gap-1.5">
              Reset to Default
            </Button>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-2">
            {hierarchy.map((levelId, index) => {
              const level = HIERARCHY_LEVELS.find(l => l.id === levelId)
              if (!level) return null
              const IconComp = level.icon
              const priorityNumber = hierarchy.length - index

              return (
                <div
                  key={levelId}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-border/40 bg-card hover:bg-muted/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => moveHierarchyItem(index, "up")}
                        disabled={index === 0}
                        className="text-foreground/20 hover:text-foreground/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                      <button
                        onClick={() => moveHierarchyItem(index, "down")}
                        disabled={index === hierarchy.length - 1}
                        className="text-foreground/20 hover:text-foreground/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                      </button>
                    </div>
                    <div className="w-6 h-6 rounded flex items-center justify-center border border-border/40 bg-muted/30 text-foreground/40">
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">{level.label}</span>
                      <p className="text-[11px] text-foreground/40">{level.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      priorityNumber === 4 ? "text-red-500" :
                      priorityNumber === 3 ? "text-amber-500" :
                      priorityNumber === 2 ? "text-blue-500" :
                      "text-foreground/30"
                    )}>
                      {priorityNumber === 4 ? "Strongest" :
                       priorityNumber === 3 ? "Strong" :
                       priorityNumber === 2 ? "Medium" :
                       "Weakest"}
                    </span>
                    <div className="w-7 h-7 rounded flex items-center justify-center bg-muted/30 text-foreground/30 font-mono text-xs font-bold">
                      {priorityNumber}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Detection Aggressiveness */}
      <div className="border border-border/60 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border/30 bg-muted/5">
          <h3 className="text-sm font-semibold text-foreground">Detection Sensitivity</h3>
          <p className="text-xs text-foreground/50 mt-0.5">
            Our algorithm assigns a confidence score to each request. This controls the threshold for triggering rules.
          </p>
        </div>
        <div className="p-5 space-y-5">
          <div className="flex items-center justify-between">
            <span className={cn("text-lg font-bold", currentLevel.color)}>{currentLevel.label}</span>
            <span className="text-xs text-foreground/40 font-medium">Level {aggressiveness} of 4</span>
          </div>
          <Slider
            value={[aggressiveness]}
            onValueChange={(v) => setAggressiveness(v[0])}
            min={1}
            max={4}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between">
            <span className="text-[10px] text-foreground/30 font-medium">Permissive</span>
            <span className="text-[10px] text-foreground/30 font-medium">Lockdown</span>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed border-t border-border/20 pt-4">
            {currentLevel.description}
          </p>
        </div>
      </div>

      {/* Import robots.txt */}
      <div className="border border-border/60 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border/30 bg-muted/5">
          <h3 className="text-sm font-semibold text-foreground">Import robots.txt</h3>
          <p className="text-xs text-foreground/50 mt-0.5">
            Already have a robots.txt? Import it and we&apos;ll generate rules and zones automatically.
          </p>
        </div>
        <div className="p-5">
          <div className="border-2 border-dashed border-border/40 rounded-lg p-8 text-center hover:border-foreground/20 transition-colors cursor-pointer">
            <Import className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground/60">Drop your robots.txt file here</p>
            <p className="text-xs text-foreground/35 mt-1">or click to browse</p>
            <p className="text-[11px] text-foreground/30 mt-4 leading-relaxed max-w-md mx-auto">
              We&apos;ll parse your existing rules and create matching protection rules and content zones. 
              You can then review and adjust everything before applying.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

// ──────────────────────────────────────────────
// Main Content Component
// ──────────────────────────────────────────────

export function RuleBuilderContent() {
  const [rules, setRules] = useState<Rule[]>(initialRules)
  const [zones, setZones] = useState<Zone[]>(initialZones)
  const [ruleSearchQuery, setRuleSearchQuery] = useState("")
  const [ruleTypeFilter, setRuleTypeFilter] = useState<RuleType | "all">("all")
  const [activeTab, setActiveTab] = useState<"rules" | "zones" | "settings">("rules")
  const [hierarchy, setHierarchy] = useState<string[]>(["behaviour", "category", "country", "bot_name"])
  const [aggressiveness, setAggressiveness] = useState(2)

  const conflicts = useMemo(() => detectConflicts(zones, rules), [zones, rules])

  const filteredRules = useMemo(() => {
    return rules.filter(rule => {
      const matchesSearch = !ruleSearchQuery ||
        rule.name.toLowerCase().includes(ruleSearchQuery.toLowerCase()) ||
        rule.targets.some(t => t.toLowerCase().includes(ruleSearchQuery.toLowerCase()))
      const matchesType = ruleTypeFilter === "all" || rule.type === ruleTypeFilter
      return matchesSearch && matchesType
    })
  }, [rules, ruleSearchQuery, ruleTypeFilter])

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(r => r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
  }

  const deleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(r => r.id !== ruleId))
    setZones(prev => prev.map(z => ({
      ...z,
      assignedRuleIds: z.assignedRuleIds.filter(id => id !== ruleId),
    })))
  }

  const unlinkRule = (zoneId: string, ruleId: string) => {
    setZones(prev => prev.map(z =>
      z.id === zoneId
        ? { ...z, assignedRuleIds: z.assignedRuleIds.filter(id => id !== ruleId) }
        : z
    ))
  }

  const getConflictCountForRule = (ruleId: string) => {
    return conflicts.filter(c => c.ruleA === ruleId || c.ruleB === ruleId).length
  }

  const getLinkedZoneCount = (ruleId: string) => {
    return zones.filter(z => z.assignedRuleIds.includes(ruleId)).length
  }

  const enabledRulesCount = rules.filter(r => r.enabled).length
  const totalConflicts = conflicts.length
  const coveredZones = zones.filter(z => z.assignedRuleIds.length > 0).length

  return (
    <div className="space-y-6">

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-border/60 bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-foreground/50 font-medium uppercase tracking-wider">Active Rules</p>
                <p className="text-2xl font-semibold tracking-tight mt-1">{enabledRulesCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-muted/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-foreground/50 font-medium uppercase tracking-wider">Content Zones</p>
                <p className="text-2xl font-semibold tracking-tight mt-1">{zones.length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-muted/40 flex items-center justify-center">
                <Layers className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-foreground/50 font-medium uppercase tracking-wider">Coverage</p>
                <p className="text-2xl font-semibold tracking-tight mt-1">{coveredZones}/{zones.length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-muted/40 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "border-border/60 bg-card",
          totalConflicts > 0 && "border-amber-500/30"
        )}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-foreground/50 font-medium uppercase tracking-wider">Conflicts</p>
                <p className={cn(
                  "text-2xl font-semibold tracking-tight mt-1",
                  totalConflicts > 0 ? "text-amber-500" : "text-foreground"
                )}>{totalConflicts}</p>
              </div>
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                totalConflicts > 0 ? "bg-amber-500/10" : "bg-muted/40"
              )}>
                <AlertTriangle className={cn(
                  "w-5 h-5",
                  totalConflicts > 0 ? "text-amber-500" : "text-muted-foreground"
                )} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-border/30">
        <button
          onClick={() => setActiveTab("rules")}
          className={cn(
            "px-4 py-2.5 text-xs font-semibold tracking-tight transition-colors relative",
            activeTab === "rules"
              ? "text-foreground"
              : "text-foreground/40 hover:text-foreground/70"
          )}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            Rules Library
            <span className="px-1.5 py-0.5 rounded bg-muted/50 text-[9px] font-bold text-foreground/50">{rules.length}</span>
          </div>
          {activeTab === "rules" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("zones")}
          className={cn(
            "px-4 py-2.5 text-xs font-semibold tracking-tight transition-colors relative",
            activeTab === "zones"
              ? "text-foreground"
              : "text-foreground/40 hover:text-foreground/70"
          )}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            Zone Assignments
            <span className="px-1.5 py-0.5 rounded bg-muted/50 text-[9px] font-bold text-foreground/50">{zones.length}</span>
            {totalConflicts > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-[9px] font-bold text-amber-600 border border-amber-500/20">
                {totalConflicts}
              </span>
            )}
          </div>
          {activeTab === "zones" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={cn(
            "px-4 py-2.5 text-xs font-semibold tracking-tight transition-colors relative",
            activeTab === "settings"
              ? "text-foreground"
              : "text-foreground/40 hover:text-foreground/70"
          )}
        >
          <div className="flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5" />
            Settings
          </div>
          {activeTab === "settings" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-full" />
          )}
        </button>
      </div>

      {/* ─── Rules Tab ─── */}
      {activeTab === "rules" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={ruleSearchQuery}
                  onChange={(e) => setRuleSearchQuery(e.target.value)}
                  placeholder="Search rules..."
                  className="h-8 text-xs pl-8 w-56 bg-muted/20 border-border/40"
                />
              </div>
              <div className="flex items-center gap-1 border border-border/40 rounded-lg p-0.5">
                {(["all", "category", "behaviour", "country"] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setRuleTypeFilter(type)}
                    className={cn(
                      "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                      ruleTypeFilter === type
                        ? "bg-foreground/10 text-foreground"
                        : "text-foreground/35 hover:text-foreground/60"
                    )}
                  >
                    {type === "all" ? "All" : getRuleTypeLabel(type)}
                  </button>
                ))}
              </div>
            </div>
            <Button variant="outline" className="h-8 text-xs gap-1.5 border-dashed border-border/50">
              <Plus className="w-3 h-3" />
              New Rule
            </Button>
          </div>

          <div className="space-y-2">
            {filteredRules.length > 0 ? (
              filteredRules.map(rule => (
                <RuleCard
                  key={rule.id}
                  rule={rule}
                  onToggle={() => toggleRule(rule.id)}
                  onDelete={() => deleteRule(rule.id)}
                  conflictCount={getConflictCountForRule(rule.id)}
                  linkedZoneCount={getLinkedZoneCount(rule.id)}
                />
              ))
            ) : (
              <div className="py-16 text-center border border-dashed border-border/30 rounded-xl">
                <Shield className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground/35">No rules match your filters</p>
              </div>
            )}
          </div>

          {/* Category + Behaviour Reference */}
          <div className="border border-border/60 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/40">
                Available Bot Categories ({BOT_CATEGORIES.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {BOT_CATEGORIES.map(cat => (
                <span
                  key={cat}
                  className="px-2 py-1 bg-muted/30 border border-border/40 rounded text-[10px] font-medium text-foreground/50 hover:text-foreground/70 hover:border-foreground/20 transition-colors cursor-pointer"
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/40">
                  Behaviour Types
                </span>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-muted/10 border border-border/40 rounded-lg">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <div>
                    <p className="text-[11px] font-semibold text-foreground">Transparent</p>
                    <p className="text-[10px] text-foreground/40">Declares identity, signals confirm declaration</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-muted/10 border border-border/40 rounded-lg">
                  <EyeOff className="w-3.5 h-3.5 text-red-500" />
                  <div>
                    <p className="text-[11px] font-semibold text-foreground">Intransparent</p>
                    <p className="text-[10px] text-foreground/40">Doesn&apos;t declare or signals contradict declaration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Zones Tab ─── */}
      {activeTab === "zones" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[300px] p-3">
                    <p className="text-xs leading-relaxed">
                      Zones without assigned rules inherit the global domain policy. Assign rules to override global behaviour for specific content areas.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/40">
                Assign rules to zones — rules are evaluated in priority order
              </span>
            </div>
            <Button variant="outline" className="h-8 text-xs gap-1.5 border-dashed border-border/50">
              <Plus className="w-3 h-3" />
              New Zone
            </Button>
          </div>

          <div className="space-y-3">
            {zones.map(zone => (
              <ZoneCard
                key={zone.id}
                zone={zone}
                rules={rules}
                conflicts={conflicts}
                onUnlinkRule={unlinkRule}
              />
            ))}
          </div>

          {totalConflicts > 0 && (
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  {totalConflicts} conflict{totalConflicts > 1 ? "s" : ""} across all zones
                </span>
              </div>
              <p className="text-[11px] text-amber-700/70 dark:text-amber-400/70 leading-relaxed">
                Conflicting rules may produce unexpected behaviour when exported. 
                Resolve conflicts by adjusting rule targets, changing actions, or removing one of the conflicting rules from the zone.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ─── Settings Tab ─── */}
      {activeTab === "settings" && (
        <SettingsTabContent
          hierarchy={hierarchy}
          setHierarchy={setHierarchy}
          aggressiveness={aggressiveness}
          setAggressiveness={setAggressiveness}
        />
      )}

      {/* ─── Bottom Action Bar ─── */}
      <div className="flex items-center justify-between pt-6 border-t border-border/30">
        <Button variant="outline" className="text-xs h-9 gap-1.5 border-border/50">
          <FileText className="w-3.5 h-3.5" />
          Generate Robots.txt
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-xs h-9">Discard</Button>
          <Button className="text-xs h-9 gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Apply Changes
          </Button>
        </div>
      </div>

    </div>
  )
}
