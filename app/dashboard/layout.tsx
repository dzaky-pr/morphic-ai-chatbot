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

  if (!user || !role) {
    // Kalau user tidak ada atau role tidak ada
    if (!user) {
      toast.error('Anda tidak memiliki akses!', {})
      router.push('/')
    } else {
      toast.error('Anda belum diverifikasi oleh Admin!', {})
      router.push('/')
    }
  } else if (role === 'user' || role === 'admin') {
    // Jika role ada dan role 'user'
    return <>{children}</>
  } else {
    // Jika role ada, tapi bukan 'user'
    toast.error('Akses ditolak!', {})
    router.push('/')
  }
}
