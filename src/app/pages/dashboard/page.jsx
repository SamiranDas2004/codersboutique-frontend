import React from 'react'
import DashboardView from '@/app/views/dashboard/Dashboard'

export default function page() {
  return (
    <DashboardView />
  )
}

export const generateMetadata = () => {
  return {
    title: 'Dashboard',
    description: 'Dashboard'
  }
}