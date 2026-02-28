"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Timer } from "lucide-react"

interface CountdownTimerProps {
  initialSeconds: number
}

export function CountdownTimer({ initialSeconds }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const requestRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number | null>(null)
  const accumulatedRef = useRef(0)

  const totalSeconds = initialSeconds
  const progress = totalSeconds > 0 ? ((totalSeconds - seconds) / totalSeconds) * 100 : 0

  const formatTime = useCallback((s: number) => {
    const hrs = Math.floor(s / 3600)
    const mins = Math.floor((s % 3600) / 60)
    const secs = s % 60
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }, [])

  useEffect(() => {
    const tick = (timestamp: number) => {
      if (previousTimeRef.current !== null) {
        const delta = timestamp - previousTimeRef.current
        accumulatedRef.current += delta
        if (accumulatedRef.current >= 1000) {
          const secondsPassed = Math.floor(accumulatedRef.current / 1000)
          accumulatedRef.current -= secondsPassed * 1000
          setSeconds((prev) => Math.max(0, prev - secondsPassed))
        }
      }
      previousTimeRef.current = timestamp
      requestRef.current = requestAnimationFrame(tick)
    }

    requestRef.current = requestAnimationFrame(tick)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  // SVG progress ring
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="animate-fade-in rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
          <Timer className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Consultation Countdown</h2>
          <p className="text-sm text-muted-foreground">Time remaining until your turn</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Circular Progress Ring */}
        <div className="relative flex items-center justify-center">
          <svg className="-rotate-90" width="220" height="220" viewBox="0 0 220 220">
            {/* Background circle */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              strokeWidth="10"
              className="stroke-muted"
            />
            {/* Progress circle */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className="stroke-primary transition-all duration-1000 ease-linear"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
              }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Time Left
            </span>
            <span className="font-mono text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl">
              {formatTime(seconds)}
            </span>
            {seconds === 0 && (
              <span className="mt-1 animate-pulse text-sm font-semibold text-success">
                {"It's your turn!"}
              </span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
