"use client"

import { useEffect, useState } from "react"
import { Users, User, ArrowRight } from "lucide-react"

interface LiveQueueProps {
  currentPatient: string
  patientsAhead: number
  consultationProgress: number
}

export function LiveQueue({
  currentPatient,
  patientsAhead,
  consultationProgress: initialProgress,
}: LiveQueueProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => setProgress(initialProgress), 100)
    return () => clearTimeout(timer)
  }, [initialProgress])

  return (
    <div className="animate-slide-up-delay rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Live Queue</h2>
          <p className="text-sm text-muted-foreground">Current queue information</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Current Patient */}
        <div className="flex items-center gap-4 rounded-xl bg-primary/5 p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Currently Consulting
            </p>
            <p className="text-base font-bold text-card-foreground">{currentPatient}</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15">
            <ArrowRight className="h-4 w-4 text-success" />
          </div>
        </div>

        {/* Patients Ahead */}
        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Patients Ahead of You
            </p>
            <p className="mt-0.5 text-2xl font-bold text-card-foreground">{patientsAhead}</p>
          </div>
          <div className="flex -space-x-2">
            {Array.from({ length: Math.min(patientsAhead, 4) }).map((_, i) => (
              <div
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-semibold text-muted-foreground"
              >
                {i + 1}
              </div>
            ))}
            {patientsAhead > 4 && (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-primary/10 text-xs font-semibold text-primary">
                +{patientsAhead - 4}
              </div>
            )}
          </div>
        </div>

        {/* Consultation Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Current Consultation Progress
            </p>
            <span className="text-xs font-bold text-primary">{progress}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Estimated {Math.round((100 - progress) * 0.3)} min remaining for current patient
          </p>
        </div>
      </div>
    </div>
  )
}
