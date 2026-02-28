"use client"

import { useState, useRef } from "react"
import { CalendarPlus, Check, Clock, FileText, Timer } from "lucide-react"

interface BookAppointmentProps {
  onBook: () => void
}

export function BookAppointment({ onBook }: BookAppointmentProps) {
  const [symptoms, setSymptoms] = useState("")
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("30")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!symptoms.trim() || !time) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      onBook()
      setTimeout(() => setShowSuccess(false), 3000)
    }, 800)
  }

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current
    if (!button) return
    const rect = button.getBoundingClientRect()
    const ripple = document.createElement("span")
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`
    ripple.className = "ripple-effect"
    button.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }

  return (
    <div className="relative">
      <div className="animate-slide-up rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <CalendarPlus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Book Appointment</h2>
            <p className="text-sm text-muted-foreground">Schedule your next visit</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Symptoms */}
          <div className="group relative">
            <div className="absolute left-3 top-3 text-muted-foreground transition-colors group-focus-within:text-primary">
              <FileText className="h-4 w-4" />
            </div>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms..."
              rows={3}
              className="w-full resize-none rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Preferred Time */}
            <div className="group relative">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Preferred Time
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                  <Clock className="h-4 w-4" />
                </div>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            {/* Duration */}
            <div className="group relative">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Est. Duration
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                  <Timer className="h-4 w-4" />
                </div>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
            </div>
          </div>

          <button
            ref={buttonRef}
            type="submit"
            disabled={isSubmitting}
            onClick={handleRipple}
            className="relative overflow-hidden rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Booking...
              </span>
            ) : (
              "Book Appointment"
            )}
          </button>
        </form>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="animate-popup fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
          <div className="mx-4 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <Check className="h-8 w-8 text-success" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-card-foreground">Appointment Booked!</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your appointment has been confirmed for {time}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
