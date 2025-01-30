'use client'

import { removeRole, setRole } from '@/app/dashboard/manage-users/_action'
import { redirect } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'

export function UserActions({ userId }: { userId: string }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [action, setAction] = useState<'admin' | 'user' | 'remove' | null>(null)

  const [pending, startTransition] = useTransition()

  const handleConfirm = () => {
    if (!action) return
    startTransition(async () => {
      let res
      const formData = new FormData()
      formData.append('id', userId)

      if (action === 'remove') {
        res = await removeRole(formData)
      } else {
        formData.append('role', action)
        res = await setRole(formData)
      }

      if (res?.success) {
        toast.success('Role updated successfully')
        setTimeout(() => {
          setModalOpen(false)
          redirect('/dashboard/manage-users') // Refresh data setelah berhasil
        }, 1000)
      } else {
        toast.error(res?.error || 'Unknown error')
      }
    })
  }

  return (
    <>
      <div className="flex space-x-3">
        <Button
          onClick={() => {
            setAction('admin')
            setModalOpen(true)
          }}
          className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
        >
          Make Admin
        </Button>
        <Button
          onClick={() => {
            setAction('user')
            setModalOpen(true)
          }}
          className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
        >
          Make Basic User
        </Button>
        <Button
          onClick={() => {
            setAction('remove')
            setModalOpen(true)
          }}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Remove Role
        </Button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {action === 'remove'
                ? "Are you sure you want to remove this user's role?"
                : `Change role to ${action}?`}
            </h3>

            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={pending}
                className="px-4 py-2 bg-blue-500  rounded-lg hover:bg-blue-600"
              >
                {pending ? 'Processing...' : 'Confirm'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
