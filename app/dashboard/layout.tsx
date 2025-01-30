'use client'

import { Spinner } from '@/components/ui/spinner'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  if (!isLoaded) {
    return <Spinner />
  }

  const role = user?.publicMetadata?.role

  if (role === '' || role === null || role === undefined) {
    toast.error('Anda belum diverif oleh admin!', {})
    router.push('/')
  }

  return <>{children}</>
}
