"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileCode, Import, Loader2 } from "lucide-react"
import { useState } from "react"

interface RobotsImportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RobotsImportModal({ open, onOpenChange }: RobotsImportModalProps) {
  const [isImporting, setIsImporting] = useState(false)
  const [content, setContent] = useState("User-agent: *\nDisallow: /admin/\nDisallow: /tmp/\nDisallow: /private/\n\nUser-agent: GPTBot\nDisallow: /")

  const handleImport = () => {
    setIsImporting(true)
    setTimeout(() => {
      setIsImporting(false)
      onOpenChange(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Import className="w-5 h-5 text-blue-500" />
            Import from robots.txt
          </DialogTitle>
          <DialogDescription>
            Paste the content of your robots.txt file to automatically create content zones and rules for your domain and paths.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="relative">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="User-agent: *..."
              className="min-h-[200px] font-mono text-xs bg-muted/30 resize-none"
            />
            <div className="absolute top-2 right-2 p-1 rounded bg-background/50 border border-border/50">
              <FileCode className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3 rounded-lg border border-border/50 bg-blue-500/5">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Detected Paths</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-[10px] text-blue-600 font-mono">/admin/</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-[10px] text-blue-600 font-mono">/tmp/</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-[10px] text-blue-600 font-mono">/private/</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isImporting}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={isImporting}>
            {isImporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm Import'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
