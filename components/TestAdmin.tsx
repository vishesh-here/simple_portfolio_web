'use client'

import React from 'react'

interface AdminDashboardProps {
  onLogout?: () => void
}

export default function TestAdmin({ onLogout }: AdminDashboardProps) {
  return (
    <div className="p-4">
      <h1>Test Admin Dashboard</h1>
      {onLogout && (
        <button onClick={onLogout} className="px-4 py-2 bg-red-600 text-white rounded">
          Logout
        </button>
      )}
    </div>
  )
}