"use client"

import { useState } from "react"
import { Navbar } from "@/components/dashboard/navbar"
import { BookAppointment } from "@/components/dashboard/book-appointment"
import { AppointmentStatus } from "@/components/dashboard/appointment-status"
import { CountdownTimer } from "@/components/dashboard/countdown-timer"
import { LiveQueue } from "@/components/dashboard/live-queue"

export default function PatientDashboard() {
  const [booked, setBooked] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar patientName="Sarah Mitchell" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="animate-fade-in mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
            Patient Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your appointments and track your queue position in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Section 1: Book Appointment */}
          <BookAppointment onBook={() => setBooked(true)} />

          {/* Section 2: Appointment Status */}
          <AppointmentStatus
            allocatedTime={booked ? "10:30 AM" : "Pending"}
            queuePosition={booked ? 3 : 0}
            estimatedWait={booked ? "~25 min" : "--"}
            status={booked ? "Confirmed" : "Waiting"}
          />

          {/* Section 3: Countdown Timer */}
          <CountdownTimer initialSeconds={booked ? 1514 : 2700} />

          {/* Section 4: Live Queue */}
          <LiveQueue
            currentPatient="James Rodriguez"
            patientsAhead={booked ? 2 : 5}
            consultationProgress={65}
          />
        </div>
      </main>
    </div>
  )
}
