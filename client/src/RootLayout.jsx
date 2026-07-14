import React from 'react'
import { Outlet } from '@tanstack/react-router'

const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}

export default RootLayout