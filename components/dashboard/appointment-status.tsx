"use client"

import { ClipboardCheck, Clock, Hash, Hourglass } from "lucide-react"

type Status = "Waiting" | "Confirmed" | "Delayed" | "Completed"

interface AppointmentStatusProps {
  allocatedTime: string
  queuePosition: number
  estimatedWait: string
  status: Status
}

function getStatusConfig(status: Status) {
  switch (status) {
    case "Waiting":
      return { color: "bg-warning/15 text-warning-foreground border-warning/30", dot: "bg-warning" }
    case "Confirmed":
      return { color: "bg-success/15 text-success border-success/30", dot: "bg-success" }
    case "Delayed":
      return { color: "bg-destructive/15 text-destructive border-destructive/30", dot: "bg-destructive" }
    case "Completed":
      return { color: "bg-primary/15 text-primary border-primary/30", dot: "bg-primary" }
  }
}

export function AppointmentStatus({
  allocatedTime,
  queuePosition,
  estimatedWait,
  status,
}: AppointmentStatusProps) {
  const config = getStatusConfig(status)

  return (
    <div className="animate-slide-in-right rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info/10">
            <ClipboardCheck className="h-5 w-5 text-info" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Appointment Status</h2>
            <p className="text-sm text-muted-foreground">Real-time updates</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${config.color}`}
        >
          <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${config.dot}`} />
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-4">
          <Clock className="h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Allocated Time
            </p>
            <p className="text-base font-bold text-card-foreground">{allocatedTime}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-4">
          <Hash className="h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Queue Position
            </p>
            <p className="text-base font-bold text-card-foreground">#{queuePosition}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-4">
          <Hourglass className="h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Est. Wait
            </p>
            <p className="text-base font-bold text-card-foreground">{estimatedWait}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
