"use client"

import { Activity, LogOut } from "lucide-react"

interface NavbarProps {
  patientName: string
}

export function Navbar({ patientName }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            MediQueue
          </span>
        </div>

        <div className="flex items-center gap-4">
          <p className="hidden text-sm text-muted-foreground sm:block">
            Hello, <span className="font-semibold text-foreground">{patientName}</span>
          </p>
          <button
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-destructive/30 hover:text-destructive hover:shadow-sm active:translate-y-0"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
